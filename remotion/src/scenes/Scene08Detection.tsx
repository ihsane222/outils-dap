import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp, slideFromLeft } from '../shared/animations';

export const Scene08Detection: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneWrapper sceneNum={8}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Badge étape */}
        <div style={{ ...fadeIn(frame, 0, 8), marginBottom: 20 }}>
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
            Étape 4
          </div>
        </div>

        {/* Titre */}
        <div style={{ ...fadeUp(frame, 5, 8), textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text }}>
            🔍 Détection des anomalies
          </div>
        </div>

        {/* Nœud IF */}
        <div style={{
          ...scaleUp(frame, 12, 9),
          marginBottom: 28,
        }}>
          <div style={{
            width: 140,
            height: 80,
            background: `linear-gradient(135deg, ${COLORS.primary}30, ${COLORS.accent}20)`,
            border: `2px solid ${COLORS.primary}`,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 30px ${COLORS.primary}40`,
          }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>🔀</div>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.primary,
              letterSpacing: '0.1em',
            }}>
              IF
            </div>
          </div>
          <div style={{
            textAlign: 'center',
            marginTop: 10,
            fontSize: 15,
            fontWeight: 600,
            color: COLORS.textMuted,
          }}>
            Anomalies détectées ?
          </div>
        </div>

        {/* Branches */}
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>
          {/* Branche OUI */}
          <div style={{ ...slideFromLeft(frame, 24, 9), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 2, height: 30, background: `${COLORS.warning}60` }} />
            <div style={{
              padding: '12px 20px',
              borderRadius: 10,
              background: `${COLORS.warning}18`,
              border: `2px solid ${COLORS.warning}60`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🔴</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.warning }}>Rapport généré</div>
            </div>
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.warning,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              OUI
            </div>
          </div>

          {/* Branche NON */}
          <div style={{ ...slideFromLeft(frame, 32, 9), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 2, height: 30, background: `${COLORS.success}60` }} />
            <div style={{
              padding: '12px 20px',
              borderRadius: 10,
              background: `${COLORS.success}18`,
              border: `2px solid ${COLORS.success}60`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>✅</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.success }}>Tout conforme</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Silence</div>
            </div>
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              color: COLORS.success,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              NON
            </div>
          </div>
        </div>

        {/* Citation */}
        <div style={{ ...fadeIn(frame, 46, 8), marginTop: 28 }}>
          <div style={{
            fontSize: 14,
            fontStyle: 'italic',
            color: COLORS.textMuted,
            textAlign: 'center',
          }}>
            "Aucun email inutile si tout est OK"
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
