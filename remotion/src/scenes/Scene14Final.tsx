import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

const confettiItems = Array.from({ length: 20 }, (_, i) => ({
  x: (i / 20) * 1920,
  color: [COLORS.primary, COLORS.accent, COLORS.accent2, '#F59E0B', COLORS.success][i % 5],
  size: 8 + (i % 4) * 4,
  speed: 0.5 + (i % 3) * 0.3,
  delay: (i % 5) * 20,
}));

const nextSteps = [
  { icon: '📅', text: 'Réunion d\'onboarding lundi à 10h' },
  { icon: '💻', text: 'Accès aux environnements configurés' },
  { icon: '📖', text: 'Documentation technique disponible' },
  { icon: '🤝', text: "Ton mentor : Marc T. (Lead Dev)" },
];

export const Scene14Final: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });

  const titleStyle = fadeUp(frame, 8, 10);
  const subtitleStyle = fadeUp(frame, 20, 10);

  const glowPulse = Math.sin((frame / fps) * Math.PI * 1.5) * 0.5 + 0.5;
  const glowSize = interpolate(glowPulse, [0, 1], [200, 320]);

  return (
    <SceneWrapper sceneNum={14}>
      <AbsoluteFill>
        {/* Confetti */}
        {confettiItems.map((c, i) => {
          const yPos = interpolate(
            frame,
            [c.delay, c.delay + 600],
            [-20, 1120],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
          const rotation = (frame - c.delay) * c.speed * 3;
          const opacity = interpolate(frame, [c.delay, c.delay + 30], [0, 0.8], {
            extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: c.x,
                top: yPos,
                width: c.size,
                height: c.size,
                background: c.color,
                borderRadius: c.size / 4,
                transform: `rotate(${rotation}deg)`,
                opacity,
                pointerEvents: 'none',
              }}
            />
          );
        })}

        {/* Main content */}
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 120px',
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: -glowSize / 2,
              marginTop: -glowSize / 2 - 100,
              width: glowSize,
              height: glowSize,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.accent}30 0%, transparent 70%)`,
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          {/* Logo */}
          <div
            style={{
              transform: `scale(${logoScale})`,
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 70,
              fontWeight: 900,
              color: '#fff',
              boxShadow: `0 0 80px ${COLORS.primary}70, 0 0 160px ${COLORS.primary}30`,
              marginBottom: 48,
            }}
          >
            C
          </div>

          {/* Title */}
          <div
            style={{
              ...titleStyle,
              fontSize: 72,
              fontWeight: 900,
              color: COLORS.text,
              textAlign: 'center',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Ethienne, on est{' '}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ravis de t'avoir !
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              ...subtitleStyle,
              fontSize: 22,
              color: COLORS.textMuted,
              textAlign: 'center',
              marginBottom: 64,
            }}
          >
            Bienvenue dans l'aventure Courtis @ DAP
          </div>

          {/* Next steps */}
          <div
            style={{
              ...fadeIn(frame, 30, 10),
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              width: '100%',
              maxWidth: 900,
            }}
          >
            {nextSteps.map((s, i) => {
              const sStyle = scaleUp(frame, 140 + i * 35, 28);
              return (
                <div
                  key={i}
                  style={{
                    ...sStyle,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 24px',
                    background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 14,
                  }}
                >
                  <span style={{ fontSize: 24 }}>{s.icon}</span>
                  <span style={{ fontSize: 17, color: COLORS.text, fontWeight: 500 }}>{s.text}</span>
                </div>
              );
            })}
          </div>

          {/* Bottom branding */}
          <div
            style={{
              ...fadeIn(frame, 45, 10),
              position: 'absolute',
              bottom: 60,
              fontSize: 16,
              color: COLORS.textMuted,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              opacity: 0.5,
            }}
          >
            COURTIS · DAP · 2025
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
