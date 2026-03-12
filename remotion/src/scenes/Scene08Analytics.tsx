import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

const metrics = [
  { label: 'Taux de complétion', value: 94, color: COLORS.success, suffix: '%' },
  { label: 'Temps moyen de traitement', value: 2.4, color: COLORS.accent, suffix: 'h' },
  { label: 'Incidents résolus', value: 127, color: COLORS.primary, suffix: '' },
  { label: 'Score satisfaction', value: 4.8, color: '#F59E0B', suffix: '/5' },
];

const pieSlices = [
  { label: 'Applications', value: 40, color: COLORS.primary },
  { label: 'Infrastructure', value: 30, color: COLORS.accent },
  { label: 'Sécurité', value: 20, color: COLORS.accent2 },
  { label: 'Autres', value: 10, color: COLORS.textMuted },
];

export const Scene08Analytics: React.FC = () => {
  const frame = useCurrentFrame();

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);

  const metricProgress = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneWrapper sceneNum={8}>
      <AbsoluteFill style={{ padding: '100px 120px 80px' }}>
        <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.warning, textTransform: 'uppercase', marginBottom: 12 }}>
          Module 04 — Analytics
        </div>

        <div style={{ ...titleStyle, fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 12 }}>
          Décidez avec{' '}
          <span style={{ color: COLORS.warning }}>les bonnes données</span>
        </div>

        <div style={{ ...fadeUp(frame, 16, 10), fontSize: 18, color: COLORS.textMuted, marginBottom: 48 }}>
          Rapports automatisés · Graphiques interactifs · Export multi-formats
        </div>

        {/* Metric bars */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {metrics.map((m, i) => {
            const mStyle = slideFromLeft(frame, 100 + i * 40, 30);
            const barW = m.value <= 5
              ? (m.value / 5) * 100 * metricProgress
              : m.value <= 100
              ? m.value * metricProgress
              : Math.min(100, (m.value / 200) * 100) * metricProgress;

            return (
              <div
                key={i}
                style={{
                  ...mStyle,
                  background: COLORS.card,
                  borderRadius: 14,
                  padding: '24px 28px',
                  border: `1px solid ${m.color}25`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 15, color: COLORS.textMuted }}>{m.label}</span>
                  <span style={{ fontSize: 28, fontWeight: 800, color: m.color }}>
                    {m.value}{m.suffix}
                  </span>
                </div>
                <div style={{ height: 8, background: COLORS.surface, borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${barW}%`,
                      background: `linear-gradient(90deg, ${m.color}, ${m.color}80)`,
                      borderRadius: 4,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Distribution */}
        <div
          style={{
            ...fadeIn(frame, 40, 10),
            background: COLORS.card,
            borderRadius: 16,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 40,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.textMuted, whiteSpace: 'nowrap' }}>
            Répartition des activités
          </div>
          <div style={{ flex: 1, display: 'flex', gap: 0, height: 24, borderRadius: 8, overflow: 'hidden' }}>
            {pieSlices.map((s, i) => (
              <div
                key={i}
                style={{
                  width: `${s.value * metricProgress}%`,
                  background: s.color,
                  transition: 'none',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {pieSlices.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.color }} />
                <span style={{ fontSize: 13, color: COLORS.textMuted }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
