import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

const stats = [
  { value: 500, suffix: '+', label: 'Utilisateurs actifs', icon: '👥', color: COLORS.primary },
  { value: 98, suffix: '%', label: 'Satisfaction utilisateur', icon: '⭐', color: '#F59E0B' },
  { value: 3, suffix: 'h', label: 'Économisées par semaine', icon: '⏱️', color: COLORS.accent },
  { value: 0, suffix: '', label: 'Incident majeur en 2024', icon: '🛡️', color: COLORS.success },
];

const testimonials = [
  {
    text: '"Courtis a transformé notre façon de travailler. On gagne un temps fou !"',
    name: 'Marie D.',
    role: 'Responsable IT',
    color: COLORS.primary,
  },
  {
    text: '"La visibilité sur nos projets est incomparable. On recommande les yeux fermés."',
    name: 'Thomas R.',
    role: 'Chef de projet',
    color: COLORS.accent2,
  },
];

export const Scene12Stats: React.FC = () => {
  const frame = useCurrentFrame();

  const countProgress = interpolate(frame, [5, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);

  return (
    <SceneWrapper sceneNum={12}>
      <AbsoluteFill style={{ padding: '100px 120px 80px' }}>
        <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.warning, textTransform: 'uppercase', marginBottom: 12 }}>
          L'impact Courtis
        </div>

        <div style={{ ...titleStyle, fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 48 }}>
          Les chiffres{' '}
          <span style={{ color: COLORS.warning }}>parlent d'eux-mêmes</span>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginBottom: 48 }}>
          {stats.map((s, i) => {
            const sStyle = scaleUp(frame, 80 + i * 45, 30);
            const displayValue = Math.round(s.value * countProgress);
            return (
              <div
                key={i}
                style={{
                  ...sStyle,
                  background: COLORS.card,
                  border: `1px solid ${s.color}30`,
                  borderRadius: 20,
                  padding: '32px 28px',
                  textAlign: 'center',
                  boxShadow: `0 0 40px ${s.color}15`,
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 56, fontWeight: 900, color: s.color, lineHeight: 1 }}>
                  {displayValue}{s.suffix}
                </div>
                <div style={{ fontSize: 15, color: COLORS.textMuted, marginTop: 12, lineHeight: 1.4 }}>
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {testimonials.map((t, i) => {
            const tStyle = fadeIn(frame, 380 + i * 40, 30);
            return (
              <div
                key={i}
                style={{
                  ...tStyle,
                  background: COLORS.card,
                  borderRadius: 16,
                  padding: '24px 28px',
                  borderLeft: `4px solid ${t.color}`,
                }}
              >
                <div style={{ fontSize: 16, color: COLORS.text, lineHeight: 1.6, marginBottom: 16, fontStyle: 'italic' }}>
                  {t.text}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.color }}>{t.name}</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>{t.role}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
