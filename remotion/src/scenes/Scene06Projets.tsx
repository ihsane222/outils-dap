import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene06Projets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const clockScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 15, stiffness: 250 } });

  const tickOpacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneWrapper sceneNum={6}>
      <AbsoluteFill style={{ padding: '80px 120px' }}>
        {/* Section label */}
        <div style={{ ...fadeIn(frame, 3, 8), marginBottom: 16 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: COLORS.accent,
              textTransform: 'uppercase',
            }}
          >
            Étape 1 · Déclencheur
          </div>
        </div>

        {/* Title */}
        <div style={{ ...fadeUp(frame, 8, 10), marginBottom: 48 }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1.3,
              maxWidth: 650,
            }}
          >
            Chaque matin à{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.primary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              8h30
            </span>
            , Courtis se réveille automatiquement
          </div>
        </div>

        {/* Clock visual */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div
            style={{
              position: 'relative',
              width: 140,
              height: 140,
              transform: `scale(${clockScale})`,
            }}
          >
            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `4px solid ${COLORS.accent}`,
                boxShadow: `0 0 30px ${COLORS.accent}50`,
              }}
            />
            {/* Center */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 56,
              }}
            >
              ⏰
            </div>
          </div>

          <div>
            {/* Time display */}
            <div style={scaleUp(frame, 20, 10)}>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: COLORS.accent,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                08:30
              </div>
              <div style={{ fontSize: 16, color: COLORS.textMuted, marginTop: 8 }}>
                ScheduleTrigger · Tous les jours ouvrés
              </div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div
          style={{
            ...fadeIn(frame, 36, 8),
            display: 'flex',
            gap: 16,
            marginTop: 40,
          }}
        >
          {[
            { label: 'Fréquence', value: 'Quotidienne' },
            { label: 'Déclenchement', value: 'Automatique' },
            { label: 'Intervention', value: 'Zéro' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.accent}20`,
                borderRadius: 12,
                padding: '14px 20px',
                opacity: tickOpacity,
              }}
            >
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
