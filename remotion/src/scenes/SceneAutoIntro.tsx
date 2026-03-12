import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const CARDS = [
  {
    num: '01',
    title: 'Compliance',
    sub: '& Alertes',
    accent: '#10B981',
    emoji: '🛡️',
    timing: 'Quotidien · 8h30',
    desc: 'Détection automatique des anomalies dossiers',
  },
  {
    num: '02',
    title: 'Enrichissement',
    sub: 'Contacts',
    accent: '#818CF8',
    emoji: '📋',
    timing: 'Hebdo · Lundi 8h',
    desc: 'Collecte automatique des GSM & emails manquants',
  },
  {
    num: '03',
    title: 'Upsell',
    sub: 'Portefeuille',
    accent: '#06B6D4',
    emoji: '📈',
    timing: 'Mensuel · 1er du mois',
    desc: 'Propositions commerciales ciblées sur les gaps de couverture',
  },
];

export const SceneAutoIntro: React.FC = () => {
  const frame = useCurrentFrame();

  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleO = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AutoSceneWrapper accent={COLORS.primary} sceneNum={0}>
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
          gap: 48,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', opacity: titleO, transform: `translateY(${titleY}px)` }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.35em',
              color: COLORS.textMuted,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            Courtis V2 · Cabinet DAP
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: COLORS.text,
              lineHeight: 1,
            }}
          >
            3 Automatisations{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Opérationnelles
            </span>
          </div>
          <div
            style={{
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
              borderRadius: 2,
              margin: '20px auto 0',
            }}
          />
        </div>

        {/* 3 cards */}
        <div style={{ display: 'flex', gap: 28, width: '100%' }}>
          {CARDS.map((c, i) => {
            const delay = 20 + i * 12;
            const cardO = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const cardY = interpolate(frame, [delay, delay + 25], [35, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: `linear-gradient(145deg, ${c.accent}12 0%, ${c.accent}06 100%)`,
                  border: `1px solid ${c.accent}35`,
                  borderRadius: 18,
                  padding: '32px 28px 28px',
                  opacity: cardO,
                  transform: `translateY(${cardY}px)`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Accent corner glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: -60,
                    right: -60,
                    width: 160,
                    height: 160,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${c.accent}20 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Emoji */}
                <div style={{ fontSize: 36, marginBottom: 18 }}>{c.emoji}</div>

                {/* Number chip */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: `${c.accent}20`,
                    border: `1px solid ${c.accent}40`,
                    borderRadius: 6,
                    padding: '3px 10px',
                    fontSize: 11,
                    fontWeight: 800,
                    color: c.accent,
                    letterSpacing: '0.2em',
                    marginBottom: 14,
                  }}
                >
                  {c.num}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: COLORS.text,
                    lineHeight: 1.15,
                    marginBottom: 12,
                  }}
                >
                  {c.title}
                  <br />
                  <span style={{ color: c.accent }}>{c.sub}</span>
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 14,
                    color: COLORS.textMuted,
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  {c.desc}
                </div>

                {/* Timing */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    padding: '7px 14px',
                    fontSize: 13,
                    color: COLORS.text,
                    fontWeight: 500,
                  }}
                >
                  <span>⏰</span>
                  <span>{c.timing}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AutoSceneWrapper>
  );
};
