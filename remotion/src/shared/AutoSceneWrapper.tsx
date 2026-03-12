import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { COLORS, FONT } from './design';
import { useVideoProgress } from './VideoProgressContext';

type Props = {
  children: React.ReactNode;
  accent: string;
  sceneNum?: number; // conservé pour compatibilité, non utilisé
};

export const AutoSceneWrapper: React.FC<Props> = ({ children, accent }) => {
  const frame = useCurrentFrame();
  const { startFrame, totalFrames, label } = useVideoProgress();

  const orbX = Math.sin(frame / 120) * 50;
  const orbY = Math.cos(frame / 150) * 35;

  // Progression globale (0 → 1)
  const globalFrame = startFrame + frame;
  const progress = Math.min(1, Math.max(0, globalFrame / totalFrames));

  // Effet liquide : légère pulsation sur le bord avant de la barre
  const tipPulse = Math.sin(frame / 6) * 0.18;
  const shimmerOpacity = 0.55 + Math.sin(frame / 10) * 0.2;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 25% 45%, #0B1825 0%, ${COLORS.bg} 65%)`,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Accent orb top-right */}
      <div
        style={{
          position: 'absolute',
          top: -200 + orbY,
          right: -120 + orbX,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}14 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Cyan orb bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: -200 - orbY,
          left: -120 - orbX,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accent}10 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top gradient bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${accent}, ${COLORS.accent2})`,
        }}
      />

      {/* Brand — top left */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 80,
          color: COLORS.textMuted,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.3em',
          opacity: 0.45,
          textTransform: 'uppercase',
        }}
      >
        COURTIS
      </div>

      {/* Logo DAP — discret, coin bas droite */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          right: 80,
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      >
        <Img src={staticFile('logo-dap.png')} style={{ height: 28, width: 'auto' }} />
      </div>

      {children}

      {/* ── Barre de progression globale ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 80px 14px',
          pointerEvents: 'none',
        }}
      >
        {/* Label contextuel */}
        {label ? (
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: accent,
              opacity: 0.75,
              marginBottom: 7,
            }}
          >
            {label}
          </div>
        ) : null}

        {/* Track */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 3,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 3,
          }}
        >
          {/* Fill */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${progress * 100}%`,
              borderRadius: 3,
              overflow: 'hidden',
              background: `linear-gradient(90deg, ${accent}55 0%, ${accent}CC 60%, ${accent} 100%)`,
            }}
          >
            {/* Shimmer liquide — se déplace vers la droite en boucle */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: 80,
                background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${shimmerOpacity * 0.4}) 70%, rgba(255,255,255,${shimmerOpacity * 0.7}) 100%)`,
                borderRadius: 3,
              }}
            />
          </div>

          {/* Bulle lumineuse au bord avant — effet liquide */}
          {progress > 0.005 && progress < 0.998 && (
            <div
              style={{
                position: 'absolute',
                left: `${progress * 100}%`,
                top: '50%',
                transform: `translate(-50%, -50%) scale(${1 + tipPulse})`,
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'white',
                boxShadow: `0 0 6px 1px ${accent}, 0 0 14px 2px ${accent}70`,
              }}
            />
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
