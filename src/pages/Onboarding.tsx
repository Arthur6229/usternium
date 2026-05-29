import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { topics } from '../data/content';
import type { TopicId } from '../data/content';
import { ArrowRight, Check } from 'lucide-react';

function Input({ label, value, onChange, type = 'text', error, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; error: string; placeholder: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          padding: '14px 16px', borderRadius: 12, fontSize: 16, outline: 'none',
          background: 'rgba(255,255,255,0.05)',
          border: `1.5px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.12)'}`,
          color: '#f1f5f9', transition: 'border-color 0.2s',
        }}
        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#6366f1'; }}
        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = error ? '#ef4444' : 'rgba(255,255,255,0.12)'; }}
      />
      {error && <div style={{ fontSize: 12, color: '#ef4444' }}>{error}</div>}
    </div>
  );
}

export function Onboarding() {
  const navigate = useNavigate();
  const { saveProfile, profile } = useStore();
  const editing = !!profile;
  const [step, setStep] = useState<1 | 2>(editing ? 2 : 1);
  const [name, setName] = useState(profile?.name ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [selected, setSelected] = useState<Set<TopicId>>(new Set(profile?.topics ?? []));
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const toggle = (id: TopicId) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const goToStep2 = () => {
    let ok = true;
    if (!name.trim()) { setNameErr('Please enter your name.'); ok = false; } else setNameErr('');
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) { setEmailErr('Enter a valid email address.'); ok = false; } else setEmailErr('');
    if (ok) setStep(2);
  };

  const finish = () => {
    if (selected.size === 0) return;
    saveProfile({ name: name.trim(), email: email.trim(), topics: [...selected] });
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Glow */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: 480, position: 'relative' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: 'white' }}>U</div>
          <span style={{ fontSize: 18, fontWeight: 800 }}>Usternium</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 36, overflow: 'hidden' }}>
          <div style={{ width: step === 1 ? '50%' : '100%', height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>

        {step === 1 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: 8 }}>Welcome! 👋</div>
            <div style={{ fontSize: 15, color: '#64748b', marginBottom: 36, lineHeight: 1.6 }}>Let's get you set up. Takes about 30 seconds.</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Input label="Your name" value={name} onChange={setName} error={nameErr} placeholder="Alex" />
              <Input label="Email address" value={email} onChange={setEmail} type="email" error={emailErr} placeholder="alex@example.com" />
            </div>

            <div style={{ marginTop: 8, padding: '14px 16px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 12, fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>
              🔒 Your email is stored locally on your device only. We don't run a server or send marketing emails.
            </div>

            <button
              onClick={goToStep2}
              style={{
                marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '15px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#6366f1,#4338ca)',
                color: 'white', fontWeight: 800, fontSize: 16,
                boxShadow: '0 0 30px rgba(99,102,241,0.35)',
              }}
            >
              Continue <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: 8 }}>
              {editing ? 'Edit your topics' : 'Pick your topics'}
            </div>
            <div style={{ fontSize: 15, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
              Choose as many as you like. You'll get one insight per topic, per day.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {topics.map(t => {
                const on = selected.has(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggle(t.id)}
                    style={{
                      padding: '16px 14px', borderRadius: 16, cursor: 'pointer', textAlign: 'left',
                      border: `2px solid ${on ? t.color : 'rgba(255,255,255,0.08)'}`,
                      background: on ? `${t.color}18` : 'rgba(255,255,255,0.03)',
                      transition: 'all 0.15s', position: 'relative',
                    }}
                  >
                    {on && (
                      <div style={{
                        position: 'absolute', top: 10, right: 10, width: 20, height: 20,
                        borderRadius: '50%', background: t.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={11} color="white" strokeWidth={3} />
                      </div>
                    )}
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{t.emoji}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: on ? '#f1f5f9' : '#94a3b8', marginBottom: 3 }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: on ? '#64748b' : '#334155', lineHeight: 1.4 }}>{t.description}</div>
                  </button>
                );
              })}
            </div>

            {selected.size > 0 && (
              <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, fontSize: 13, color: '#6ee7b7', marginBottom: 20 }}>
                ✓ {selected.size} topic{selected.size > 1 ? 's' : ''} selected — you'll get {selected.size} insight{selected.size > 1 ? 's' : ''} a day.
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              {!editing && (
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 0, padding: '15px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent', color: '#64748b', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                  }}
                >
                  ←
                </button>
              )}
              <button
                onClick={finish}
                disabled={selected.size === 0}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '15px', borderRadius: 14, border: 'none',
                  background: selected.size === 0 ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg,#6366f1,#4338ca)',
                  color: selected.size === 0 ? '#334155' : 'white',
                  fontWeight: 800, fontSize: 16, cursor: selected.size === 0 ? 'not-allowed' : 'pointer',
                  boxShadow: selected.size > 0 ? '0 0 30px rgba(99,102,241,0.35)' : 'none',
                }}
              >
                {editing ? 'Save changes' : 'Start learning'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
