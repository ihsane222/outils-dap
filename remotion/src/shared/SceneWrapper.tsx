import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, FONT } from './design';

type Props = {
  children: React.ReactNode;
  sceneNum: number;
};

export const SceneWrapper: React.FC<Props> = ({ children, sceneNum }) => {
  const frame = useCurrentFrame();
  const orbX = Math.sin(frame / 120) * 60;
  const orbY = Math.cos(frame / 150) * 40;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 20% 50%, #0A1628 0%, ${COLORS.bg} 70%)`,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      {/* Grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      {/* Animated orb top-right */}
      <div
        style={{
          position: 'absolute',
          top: -150 + orbY,
          right: -100 + orbX,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Animated orb bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: -150 - orbY,
          left: -100 - orbX,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accent}12 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent}, ${COLORS.accent2})`,
        }}
      />

      {/* Brand */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 80,
          color: COLORS.textMuted,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.3em',
          opacity: 0.5,
          textTransform: 'uppercase',
        }}
      >
        COURTIS
      </div>

      {/* Scene counter */}
      <div
        style={{
          position: 'absolute',
          top: 44,
          right: 80,
          color: COLORS.textMuted,
          fontSize: 16,
          fontWeight: 500,
          letterSpacing: '0.1em',
          opacity: 0.5,
        }}
      >
        {String(sceneNum).padStart(2, '0')}{' '}
        <span style={{ opacity: 0.4 }}>/ 14</span>
      </div>

      {/* Content */}
      {children}
    </AbsoluteFill>
  );
};
