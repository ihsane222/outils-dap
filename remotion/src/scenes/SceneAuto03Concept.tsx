import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const ACCENT = '#06B6D4';

const STEPS = [
  { icon: '🔬', label: 'Analyser', desc: "Détecte les gaps de couverture dans chaque portefeuille" },
  { icon: '🎯', label: 'Personnaliser', desc: '5 règles métier : MRH, RC Auto, PJ, Bilan, RC Pro' },
  { icon: '📨', label: 'Proposer', desc: 'Email commercial sur mesure envoyé à chaque client ciblé' },
];

export const SceneAuto03Concept: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeO = (d: number) =>
    interpolate(frame, [d, d + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slideY = (d: number) =>
    interpolate(frame, [d, d + 22], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AutoSceneWrapper accent={ACCENT} sceneNum={5}>
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
          03
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
            <span>📈</span> Automatisation 03
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
            Upsell
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #67E8F9 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Portefeuille
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
            Moteur de règles · Emails personnalisés · Rapport mensuel manager
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
                  style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}
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

        {/* Rules chips */}
        <div style={{ opacity: fadeO(44), transform: `translateY(${slideY(44)}px)` }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['MRH', 'RC Auto', 'Protection Juridique', 'Bilan couverture', 'RC Pro'].map(
              (rule, i) => (
                <div
                  key={i}
                  style={{
                    background: `${ACCENT}15`,
                    border: `1px solid ${ACCENT}35`,
                    color: ACCENT,
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '6px 16px',
                    borderRadius: 20,
                    opacity: interpolate(frame, [44 + i * 5, 60 + i * 5], [0, 1], {
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  }}
                >
                  {rule}
                </div>
              )
            )}
          </div>
        </div>

        {/* Timing */}
        <div style={{ opacity: fadeO(70), transform: `translateY(${slideY(70)}px)` }}>
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
            <span style={{ fontSize: 20 }}>📈</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.text }}>
              Le 1er de chaque mois · Rapport consolidé manager
            </span>
          </div>
        </div>
      </div>
    </AutoSceneWrapper>
  );
};
