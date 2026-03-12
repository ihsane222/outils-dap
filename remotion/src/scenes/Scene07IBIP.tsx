import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

export const Scene07IBIP: React.FC = () => {
  const frame = useCurrentFrame();

  const nonVieChecks = [
    '🪪 Pièce d\'identité',
    '📋 KYC signé',
    '🕵️ Screening PPE',
    '📄 Analyse besoins',
    '✍️ Contrat signé',
  ];

  const ibipChecks = [
    '📘 KID (document clé)',
    '🎯 Test d\'adéquation',
    '💰 Origine des fonds',
  ];

  return (
    <SceneWrapper sceneNum={7}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={{ ...fadeUp(frame, 0, 8), marginBottom: 32 }}>
          <div style={{
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.text,
          }}>
            Règles adaptées au type de produit
          </div>
        </div>

        {/* 2 colonnes */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
          {/* Non-vie */}
          <div style={{
            ...slideFromLeft(frame, 8, 9),
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: '20px',
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.textMuted,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              Non-vie
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {nonVieChecks.map((check, i) => (
                <div key={i} style={{
                  ...fadeIn(frame, 12 + i * 5, 7),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  color: COLORS.text,
                  fontWeight: 500,
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: COLORS.success,
                    flexShrink: 0,
                  }} />
                  {check}
                </div>
              ))}
            </div>
          </div>

          {/* Séparateur */}
          <div style={{
            ...fadeIn(frame, 10, 8),
            width: 2,
            background: `linear-gradient(to bottom, transparent, ${COLORS.primary}60, transparent)`,
            borderRadius: 2,
          }} />

          {/* IBIP */}
          <div style={{
            ...slideFromLeft(frame, 8, 9),
            flex: 1,
            background: COLORS.card,
            border: `1px solid ${COLORS.accent2}40`,
            borderRadius: 12,
            padding: '20px',
          }}>
            <div style={{
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.accent2,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              IBIP (branches 21/23/26)
            </div>
            <div style={{
              fontSize: 12,
              color: COLORS.textMuted,
              marginBottom: 14,
            }}>
              + les 5 checks Non-vie, plus :
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {ibipChecks.map((check, i) => (
                <div key={i} style={{
                  ...fadeIn(frame, 28 + i * 5, 7),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.accent2,
                  background: `${COLORS.accent2}12`,
                  border: `1px solid ${COLORS.accent2}30`,
                  borderRadius: 8,
                  padding: '8px 12px',
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: COLORS.accent2,
                    flexShrink: 0,
                  }} />
                  {check}
                </div>
              ))}
            </div>
            <div style={{ ...fadeIn(frame, 45, 7), marginTop: 12, fontSize: 11, color: COLORS.textMuted }}>
              Obligation IDD / MiFID
            </div>
          </div>
        </div>

        {/* Footer badge */}
        <div style={{ ...fadeIn(frame, 50, 8) }}>
          <div style={{
            padding: '8px 20px',
            borderRadius: 20,
            background: `${COLORS.warning}18`,
            border: `1px solid ${COLORS.warning}40`,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.warning,
            display: 'inline-block',
          }}>
            Personnes morales : UBO obligatoire — LCB-FT 2017
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
