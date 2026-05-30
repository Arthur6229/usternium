import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface Project {
  name: string;
  description: string;
  longDesc: string;
  emoji: string;
  color: string;
  gradient: string;
  url: string;         // full URL to the project
  status: 'live' | 'beta' | 'coming soon';
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'Usternium Learn',
    description: 'Daily insight tracker',
    longDesc: 'One fact per topic, every day. Math, science, history, coding, music, and more. Build knowledge through daily micro-lessons.',
    emoji: '🧠',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg,#6366f1,#4338ca)',
    url: '/dashboard',   // internal — stays on this domain
    status: 'live',
    tags: ['Learning', 'Habits', 'Daily'],
  },
  {
    name: 'FitFlow',
    description: 'Workout & diet tracker',
    longDesc: 'Gym plans, calisthenics progressions, calorie logging with AI scanning, and an immersive workout session mode.',
    emoji: '💪',
    color: '#f97316',
    gradient: 'linear-gradient(135deg,#f97316,#ea580c)',
    url: 'https://fitflow.usternium.com',   // ← update once deployed
    status: 'beta',
    tags: ['Fitness', 'Nutrition', 'Tracking'],
  },
  {
    name: 'Project 3',
    description: 'Coming soon',
    longDesc: 'Your next project goes here. Replace this card with a real name, description, and URL.',
    emoji: '🚀',
    color: '#10b981',
    gradient: 'linear-gradient(135deg,#10b981,#059669)',
    url: '#',
    status: 'coming soon',
    tags: ['TBD'],
  },
  {
    name: 'Project 4',
    description: 'Coming soon',
    longDesc: 'Another slot for a future project. Add as many cards as you need.',
    emoji: '✨',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)',
    url: '#',
    status: 'coming soon',
    tags: ['TBD'],
  },
];

const statusStyle: Record<Project['status'], { bg: string; color: string; label: string }> = {
  live:          { bg: 'rgba(16,185,129,0.15)', color: '#6ee7b7', label: 'Live' },
  beta:          { bg: 'rgba(249,115,22,0.15)', color: '#fdba74', label: 'Beta' },
  'coming soon': { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', label: 'Coming soon' },
};

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const st = statusStyle[project.status];
  const isInternal = project.url.startsWith('/');
  const isPlaceholder = project.url === '#';

  const handleClick = () => {
    if (isPlaceholder) return;
    if (isInternal) navigate(project.url);
    else window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={handleClick}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 24, padding: '28px',
        cursor: isPlaceholder ? 'default' : 'pointer',
        transition: 'all 0.2s',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 0,
      }}
      onMouseEnter={e => {
        if (isPlaceholder) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'rgba(255,255,255,0.06)';
        el.style.borderColor = `${project.color}40`;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = `0 12px 40px ${project.color}20`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = 'rgba(255,255,255,0.03)';
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Subtle gradient bleed in corner */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 140, height: 140,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${project.color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{
          width: 54, height: 54, borderRadius: 16, flexShrink: 0,
          background: `${project.color}18`, border: `1px solid ${project.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
        }}>
          {project.emoji}
        </div>
        {!isPlaceholder && (
          <div style={{ color: '#475569', marginTop: 4 }}>
            {isInternal ? <ArrowUpRight size={18} /> : <ExternalLink size={16} />}
          </div>
        )}
      </div>

      {/* Name + status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          {project.name}
        </span>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
          background: st.bg, color: st.color, textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {st.label}
        </span>
      </div>

      {/* Short tagline */}
      <div style={{ fontSize: 13, color: project.color, fontWeight: 600, marginBottom: 10 }}>
        {project.description}
      </div>

      {/* Long desc */}
      <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.65, flex: 1, margin: 0, marginBottom: 20 }}>
        {project.longDesc}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
            background: 'rgba(255,255,255,0.05)', color: '#475569',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f1f5f9' }}>

      {/* Background glow */}
      <div style={{
        position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px 100px', position: 'relative' }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 13,
              background: 'linear-gradient(135deg,#6366f1,#4338ca)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 900, color: 'white',
              boxShadow: '0 0 30px rgba(99,102,241,0.3)',
            }}>U</div>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em' }}>Usternium</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900,
            letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Things I built.
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: '#475569', maxWidth: 480, lineHeight: 1.7 }}>
            A collection of projects — tools, apps, and experiments. Click any card to open it.
          </p>
        </div>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: 18,
        }}>
          {projects.map(p => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 72, paddingTop: 32,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 13, color: '#334155' }}>usternium.com</span>
          <span style={{ fontSize: 13, color: '#334155' }}>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </div>
  );
}
