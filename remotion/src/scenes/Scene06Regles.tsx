import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene06Regles: React.FC = () => {
  const frame = useCurrentFrame();

  const checks = [
    { icon: '🪪', label: "Pièce d'identité" },
    { icon: '📋', label: 'KYC signé' },
    { icon: '🕵️', label: 'Screening PPE' },
    { icon: '📄', label: 'Analyse besoins' },
    { icon: '📑', label: 'IPID / DIPA' },
    { icon: '✍️', label: 'Contrat signé' },
  ];

  return (
    <SceneWrapper sceneNum={6}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={fadeUp(frame, 0, 8)}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: COLORS.accent,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            Étape 3
          </div>
          <div style={{
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 6,
          }}>
            ⚙️ Moteur de Règles Courtis
          </div>
          <div style={{
            fontSize: 15,
            color: COLORS.textMuted,
            marginBottom: 32,
          }}>
            Loi 4 avril 2014 (IDD) · Loi 18 sept. 2017 (LCB-FT)
          </div>
        </div>

        {/* Grille de checks */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          marginBottom: 20,
        }}>
          {checks.map((check, i) => (
            <div
              key={i}
              style={{
                ...scaleUp(frame, 10 + i * 5, 8),
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: '12px 16px',
              }}
            >
              <span style={{ fontSize: 22 }}>{check.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{check.label}</span>
            </div>
          ))}
        </div>

        {/* Badges supplémentaires */}
        <div style={{ ...fadeIn(frame, 40, 8), display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          {['IBIP: KID', 'Suitability test', 'Origine fonds'].map((tag, i) => (
            <div key={i} style={{
              padding: '6px 14px',
              borderRadius: 16,
              background: `${COLORS.accent2}18`,
              border: `1px solid ${COLORS.accent2}50`,
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.accent2,
            }}>
              {tag}
            </div>
          ))}
          <div style={{
            padding: '6px 14px',
            borderRadius: 16,
            background: `${COLORS.warning}18`,
            border: `1px solid ${COLORS.warning}50`,
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.warning,
          }}>
            Personne morale: UBO vérifié
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
