import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene01Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 250 } });
  const ringOpacity = interpolate(frame, [5, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ringScale = interpolate(frame, [5, 30], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneWrapper sceneNum={1}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {/* Logo ring + C */}
        <div
          style={{
            position: 'relative',
            width: 160,
            height: 160,
            opacity: ringOpacity,
            transform: `scale(${ringScale})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `4px solid ${COLORS.primary}`,
              boxShadow: `0 0 40px ${COLORS.primary}60, inset 0 0 30px ${COLORS.primary}20`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 8,
              borderRadius: '50%',
              border: `2px solid ${COLORS.accent}40`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 72,
              fontWeight: 900,
              color: COLORS.text,
              letterSpacing: '-0.05em',
              transform: `scale(${logoScale})`,
            }}
          >
            C
          </div>
        </div>

        {/* COURTIS wordmark */}
        <div style={fadeUp(frame, 12, 10)}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: '0.25em',
              background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
            }}
          >
            COURTIS
          </div>
        </div>

        {/* Tagline */}
        <div style={fadeUp(frame, 22, 10)}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: COLORS.textMuted,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Scan Quotidien de Conformité
          </div>
        </div>

        {/* Divider */}
        <div style={{ ...fadeIn(frame, 32, 8), display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 60, height: 1, background: `${COLORS.primary}60` }} />
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: COLORS.accent,
            }}
          />
          <div style={{ width: 60, height: 1, background: `${COLORS.primary}60` }} />
        </div>

        {/* Sub-label */}
        <div style={{ ...scaleUp(frame, 40, 10), textAlign: 'center' }}>
          <div
            style={{
              fontSize: 15,
              color: COLORS.textMuted,
              letterSpacing: '0.08em',
            }}
          >
            Cabinets de courtage en assurance · LCB-FT · FSMA
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
