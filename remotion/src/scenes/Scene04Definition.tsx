import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene04Definition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 15, stiffness: 250 } });

  const glowOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneWrapper sceneNum={4}>
      <AbsoluteFill style={{ padding: '80px 120px' }}>
        {/* Section label */}
        <div style={{ ...fadeIn(frame, 3, 8), marginBottom: 20 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: COLORS.accent,
              textTransform: 'uppercase',
            }}
          >
            L'idée
          </div>
        </div>

        {/* Main question */}
        <div style={fadeUp(frame, 8, 10)}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1.3,
              maxWidth: 700,
              marginBottom: 48,
            }}
          >
            Et si le système vérifiait à ta place, chaque matin, automatiquement ?
          </div>
        </div>

        {/* Logo hero */}
        <div
          style={{
            ...scaleUp(frame, 22, 10),
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          {/* Logo C */}
          <div
            style={{
              position: 'relative',
              width: 100,
              height: 100,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: `3px solid ${COLORS.primary}`,
                boxShadow: `0 0 ${glowOpacity * 40}px ${COLORS.primary}80`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
                fontWeight: 900,
                color: COLORS.text,
                transform: `scale(${logoScale})`,
              }}
            >
              C
            </div>
          </div>

          <div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                letterSpacing: '0.2em',
                background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accent} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              COURTIS
            </div>
            <div style={{ fontSize: 16, color: COLORS.textMuted, marginTop: 6 }}>
              Conformité automatique · Chaque matin · Sans intervention
            </div>
          </div>
        </div>

        {/* Benefit tags */}
        <div
          style={{
            ...fadeIn(frame, 40, 8),
            display: 'flex',
            gap: 12,
            marginTop: 36,
            flexWrap: 'wrap',
          }}
        >
          {['Zéro oubli', 'Temps réel', 'Traçable', 'Automatique'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 18px',
                borderRadius: 100,
                background: `${COLORS.primary}20`,
                border: `1px solid ${COLORS.primary}40`,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.primary,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
