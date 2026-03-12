import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp, slideFromLeft } from '../shared/animations';

export const Scene10Rapport: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneWrapper sceneNum={10}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={{ ...fadeUp(frame, 0, 8), marginBottom: 28 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: COLORS.accent,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            Étape 5
          </div>
          <div style={{
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.text,
          }}>
            📧 Rapport généré automatiquement
          </div>
        </div>

        {/* Maquette email */}
        <div style={{
          ...scaleUp(frame, 8, 9),
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 16,
          overflow: 'hidden',
          maxWidth: 620,
        }}>
          {/* Header email */}
          <div style={{
            background: `linear-gradient(135deg, #0F2C52, #1a3a6a)`,
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ fontSize: 22 }}>🛡️</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>
                Scan quotidien de conformité
              </div>
              <div style={{ fontSize: 12, color: `${COLORS.text}80` }}>
                2026-02-17 · Courtis · FSMA
              </div>
            </div>
          </div>

          {/* Compteurs dans l'email */}
          <div style={{
            ...fadeIn(frame, 16, 8),
            display: 'flex',
            gap: 0,
            borderBottom: `1px solid ${COLORS.border}`,
          }}>
            {[
              { val: '8', label: 'dossiers', color: COLORS.warning },
              { val: '13', label: '🔴 Critiques', color: '#EF4444' },
              { val: '7', label: '🟠 Attentions', color: COLORS.warning },
            ].map((item, i) => (
              <div key={i} style={{
                flex: 1,
                padding: '14px 20px',
                textAlign: 'center',
                borderRight: i < 2 ? `1px solid ${COLORS.border}` : 'none',
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.val}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* Entrée exemple */}
          <div style={{
            ...slideFromLeft(frame, 26, 8),
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: `#EF444420`,
              border: `1.5px solid #EF444460`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              flexShrink: 0,
            }}>
              🔴
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
                Sophie Lecomte · C003 · NON-VIE
              </div>
              <div style={{ fontSize: 12, color: '#EF4444', fontWeight: 600 }}>
                6 anomalies détectées
              </div>
            </div>
            <div style={{
              marginLeft: 'auto',
              padding: '4px 12px',
              borderRadius: 12,
              background: '#EF444420',
              fontSize: 11,
              fontWeight: 700,
              color: '#EF4444',
            }}>
              CRITIQUE
            </div>
          </div>

          {/* Footer email */}
          <div style={{
            ...fadeIn(frame, 38, 8),
            padding: '10px 20px',
            background: `${COLORS.primary}10`,
            borderTop: `1px solid ${COLORS.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>
              Généré par Courtis · Loi 4 avril 2014
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>
              FSMA · Belgique
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
