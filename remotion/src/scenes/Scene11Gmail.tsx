import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene11Gmail: React.FC = () => {
  const frame = useCurrentFrame();

  const emailX = interpolate(frame, [20, 45], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const emailOpacity = interpolate(frame, [20, 36, 44, 48], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const timerProgress = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const timerSecs = (timerProgress * 2).toFixed(1);

  return (
    <SceneWrapper sceneNum={11}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Badge étape */}
        <div style={{ ...fadeIn(frame, 0, 8), marginBottom: 20 }}>
          <div style={{
            padding: '6px 18px',
            borderRadius: 20,
            background: `${COLORS.success}18`,
            border: `1px solid ${COLORS.success}50`,
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.success,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Étape 6 — Final
          </div>
        </div>

        {/* Titre */}
        <div style={{ ...fadeUp(frame, 5, 8), textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text, marginBottom: 8 }}>
            📨 Email envoyé au gestionnaire
          </div>
          <div style={{ fontSize: 18, color: COLORS.textMuted }}>
            ihsanefettache2@gmail.com
          </div>
        </div>

        {/* Icône email animée */}
        <div style={{
          ...scaleUp(frame, 12, 9),
          marginBottom: 36,
          opacity: emailOpacity,
          transform: `translateX(${emailX}px)`,
          fontSize: 80,
          filter: `drop-shadow(0 0 30px ${COLORS.success}60)`,
        }}>
          ✉️
        </div>

        {/* Check envoyé */}
        <div style={{
          ...scaleUp(frame, 46, 8),
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `${COLORS.success}20`,
            border: `2px solid ${COLORS.success}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
          }}>
            ✓
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.success }}>
            Automatiquement · Sans aucune action humaine
          </div>
        </div>

        {/* Timer animé */}
        <div style={{ ...fadeIn(frame, 40, 8) }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: '10px 22px',
          }}>
            <span style={{ fontSize: 16 }}>⏱</span>
            <span style={{ fontSize: 16, color: COLORS.textMuted }}>Temps total :</span>
            <span style={{
              fontSize: 20,
              fontWeight: 800,
              color: COLORS.accent,
              fontFamily: 'monospace',
              minWidth: 60,
            }}>
              ~{timerSecs}s
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
