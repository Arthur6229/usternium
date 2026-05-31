import { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { Bot, Send, X, ArrowLeft, Copy, Check, Trash2, Mic, MicOff } from 'lucide-react';

interface FormField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'checkbox' | 'signature' | 'date';
  lineIndex: number;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
}

// ─── Field detection ───────────────────────────────────────────────────────────

function parseFields(text: string): FormField[] {
  const lines = text.split('\n');
  const fields: FormField[] = [];
  const seen = new Set<string>();

  const pushField = (lineIndex: number, rawLabel: string, type: FormField['type']) => {
    const label = rawLabel.trim().replace(/:$/, '');
    if (!label || seen.has(label.toLowerCase())) return;
    seen.add(label.toLowerCase());
    const inferredType: FormField['type'] =
      type !== 'checkbox' && /sign/i.test(label) ? 'signature'
      : type !== 'checkbox' && /date|day|month|year/i.test(label) ? 'date'
      : type;
    fields.push({ id: `f${lineIndex}`, label, value: '', type: inferredType, lineIndex });
  };

  lines.forEach((line, i) => {
    // "Label: ____" or "Label ____"
    let m = line.match(/^(.+?):?\s*_{3,}\s*$/);
    if (m) { pushField(i, m[1], 'text'); return; }

    // "____ Label" – blank first
    m = line.match(/^_{3,}\s+(.+)$/);
    if (m) { pushField(i, m[2] ?? m[1], 'text'); return; }

    // "Label: " at end of line (colon + nothing)
    m = line.match(/^(.+):\s*$/);
    if (m && m[1].trim().length < 40) { pushField(i, m[1], 'text'); return; }

    // "[ ] Option" or "( ) Option"
    m = line.match(/^\s*[\[\(]\s*[\]\)]\s+(.+)$/);
    if (m) { pushField(i, m[1], 'checkbox'); }
  });

  return fields;
}

// ─── Form preview (React nodes) ───────────────────────────────────────────────

function FormPreview({ text, fields }: { text: string; fields: FormField[] }) {
  const lines = text.split('\n');
  return (
    <div style={{ fontFamily: 'monospace', fontSize: 14, lineHeight: 2, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {lines.map((line, i) => {
        const field = fields.find(f => f.lineIndex === i);

        if (!field || !field.value) {
          return <div key={i} style={{ color: '#94a3b8' }}>{line || ' '}</div>;
        }

        if (field.type === 'checkbox') {
          const ticked = line.replace(/\[\s*\]/, '[✓]').replace(/\(\s*\)/, '(✓)');
          return (
            <div key={i} style={{ color: '#c084fc', fontWeight: 700 }}>{ticked}</div>
          );
        }

        // Replace the blank span with the filled value
        const blankIdx = line.search(/_{2,}/);
        if (blankIdx === -1) return <div key={i} style={{ color: '#94a3b8' }}>{line}</div>;
        const blankEnd = blankIdx + (line.match(/_{2,}/)![0].length);
        const before = line.slice(0, blankIdx);
        const after = line.slice(blankEnd);

        const valueSpan: ReactNode = (
          <span style={{
            color: '#c084fc', fontWeight: 700,
            borderBottom: '2px solid #a855f7',
            paddingBottom: 1,
            fontStyle: field.type === 'signature' ? 'italic' : 'normal',
            fontFamily: field.type === 'signature' ? 'Georgia, serif' : 'monospace',
            fontSize: field.type === 'signature' ? 15 : 14,
          }}>
            {field.value}
          </span>
        );

        return (
          <div key={i} style={{ color: '#94a3b8' }}>
            {before}{valueSpan}{after}
          </div>
        );
      })}
    </div>
  );
}

// ─── AI command parsing ────────────────────────────────────────────────────────

function leven(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, r) =>
    Array.from({ length: n + 1 }, (_, c) => (r === 0 ? c : c === 0 ? r : 0))
  );
  for (let r = 1; r <= m; r++)
    for (let c = 1; c <= n; c++)
      dp[r][c] = a[r - 1] === b[c - 1]
        ? dp[r - 1][c - 1]
        : 1 + Math.min(dp[r - 1][c - 1], dp[r - 1][c], dp[r][c - 1]);
  return dp[m][n];
}

function findField(query: string, fields: FormField[]): FormField | null {
  if (!fields.length) return null;
  const q = query.toLowerCase().replace(/\s*(field|line|box|area)\s*$/i, '').trim();
  const exact = fields.find(f => f.label.toLowerCase() === q);
  if (exact) return exact;
  const sub = fields.find(f => f.label.toLowerCase().includes(q) || q.includes(f.label.toLowerCase()));
  if (sub) return sub;
  const qw = q.split(/\s+/);
  const byWord = fields
    .map(f => ({ f, score: qw.filter(w => f.label.toLowerCase().split(/\s+/).some(fw => fw.includes(w) || w.includes(fw))).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score);
  if (byWord.length) return byWord[0].f;
  const fuzzy = fields
    .map(f => ({ f, d: leven(q, f.label.toLowerCase()) }))
    .sort((a, b) => a.d - b.d)[0];
  return fuzzy && fuzzy.d <= 4 ? fuzzy.f : null;
}

function runCommand(
  input: string,
  fields: FormField[],
  onUpdate: (id: string, value: string) => void
): string {
  // list / help
  if (/(?:list|show|display|what).*field|help|what.*can/i.test(input)) {
    if (!fields.length) return 'No form loaded yet — paste a form first, then click “Load Form”.';
    const lines = fields.map(f => `• ${f.label}${f.value ? `: "${f.value}"` : ' (empty)'}`).join('\n');
    return `${fields.length} field(s) detected:\n${lines}\n\nTry: "Fill [name] with [value]"`;
  }

  // clear all
  if (/clear all|reset all|start over|wipe/i.test(input)) {
    fields.forEach(f => onUpdate(f.id, ''));
    return 'Cleared all fields!';
  }

  // clear one field
  const clearM = input.match(/(?:clear|erase|remove|delete|empty)\s+(?:the\s+)?(.+?)(?:\s+field|\s+line|\s+box)?[.!?]?\s*$/i);
  if (clearM) {
    const f = findField(clearM[1], fields);
    if (f) { onUpdate(f.id, ''); return `Cleared "${f.label}".`; }
  }

  // fill / set / sign — broad verb list catches homophones after normalizeVoice
  const FILL_VERBS = `fill|phil|feel|film|set|put|enter|type|write|add|sign|complete|update|change|make|input|place|insert`;
  const fillM = input.match(
    new RegExp(
      `(?:${FILL_VERBS})(?:\\s+in)?\\s+(?:in\\s+)?(?:the\\s+|a\\s+)?(.+?)\\s+(?:(?:field|line|box|area|section)\\s+)?(?:with|as|to|=|is)\\s+(.+)`,
      'i'
    )
  );
  if (fillM) {
    const fq  = fillM[1].trim().replace(/\s*(field|line|box|area)$/i, '');
    const val = fillM[2].trim().replace(/[.!?]$/, '');
    const f   = findField(fq, fields);
    if (f) {
      onUpdate(f.id, val);
      return `Done! "${f.label}" → "${val}"`;
    }
    return `Couldn't find a field matching "${fq}".\nSay "show fields" to see what's available.`;
  }

  // "field = value" shorthand
  const eqM = input.match(/^(.+?)\s*=\s*(.+)$/);
  if (eqM) {
    const f = findField(eqM[1], fields);
    if (f) { onUpdate(f.id, eqM[2].trim()); return `Set "${f.label}" to "${eqM[2].trim()}".`; }
  }

  // Implicit fill: "[field] [value]" with no command verb — last resort
  // e.g. "signature J.Doe" or "name John Smith"
  if (fields.length) {
    const words = input.trim().split(/\s+/);
    for (let split = 1; split < words.length; split++) {
      const possibleField = words.slice(0, split).join(' ');
      const possibleValue = words.slice(split).join(' ');
      const f = findField(possibleField, fields);
      if (f) {
        onUpdate(f.id, possibleValue.replace(/[.!?]$/, ''));
        return `Got it! "${f.label}" → "${possibleValue.replace(/[.!?]$/, '')}"`;
      }
    }
  }

  return `I can help fill your form! Try saying:\n• "Fill signature with J.Doe"\n• "Set name to John Smith"\n• "Show fields" — list everything`;
}

// ─── Speech hook ─────────────────────────────────────────────────────────────

type SpeechState = 'idle' | 'listening' | 'unsupported';

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: {
    resultIndex: number;
    results: { [i: number]: { isFinal: boolean; [i: number]: { transcript: string } }; length: number };
  }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type SpeechRecognitionCtor = new () => ISpeechRecognition;

// Normalise phonetic mis-hearings before command parsing
function normalizeVoice(raw: string): string {
  return raw
    .replace(/\b(phil|feel|film|heel|field in|fill in)\b/gi, 'fill')
    .replace(/\bwith\b/gi, 'with')
    .replace(/\b(centre|center)\b/gi, 'center')
    .trim();
}

function useSpeech(
  onResult: (text: string) => void,
  onInterim: (text: string) => void,
) {
  const [state, setState] = useState<SpeechState>(() =>
    typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
      ? 'idle'
      : 'unsupported'
  );
  const recogRef  = useRef<ISpeechRecognition | null>(null);
  const activeRef = useRef(false);   // true while user wants mic on
  const finalBuf  = useRef('');      // accumulated final transcript
  const silenceT  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSilence = () => { if (silenceT.current) clearTimeout(silenceT.current); };

  const flushAndStop = useCallback(() => {
    clearSilence();
    const text = finalBuf.current.trim();
    finalBuf.current = '';
    onInterim('');
    activeRef.current = false;
    recogRef.current?.abort();
    setState('idle');
    if (text) onResult(normalizeVoice(text));
  }, [onResult, onInterim]);

  const createSession = useCallback(() => {
    const w = window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition!;
    const r = new SR();
    r.continuous      = true;   // don't stop on short pauses
    r.interimResults  = true;   // stream partial results to the input
    r.lang            = 'en-US';

    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalBuf.current += ' ' + t;
        else interim += t;
      }
      // Show live text in the input box
      onInterim((finalBuf.current + ' ' + interim).trim());

      // Auto-send after 1.8 s of silence mid-session
      clearSilence();
      silenceT.current = setTimeout(flushAndStop, 1800);
    };

    r.onerror = () => {
      if (activeRef.current) {
        // Restart on network blip, not on user abort
        try { createSession(); return; } catch {}
      }
      setState('idle');
    };

    r.onend = () => {
      // Browser forcibly ended — restart if user still wants mic on
      if (activeRef.current) {
        try { const s = createSession(); recogRef.current = s; s.start(); return; } catch {}
      }
      setState('idle');
    };

    recogRef.current = r;
    return r;
  }, [flushAndStop, onInterim]);

  const start = useCallback(() => {
    if (state === 'unsupported') return;
    finalBuf.current  = '';
    activeRef.current = true;
    const r = createSession();
    r.start();
    setState('listening');
  }, [state, createSession]);

  const stop = useCallback(() => {
    flushAndStop();
  }, [flushAndStop]);

  return { state, start, stop };
}

// ─── Component ────────────────────────────────────────────────────────────────

const PURPLE = '#a855f7';
const PURPLE_DIM = '#7c3aed';
const PURPLE_GLOW = 'rgba(168,85,247,0.35)';

export function FormFiller() {
  const [formText, setFormText] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);
  const [step, setStep] = useState<'paste' | 'fill'>('paste');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hi! Paste a form above and click "Load Form". Then tell me what to fill in — for example:\n\n• Fill signature with J.Doe\n• Set date to 2024-06-01\n• Show fields' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSpeechResult = useCallback((text: string) => {
    setChatInput('');
    const reply = runCommand(text, fields, updateFieldRef.current);
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'ai', content: reply }]);
  }, [fields]);

  const speech = useSpeech(handleSpeechResult, (interim) => setChatInput(interim));

  // stable ref so handleSpeechResult doesn't capture stale updateField
  const updateFieldRef = useRef((id: string, value: string) =>
    setFields(prev => prev.map(f => (f.id === id ? { ...f, value } : f)))
  );

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (chatOpen) setTimeout(() => chatInputRef.current?.focus(), 80);
  }, [chatOpen]);

  const handleLoad = () => {
    if (!formText.trim()) return;
    const detected = parseFields(formText);
    setFields(detected);
    setStep('fill');
    const greeting = detected.length
      ? `Form loaded! Found ${detected.length} field(s): ${detected.map(f => `"${f.label}"`).join(', ')}.\n\nJust tell me what to fill in!`
      : "Form loaded. I didn't spot any blank fields (lines with underscores like `Name: ___`), but you can still ask me to fill anything.";
    setMessages([{ role: 'ai', content: greeting }]);
    setChatOpen(true);
  };

  const updateField = (id: string, value: string) => updateFieldRef.current(id, value);

  const send = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput('');
    const reply = runCommand(text, fields, updateField);
    setMessages(prev => [...prev, { role: 'user', content: text }, { role: 'ai', content: reply }]);
  };

  const copyForm = () => {
    // Build filled text
    const lines = formText.split('\n');
    const filled = lines.map((line, i) => {
      const f = fields.find(fd => fd.lineIndex === i);
      if (!f || !f.value) return line;
      if (f.type === 'checkbox')
        return line.replace(/\[\s*\]/, '[✓]').replace(/\(\s*\)/, '(✓)');
      return line.replace(/_{2,}/, f.value);
    });
    navigator.clipboard.writeText(filled.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setFormText('');
    setFields([]);
    setStep('paste');
    setChatOpen(false);
    setMessages([{ role: 'ai', content: 'Hi! Paste a form above and click "Load Form". Then tell me what to fill in — for example:\n\n• Fill signature with J.Doe\n• Set date to 2024-06-01\n• Show fields' }]);
    setTimeout(() => textareaRef.current?.focus(), 80);
  };

  const allFilled = fields.length > 0 && fields.filter(f => f.type !== 'checkbox').every(f => f.value);

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`@keyframes micPulse { 0%,100%{box-shadow:0 0 0 3px rgba(168,85,247,0.35)} 50%{box-shadow:0 0 0 7px rgba(168,85,247,0.12)} }`}</style>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px',
        background: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <button onClick={() => window.location.href = 'https://usternium.com'} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0 }}>
          <ArrowLeft size={15} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Back</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📋</div>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em' }}>AI Form Filler</span>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          {step === 'fill' && (
            <>
              <button onClick={copyForm} style={navBtnStyle}>
                {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
              </button>
              <button onClick={reset} style={navBtnStyle}>
                <Trash2 size={13} /> New
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '36px 20px 120px' }}>

        {/* ── PASTE STEP ── */}
        {step === 'paste' && (
          <div style={{ maxWidth: 620, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>📋</div>
              <h1 style={{ fontSize: 'clamp(24px,5vw,36px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 10 }}>
                AI Form Filler
              </h1>
              <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.65, maxWidth: 420, margin: '0 auto' }}>
                Paste any text form below — the AI detects fields and fills them when you chat.
              </p>
            </div>

            <textarea
              ref={textareaRef}
              value={formText}
              onChange={e => setFormText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleLoad(); }}
              placeholder={SAMPLE_PLACEHOLDER}
              style={{
                width: '100%', minHeight: 300, padding: '20px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 16, color: '#e2e8f0', fontSize: 13, fontFamily: 'monospace',
                lineHeight: 1.8, resize: 'vertical', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = `${PURPLE}60`; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'; }}
            />

            <button
              onClick={handleLoad}
              disabled={!formText.trim()}
              style={{
                marginTop: 14, width: '100%', padding: '15px',
                background: formText.trim() ? `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})` : 'rgba(255,255,255,0.04)',
                border: 'none', borderRadius: 14, cursor: formText.trim() ? 'pointer' : 'not-allowed',
                color: formText.trim() ? 'white' : '#334155',
                fontSize: 15, fontWeight: 700,
                boxShadow: formText.trim() ? `0 4px 24px ${PURPLE_GLOW}` : 'none',
                transition: 'all 0.2s',
              }}
            >
              Load Form & Detect Fields →
            </button>

            <p style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#334155' }}>
              ⌘↵ to load  ·  Works with any plain-text form
            </p>
          </div>
        )}

        {/* ── FILL STEP ── */}
        {step === 'fill' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Status bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Form Preview
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {allFilled && (
                  <span style={{ fontSize: 12, color: '#6ee7b7', fontWeight: 700 }}>✓ All fields filled</span>
                )}
                {fields.length > 0 && (
                  <span style={{ fontSize: 12, color: '#475569' }}>
                    {fields.filter(f => f.value).length}/{fields.length} filled
                  </span>
                )}
              </div>
            </div>

            {/* Form rendered */}
            <div style={{
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 18, padding: '24px 28px',
            }}>
              <FormPreview text={formText} fields={fields} />
            </div>

            {/* Field chips — quick-edit */}
            {fields.length > 0 && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  Fields
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {fields.map(f => (
                    <div key={f.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: 'rgba(255,255,255,0.02)', border: `1px solid ${f.value ? `${PURPLE}30` : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: 12, padding: '10px 14px',
                    }}>
                      <span style={{
                        minWidth: 110, fontSize: 12, fontWeight: 700,
                        color: f.value ? '#c084fc' : '#475569',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        flexShrink: 0,
                      }}>
                        {f.label}
                      </span>
                      {f.type === 'checkbox' ? (
                        <button
                          onClick={() => updateField(f.id, f.value === 'true' ? '' : 'true')}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 7,
                            background: 'none', border: `2px solid ${f.value === 'true' ? PURPLE : '#334155'}`,
                            borderRadius: 6, width: 22, height: 22, cursor: 'pointer',
                            color: '#c084fc', fontSize: 13, justifyContent: 'center', flexShrink: 0,
                          }}
                        >
                          {f.value === 'true' && '✓'}
                        </button>
                      ) : (
                        <input
                          type={f.type === 'date' ? 'date' : 'text'}
                          value={f.value}
                          onChange={e => updateField(f.id, e.target.value)}
                          placeholder={`Enter ${f.label.toLowerCase()}…`}
                          style={{
                            flex: 1, background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8,
                            padding: '7px 10px', color: '#f1f5f9', fontSize: 13, outline: 'none',
                            fontStyle: f.type === 'signature' ? 'italic' : 'normal',
                            fontFamily: f.type === 'signature' ? 'Georgia, serif' : 'inherit',
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Floating AI button ── */}
      <button
        onClick={() => setChatOpen(o => !o)}
        title="AI Assistant"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 300,
          width: 56, height: 56, borderRadius: '50%',
          background: `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})`,
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 28px ${PURPLE_GLOW}`,
          transition: 'transform 0.18s, box-shadow 0.18s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = `0 6px 36px ${PURPLE_GLOW}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 4px 28px ${PURPLE_GLOW}`;
        }}
      >
        {chatOpen ? <X size={22} color="white" /> : <Bot size={22} color="white" />}
      </button>

      {/* ── Chat panel ── */}
      {chatOpen && (
        <div style={{
          position: 'fixed', bottom: 92, right: 24, zIndex: 299,
          width: 'min(360px, calc(100vw - 32px)',
          background: '#0f172a', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column', height: 460,
        }}>
          {/* header */}
          <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={17} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Form AI</div>
              <div style={{ fontSize: 11, color: speech.state === 'listening' ? '#c084fc' : '#475569' }}>
                {speech.state === 'listening' ? '🎙 Listening…' : 'Talk or type to fill fields'}
              </div>
            </div>
          </div>

          {/* messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 6px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '84%', padding: '10px 13px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.role === 'user' ? `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})` : 'rgba(255,255,255,0.06)',
                  color: '#f1f5f9', fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* input */}
          <div style={{ padding: '10px 12px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8, flexShrink: 0 }}>
            {/* Mic button */}
            {speech.state !== 'unsupported' && (
              <button
                onClick={() => speech.state === 'listening' ? speech.stop() : speech.start()}
                title={speech.state === 'listening' ? 'Stop listening' : 'Speak a command'}
                style={{
                  width: 40, height: 40, borderRadius: 12, border: 'none',
                  cursor: 'pointer', flexShrink: 0,
                  background: speech.state === 'listening'
                    ? `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})`
                    : 'rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: speech.state === 'listening' ? `0 0 0 3px ${PURPLE}55` : 'none',
                  animation: speech.state === 'listening' ? 'micPulse 1.2s ease-in-out infinite' : 'none',
                  transition: 'background 0.15s, box-shadow 0.15s',
                }}
              >
                {speech.state === 'listening'
                  ? <MicOff size={16} color="white" />
                  : <Mic size={16} color="#94a3b8" />}
              </button>
            )}

            <input
              ref={chatInputRef}
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={speech.state === 'listening' ? 'Listening — keep talking…' : 'Say or type a command…'}
              readOnly={speech.state === 'listening'}
              style={{
                flex: 1, padding: '10px 13px',
                background: 'rgba(255,255,255,0.06)', border: `1px solid ${speech.state === 'listening' ? `${PURPLE}50` : 'rgba(255,255,255,0.09)'}`,
                borderRadius: 12, color: '#f1f5f9', fontSize: 13, outline: 'none',
                transition: 'border-color 0.2s',
              }}
            />
            <button
              onClick={send}
              style={{
                width: 40, height: 40, borderRadius: 12, border: 'none',
                cursor: chatInput.trim() ? 'pointer' : 'default',
                background: chatInput.trim() ? `linear-gradient(135deg,${PURPLE},${PURPLE_DIM})` : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'background 0.15s',
              }}
            >
              <Send size={16} color={chatInput.trim() ? 'white' : '#334155'} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Misc ──────────────────────────────────────────────────────────────────────

const navBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 5,
  padding: '7px 13px', borderRadius: 10,
  border: '1px solid rgba(255,255,255,0.09)',
  background: 'rgba(255,255,255,0.04)',
  cursor: 'pointer', color: '#94a3b8', fontSize: 12, fontWeight: 600,
};

const SAMPLE_PLACEHOLDER = `Employee Agreement Form

Full Name: ____________________________
Job Title: ____________________________
Department: ____________________________
Start Date: ____________________________

[ ] I agree to the terms and conditions
[ ] I have received the employee handbook

Supervisor Signature: ____________________________
Date: ____________________________`;
