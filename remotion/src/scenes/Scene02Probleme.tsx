import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

export const Scene02Probleme: React.FC = () => {
  const frame = useCurrentFrame();

  const bullets = [
    'Ouvrir chaque dossier client un par un',
    'Vérifier l\'identité, le KYC, les documents...',
    'Chercher les expiration dates dans Excel',
    'Rédiger et envoyer un email manuellement',
  ];

  return (
    <SceneWrapper sceneNum={2}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={fadeUp(frame, 0, 8)}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: COLORS.warning,
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Avant Courtis
          </div>
          <div style={{
            fontSize: 42,
            fontWeight: 800,
            color: COLORS.text,
            lineHeight: 1.15,
            marginBottom: 8,
          }}>
            3h de vérification manuelle
          </div>
          <div style={{
            fontSize: 20,
            color: COLORS.textMuted,
            marginBottom: 40,
          }}>
            Chaque matin, avant de pouvoir commencer la journée
          </div>
        </div>

        {/* Bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 40 }}>
          {bullets.map((text, i) => (
            <div
              key={i}
              style={{
                ...slideFromLeft(frame, 10 + i * 8, 9),
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: '14px 20px',
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `${COLORS.warning}22`,
                border: `1.5px solid ${COLORS.warning}60`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: COLORS.warning,
                fontWeight: 700,
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 17, color: COLORS.text, fontWeight: 500 }}>{text}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          ...fadeIn(frame, 45, 8),
          display: 'flex',
          gap: 24,
          alignItems: 'center',
        }}>
          {['Risque d\'oubli', 'Temps perdu', 'Erreurs humaines'].map((tag, i) => (
            <div key={i} style={{
              padding: '7px 16px',
              borderRadius: 20,
              background: `${COLORS.warning}18`,
              border: `1px solid ${COLORS.warning}50`,
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.warning,
              letterSpacing: '0.05em',
            }}>
              {tag}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
