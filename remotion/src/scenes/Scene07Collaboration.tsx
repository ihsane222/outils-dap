import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

const members = [
  { initials: 'AL', name: 'Alice', role: 'Dev', color: '#6366F1', top: 140, left: 80 },
  { initials: 'BC', name: 'Bob', role: 'UX', color: '#06B6D4', top: 60, left: 260 },
  { initials: 'CE', name: 'Chloé', role: 'PM', color: '#8B5CF6', top: 220, left: 320 },
  { initials: 'DM', name: 'David', role: 'Data', color: '#10B981', top: 300, left: 120 },
  { initials: 'E', name: 'Ethienne', role: 'IT', color: '#F59E0B', top: 170, left: 200 },
];

const features = [
  { icon: '💬', label: 'Messagerie instantanée', color: COLORS.primary },
  { icon: '🔔', label: 'Mentions & notifications', color: COLORS.accent2 },
  { icon: '📁', label: 'Partage de documents', color: COLORS.accent },
  { icon: '🎥', label: 'Intégration visio', color: COLORS.success },
];

export const Scene07Collaboration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);
  const subtitleStyle = fadeUp(frame, 16, 10);

  const connectPulse = Math.sin((frame / fps) * Math.PI * 2) * 0.5 + 0.5;

  return (
    <SceneWrapper sceneNum={7}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', padding: '0 80px 0 120px', gap: 80 }}>
        {/* Left: Text + features */}
        <div style={{ flex: '0 0 620px' }}>
          <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.accent, textTransform: 'uppercase', marginBottom: 16 }}>
            Module 03 — Collaboration
          </div>

          <div style={{ ...titleStyle, fontSize: 60, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 20 }}>
            Travaillez ensemble,{' '}
            <span style={{ color: COLORS.accent }}>en temps réel</span>
          </div>

          <div style={{ ...subtitleStyle, fontSize: 18, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 48 }}>
            Finis les emails perdus et les réunions inutiles. Courtis centralise toute la communication de votre équipe.
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {features.map((f, i) => {
              const fStyle = scaleUp(frame, 110 + i * 40, 30);
              return (
                <div
                  key={i}
                  style={{
                    ...fStyle,
                    padding: '20px 24px',
                    background: `${f.color}15`,
                    border: `1px solid ${f.color}30`,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{f.icon}</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: f.color }}>{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Team orbit visualization */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            height: 450,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Connection lines (simplified) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `1px dashed ${COLORS.border}`,
              margin: '60px',
              opacity: interpolate(connectPulse, [0, 1], [0.3, 0.6]),
            }}
          />

          {/* Members */}
          {members.map((m, i) => {
            const mStyle = scaleUp(frame, 80 + i * 35, 30);
            const isEthienne = m.name === 'Ethienne';
            return (
              <div
                key={i}
                style={{
                  ...mStyle,
                  position: 'absolute',
                  top: m.top,
                  left: m.left,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: isEthienne ? 80 : 60,
                    height: isEthienne ? 80 : 60,
                    borderRadius: '50%',
                    background: `${m.color}30`,
                    border: `${isEthienne ? 3 : 2}px solid ${m.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isEthienne ? 22 : 18,
                    fontWeight: 700,
                    color: m.color,
                    boxShadow: isEthienne ? `0 0 30px ${m.color}60` : 'none',
                  }}
                >
                  {m.initials}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: isEthienne ? m.color : COLORS.textMuted }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: '1px' }}>
                  {m.role}
                </div>
              </div>
            );
          })}

          {/* Center hub */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              boxShadow: `0 0 ${20 + connectPulse * 20}px ${COLORS.primary}80`,
            }}
          />
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
