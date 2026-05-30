import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { topics, getDailyItem } from '../data/content';
import type { TopicId } from '../data/content';
import { Flame, BookOpen, Star, Settings, ChevronDown, ChevronUp, Check } from 'lucide-react';

function TopicCard({ topicId, learned, onLearn }: { topicId: TopicId; learned: boolean; onLearn: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const topic = topics.find(t => t.id === topicId)!;
  const item = getDailyItem(topicId);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${learned ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: 20, overflow: 'hidden',
      transition: 'border-color 0.3s',
    }}>
      {/* Card header */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          width: '100%', padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14,
          background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        {/* Topic icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0,
          background: `${topic.color}20`, border: `1px solid ${topic.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
        }}>
          {topic.emoji}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: topic.color }}>{topic.label}</span>
            {learned && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 20, padding: '2px 8px', fontSize: 11, fontWeight: 600, color: '#6ee7b7' }}>
                <Check size={10} strokeWidth={3} /> Learned
              </span>
            )}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.title}
          </div>
        </div>

        <div style={{ color: '#475569', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div style={{ padding: '0 22px 22px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ paddingTop: 18 }}>
            {/* Main body */}
            <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.75, marginBottom: item.detail || item.example ? 14 : 0 }}>
              {item.body}
            </p>

            {/* Detail block */}
            {item.detail && (
              <div style={{
                background: `${topic.color}0f`, border: `1px solid ${topic.color}25`,
                borderRadius: 12, padding: '14px 16px', marginBottom: item.example ? 12 : 16,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: topic.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  📖 Why it works
                </div>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
              </div>
            )}

            {/* Example block */}
            {item.example && (
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '14px 16px', marginBottom: 16,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                  💡 Example
                </div>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>{item.example}</p>
              </div>
            )}

            {/* Mark learned button */}
            {!learned ? (
              <button
                onClick={onLearn}
                style={{
                  width: '100%', padding: '13px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${topic.color}, ${topic.color}cc)`,
                  color: 'white', fontWeight: 700, fontSize: 14,
                  boxShadow: `0 4px 20px ${topic.color}40`,
                }}
              >
                ✓ Mark as learned today
              </button>
            ) : (
              <div style={{
                width: '100%', padding: '13px', borderRadius: 12, textAlign: 'center',
                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                color: '#6ee7b7', fontWeight: 700, fontSize: 14,
              }}>
                🎉 Learned! Come back tomorrow for more.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { profile, streak, learnedDates, totalLearned, markLearned, checkStreak, reset } = useStore();
  const [showSettings, setShowSettings] = useState(false);
  const todayKey = new Date().toISOString().split('T')[0];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (!profile) { navigate('/'); return; }
    checkStreak();
  }, []);

  if (!profile) return null;

  const learnedToday = profile.topics.filter(t => learnedDates[t] === todayKey);
  const allLearnedToday = profile.topics.every(t => learnedDates[t] === todayKey);
  const learnedCount = learnedToday.length;

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f1f5f9' }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 24px',
        background: 'rgba(3,7,18,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#6366f1,#4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: 'white' }}>U</div>
          <span style={{ fontSize: 16, fontWeight: 800 }}>Usternium</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {streak > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 20, padding: '6px 12px' }}>
              <Flame size={14} color="#fb923c" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fb923c' }}>{streak} day streak</span>
            </div>
          )}
          <button
            onClick={() => setShowSettings(s => !s)}
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center' }}
          >
            <Settings size={17} />
          </button>
        </div>
      </nav>

      {/* Settings dropdown */}
      {showSettings && (
        <div style={{
          position: 'fixed', top: 62, right: 24, zIndex: 200,
          background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16,
          padding: '8px', boxShadow: '0 16px 48px rgba(0,0,0,0.5)', minWidth: 200,
        }}>
          {[
            { label: '✏️ Edit topics', action: () => { navigate('/onboard'); setShowSettings(false); } },
            { label: '🏠 Home page', action: () => { navigate('/'); setShowSettings(false); } },
            { label: '🔄 Reset all data', action: () => { if (confirm('Reset all data?')) { reset(); navigate('/'); } setShowSettings(false); } },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              style={{
                width: '100%', padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                background: 'transparent', color: '#94a3b8', fontWeight: 600, fontSize: 14, textAlign: 'left',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px 80px' }}>
        {/* Greeting */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#475569', marginBottom: 4 }}>{today}</div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: 6 }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p style={{ fontSize: 15, color: '#475569' }}>
            {allLearnedToday ? "You've learned everything for today. Amazing! 🎉" : `${learnedCount} of ${profile.topics.length} topics learned today. Keep going!`}
          </p>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Day Streak', value: streak || 1, icon: <Flame size={18} color="#fb923c" />, color: '#f97316' },
            { label: 'Today', value: `${learnedCount}/${profile.topics.length}`, icon: <BookOpen size={18} color="#818cf8" />, color: '#6366f1' },
            { label: 'Total Learned', value: totalLearned, icon: <Star size={18} color="#fbbf24" />, color: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: '16px 18px',
            }}>
              <div style={{ marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#f1f5f9' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* All-done banner */}
        {allLearnedToday && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
            border: '1px solid rgba(16,185,129,0.25)', borderRadius: 18, padding: '20px 24px',
            textAlign: 'center', marginBottom: 28,
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🏆</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: '#6ee7b7', marginBottom: 4 }}>Daily learning complete!</div>
            <div style={{ fontSize: 14, color: '#047857' }}>New insights unlock tomorrow at midnight. See you then!</div>
          </div>
        )}

        {/* Today's progress bar */}
        {profile.topics.length > 1 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#475569', marginBottom: 8 }}>
              <span style={{ fontWeight: 600 }}>Today's progress</span>
              <span>{Math.round((learnedCount / profile.topics.length) * 100)}%</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 3,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                width: `${(learnedCount / profile.topics.length) * 100}%`,
                transition: 'width 0.5s ease',
              }} />
            </div>
          </div>
        )}

        {/* Topic section label */}
        <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
          Today's insights
        </div>

        {/* Topic cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {profile.topics.map(topicId => (
            <TopicCard
              key={topicId}
              topicId={topicId}
              learned={learnedDates[topicId] === todayKey}
              onLearn={() => markLearned(topicId)}
            />
          ))}
        </div>

        {/* Tip */}
        <div style={{
          marginTop: 32, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: 16, padding: '16px 20px',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>💡 Learning tip</div>
          <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0 }}>
            Reviewing new information within 24 hours of learning it dramatically improves long-term retention. Come back tomorrow for your next set of insights.
          </p>
        </div>
      </div>
    </div>
  );
}
