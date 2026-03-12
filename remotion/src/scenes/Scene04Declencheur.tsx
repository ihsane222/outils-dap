import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene04Declencheur: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneWrapper sceneNum={4}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Badge étape */}
        <div style={{ ...fadeIn(frame, 0, 8), marginBottom: 24 }}>
          <div style={{
            padding: '6px 18px',
            borderRadius: 20,
            background: `${COLORS.accent}18`,
            border: `1px solid ${COLORS.accent}50`,
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.accent,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Étape 1
          </div>
        </div>

        {/* Icône horloge */}
        <div style={{
          ...scaleUp(frame, 5, 10),
          fontSize: 80,
          marginBottom: 20,
          filter: `drop-shadow(0 0 30px ${COLORS.primary}60)`,
        }}>
          ⏰
        </div>

        {/* Heure */}
        <div style={fadeUp(frame, 12, 9)}>
          <div style={{
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            textAlign: 'center',
            marginBottom: 16,
            background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            08:30
          </div>
        </div>

        {/* Sous-titre */}
        <div style={{ ...fadeUp(frame, 22, 8), textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            fontSize: 22,
            color: COLORS.textMuted,
            fontWeight: 500,
          }}>
            Chaque jour ouvrable · Lundi → Vendredi
          </div>
        </div>

        {/* Badge cron */}
        <div style={{ ...scaleUp(frame, 32, 8), marginBottom: 28 }}>
          <div style={{
            padding: '10px 24px',
            borderRadius: 10,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            fontFamily: 'monospace',
            fontSize: 18,
            color: COLORS.primary,
            letterSpacing: '0.1em',
          }}>
            cron: 30 8 * * 1-5
          </div>
        </div>

        {/* Footer */}
        <div style={{ ...fadeIn(frame, 42, 8), textAlign: 'center' }}>
          <div style={{
            fontSize: 16,
            color: COLORS.success,
            fontWeight: 600,
          }}>
            Zéro intervention humaine nécessaire
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
