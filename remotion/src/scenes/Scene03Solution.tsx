import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene03Solution: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { icon: '⏰', label: 'Déclencheur' },
    { icon: '📂', label: 'Données' },
    { icon: '⚙️', label: 'Règles' },
    { icon: '🔍', label: 'Détection' },
    { icon: '📧', label: 'Rapport' },
    { icon: '📨', label: 'Email' },
  ];

  return (
    <SceneWrapper sceneNum={3}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={fadeUp(frame, 0, 8)}>
          <div style={{
            fontSize: 44,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 10,
          }}>
            Courtis automatise tout ça
          </div>
          <div style={{
            fontSize: 20,
            color: COLORS.textMuted,
            marginBottom: 48,
          }}>
            Un pipeline de 5 étapes, chaque matin à 8h30
          </div>
        </div>

        {/* Workflow steps */}
        <div style={{
          ...fadeIn(frame, 8, 8),
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginBottom: 48,
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{
                ...scaleUp(frame, 10 + i * 6, 8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                flex: 1,
              }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.accent}20)`,
                  border: `2px solid ${COLORS.primary}60`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 26,
                  boxShadow: `0 4px 20px ${COLORS.primary}30`,
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  textAlign: 'center',
                  letterSpacing: '0.05em',
                }}>
                  {step.label}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div style={{
                  ...fadeIn(frame, 20 + i * 4, 6),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                  flexShrink: 0,
                }}>
                  <div style={{ width: 20, height: 2, background: `${COLORS.primary}60` }} />
                  <div style={{
                    width: 0,
                    height: 0,
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: `7px solid ${COLORS.primary}60`,
                  }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{ ...fadeIn(frame, 48, 8), display: 'flex', justifyContent: 'center' }}>
          <div style={{
            padding: '10px 24px',
            borderRadius: 24,
            background: `${COLORS.success}18`,
            border: `1px solid ${COLORS.success}50`,
            fontSize: 15,
            fontWeight: 600,
            color: COLORS.success,
          }}>
            Zéro intervention humaine · 100% automatique
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
