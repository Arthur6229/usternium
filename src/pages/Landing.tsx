import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { topics } from '../data/content';
import { ArrowRight, Zap, BookOpen, Flame, Star } from 'lucide-react';

export function Landing() {
  const navigate = useNavigate();
  const { profile } = useStore();

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f1f5f9' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px',
        background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#6366f1,#4338ca)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 900, color: 'white',
          }}>U</div>
          <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>Usternium</span>
        </div>
        <button
          onClick={() => navigate(profile ? '/dashboard' : '/onboard')}
          style={{
            padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#6366f1,#4338ca)',
            color: 'white', fontWeight: 700, fontSize: 14,
          }}
        >
          {profile ? 'Open Dashboard' : 'Get Started'}
        </button>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', textAlign: 'center' }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
          background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: 20, padding: '6px 16px',
        }}>
          <Zap size={14} color="#818cf8" />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#818cf8' }}>One lesson. Every day. Forever.</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 900, lineHeight: 1.05,
          letterSpacing: '-0.04em', marginBottom: 24,
          background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Learn something<br />
          <span style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>new every day.</span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#64748b', maxWidth: 560, lineHeight: 1.7, marginBottom: 44 }}>
          Choose your topics — math, vocabulary, science, history and more.
          Usternium delivers one perfectly crafted insight to your dashboard every single day.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/onboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '16px 32px',
              borderRadius: 14, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#6366f1,#4338ca)',
              color: 'white', fontWeight: 800, fontSize: 17,
              boxShadow: '0 0 40px rgba(99,102,241,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 60px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(99,102,241,0.35)'; }}
          >
            Start for free <ArrowRight size={18} />
          </button>
          {profile && (
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                padding: '16px 28px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)',
                background: 'transparent', color: '#94a3b8', fontWeight: 700, fontSize: 17, cursor: 'pointer',
              }}
            >
              Continue learning →
            </button>
          )}
        </div>

        {/* Topic pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 52, maxWidth: 580 }}>
          {topics.map(t => (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '7px 14px', fontSize: 13, fontWeight: 600, color: '#94a3b8',
            }}>
              {t.emoji} {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Simple by design</div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>How Usternium works</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {[
            { icon: <BookOpen size={24} />, title: 'Pick your topics', body: 'Choose from 8 curated subjects — math, vocab, science, history, philosophy, wellness, tech, and fun facts.', color: '#6366f1' },
            { icon: <Zap size={24} />, title: 'Get one daily insight', body: 'Each day, Usternium serves one carefully crafted fact or lesson per topic. Just enough — never overwhelming.', color: '#f59e0b' },
            { icon: <Flame size={24} />, title: 'Build your streak', body: 'Mark items as learned, track your streak, and watch your knowledge compound over weeks and months.', color: '#ef4444' },
            { icon: <Star size={24} />, title: 'Grow consistently', body: '365 days of learning across any topic = genuine expertise. Small daily habits beat sporadic bursts every time.', color: '#10b981' },
          ].map((card, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: '28px 24px',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${card.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color, marginBottom: 18 }}>
                {card.icon}
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{card.title}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65 }}>{card.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Topics grid */}
      <section style={{ padding: '60px 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>What you'll learn</div>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em' }}>8 topic tracks, 20+ lessons each</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
          {topics.map(t => (
            <div key={t.id} style={{
              borderRadius: 18, padding: '22px', cursor: 'default',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              transition: 'transform 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{t.emoji}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{t.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 24px 100px', textAlign: 'center' }}>
        <div style={{
          maxWidth: 560, margin: '0 auto', background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.1) 100%)',
          border: '1px solid rgba(99,102,241,0.25)', borderRadius: 28, padding: '52px 40px',
        }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🧠</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: '#f1f5f9', marginBottom: 14, letterSpacing: '-0.03em' }}>Ready to start learning?</h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>Free forever. No credit card. Just pick your topics and come back every day.</p>
          <button
            onClick={() => navigate('/onboard')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '15px 32px',
              borderRadius: 14, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#6366f1,#4338ca)',
              color: 'white', fontWeight: 800, fontSize: 16,
              boxShadow: '0 0 30px rgba(99,102,241,0.4)',
            }}
          >
            Sign up free <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'linear-gradient(135deg,#6366f1,#4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: 'white' }}>U</div>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Usternium</span>
        </div>
        <div style={{ fontSize: 13, color: '#475569' }}>© {new Date().getFullYear()} Usternium. Learn something new every day.</div>
      </footer>
    </div>
  );
}
