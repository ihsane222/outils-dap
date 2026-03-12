import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const ACCENT = '#818CF8';

const STEPS = [
  { icon: '🎯', label: 'Identifier', desc: 'Clients sans email ni GSM dans la base' },
  { icon: '✉️', label: 'Contacter', desc: 'Formulaire personnalisé envoyé automatiquement' },
  { icon: '🔁', label: 'Relancer', desc: 'Relance J+3 et J+7 si pas de réponse' },
];

export const SceneAuto02Concept: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeO = (d: number) =>
    interpolate(frame, [d, d + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slideY = (d: number) =>
    interpolate(frame, [d, d + 22], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AutoSceneWrapper accent={ACCENT} sceneNum={3}>
      <div
        style={{
          position: 'absolute',
          top: 90,
          bottom: 50,
          left: 80,
          right: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {/* Watermark */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: -10,
            fontSize: 240,
            fontWeight: 900,
            color: `${ACCENT}08`,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            pointerEvents: 'none',
            opacity: fadeO(0),
          }}
        >
          02
        </div>

        {/* Chip */}
        <div style={{ opacity: fadeO(0), transform: `translateY(${slideY(0)}px)` }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}40`,
              borderRadius: 30,
              padding: '6px 18px',
              fontSize: 12,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <span>📋</span> Automatisation 02
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: 'center',
            opacity: fadeO(8),
            transform: `translateY(${slideY(8)}px)`,
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: COLORS.text,
            }}
          >
            Enrichissement
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #A78BFA 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              des Contacts
            </span>
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textMuted,
              marginTop: 14,
              fontWeight: 400,
            }}
          >
            Collecte automatique · Relance intelligente · Base complète semaine après semaine
          </div>
        </div>

        {/* 3 cards */}
        <div style={{ display: 'flex', gap: 24, width: '100%', maxWidth: 1100 }}>
          {STEPS.map((s, i) => {
            const d = 20 + i * 10;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: '28px 24px',
                  borderTop: `3px solid ${ACCENT}`,
                  opacity: fadeO(d),
                  transform: `translateY(${slideY(d)}px)`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: 8,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timing */}
        <div style={{ opacity: fadeO(48), transform: `translateY(${slideY(48)}px)` }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: '12px 28px',
            }}
          >
            <span style={{ fontSize: 20 }}>📅</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.text }}>
              Déclenché chaque lundi à 8h · Rapport hebdo au manager
            </span>
          </div>
        </div>
      </div>
    </AutoSceneWrapper>
  );
};
