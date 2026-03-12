import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const ACCENT = '#06B6D4';

const NODES = [
  { num: '①', label: 'Déclencheur Mensuel', sub: '1er du mois' },
  { num: '②', label: 'Données clients', sub: 'Portefeuille complet' },
  { num: '③', label: 'Moteur Upsell', sub: '5 règles commerciales' },
  { num: '④', label: 'Opportunités ?', sub: 'Filtre conditionnel' },
  { num: '⑤', label: 'Email personnalisé', sub: 'Un email par client ciblé' },
  { num: '⑥', label: 'Rapport Manager', sub: 'Statistiques mensuelles' },
];

export const SceneAuto03Workflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 160 } });

  const fadeO = (d: number) =>
    interpolate(frame, [d, d + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slideX = (d: number) =>
    interpolate(frame, [d, d + 20], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AutoSceneWrapper accent={ACCENT} sceneNum={6}>
      <div
        style={{
          position: 'absolute',
          top: 100,
          bottom: 50,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div style={{ flexShrink: 0, width: 340, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ opacity: fadeO(0), transform: `translateX(${slideX(0)}px)` }}>
            <div
              style={{
                display: 'inline-flex',
                gap: 8,
                alignItems: 'center',
                background: `${ACCENT}15`,
                border: `1px solid ${ACCENT}35`,
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Workflow · n8n
            </div>
          </div>

          <div style={{ opacity: fadeO(6), transform: `translateX(${slideX(6)}px)` }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: COLORS.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Upsell
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #67E8F9)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Portefeuille
              </span>
            </div>
          </div>

          {/* Action phrase */}
          <div style={{ opacity: fadeO(12), transform: `translateX(${slideX(12)}px)` }}>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textMuted,
                lineHeight: 1.65,
                borderLeft: `3px solid ${ACCENT}`,
                paddingLeft: 14,
              }}
            >
              Le 1er du mois, le moteur analyse chaque portefeuille, identifie les gaps selon 5 règles métier, et envoie un email commercial personnalisé à chaque client concerné. Le manager reçoit un rapport consolidé.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {NODES.map((n, i) => {
              const d = 14 + i * 7;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    opacity: fadeO(d),
                    transform: `translateX(${slideX(d)}px)`,
                  }}
                >
                  <span style={{ fontSize: 15, color: ACCENT, fontWeight: 700, minWidth: 24 }}>
                    {n.num}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{n.label}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{n.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ width: '100%', height: 1, background: COLORS.border, opacity: fadeO(65) }} />

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: fadeO(68) }}>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Img src={staticFile('logo-n8n.png')} style={{ height: 20, width: 'auto' }} />
            </div>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <Img src={staticFile('logo-gmail.png')} style={{ height: 18, width: 'auto' }} />
              <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>Gmail</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            opacity: interpolate(frame, [8, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${cardSpring}) translateY(${interpolate(frame, [8, 35], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}
        >
          <div
            style={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: `0 0 60px ${ACCENT}18, 0 20px 60px rgba(0,0,0,0.55)`,
            }}
          >
            <div
              style={{
                background: COLORS.surface,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F' }} />
              <div
                style={{
                  flex: 1,
                  background: COLORS.bg,
                  borderRadius: 5,
                  padding: '4px 12px',
                  fontSize: 11,
                  color: COLORS.textMuted,
                  marginLeft: 12,
                  fontFamily: 'monospace',
                  opacity: 0.65,
                }}
              >
                n8n · Upsell Portefeuille — Courtis
              </div>
            </div>

            {/* Screenshot — full workflow, no crop */}
            <div style={{ background: '#eef0f3' }}>
              <Img
                src={staticFile('workflow-upsell.png')}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>

            <div
              style={{
                background: COLORS.surface,
                borderTop: `1px solid ${COLORS.border}`,
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: ACCENT,
                  boxShadow: `0 0 7px ${ACCENT}`,
                }}
              />
              <span style={{ fontSize: 11, color: COLORS.textMuted }}>
                Workflow actif · 5 règles · Rapport mensuel consolidé
              </span>
            </div>
          </div>
        </div>
      </div>
    </AutoSceneWrapper>
  );
};
