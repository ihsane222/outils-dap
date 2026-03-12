import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

const secFeatures = [
  { icon: '🔐', label: 'Chiffrement AES-256', desc: 'Données chiffrées au repos et en transit', color: '#10B981' },
  { icon: '🛡️', label: 'Conformité RGPD', desc: 'Traitement des données conforme au règlement européen', color: '#6366F1' },
  { icon: '🔒', label: 'Authentification MFA', desc: 'Double facteur obligatoire pour les accès sensibles', color: '#06B6D4' },
  { icon: '📋', label: 'Logs d\'audit complets', desc: "Traçabilité totale de toutes les actions utilisateurs", color: '#F59E0B' },
  { icon: '🇫🇷', label: 'Hébergement souverain', desc: 'Données hébergées en France (OVHcloud)', color: '#EF4444' },
  { icon: '🔍', label: 'Pentest réguliers', desc: 'Tests d\'intrusion annuels par des experts certifiés', color: '#8B5CF6' },
];

export const Scene11Securite: React.FC = () => {
  const frame = useCurrentFrame();

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);
  const subtitleStyle = fadeUp(frame, 16, 10);

  const shieldPulse = Math.sin((frame / 45)) * 0.5 + 0.5;
  const shieldScale = interpolate(shieldPulse, [0, 1], [1, 1.05]);

  return (
    <SceneWrapper sceneNum={11}>
      <AbsoluteFill style={{ display: 'flex', alignItems: 'center', padding: '0 80px 0 120px', gap: 80 }}>
        {/* Left: Shield */}
        <div
          style={{
            flex: '0 0 300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              ...fadeIn(frame, 5, 10),
              width: 200,
              height: 220,
              background: `linear-gradient(135deg, ${COLORS.surface} 0%, ${COLORS.card} 100%)`,
              border: `3px solid ${COLORS.success}`,
              borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 80,
              boxShadow: `0 0 60px ${COLORS.success}40, 0 0 120px ${COLORS.success}20`,
              transform: `scale(${shieldScale})`,
            }}
          >
            🛡️
          </div>

          {/* Certifications */}
          {['ISO 27001', 'SOC 2', 'RGPD'].map((cert, i) => {
            const cStyle = fadeIn(frame, 80 + i * 30, 25);
            return (
              <div
                key={i}
                style={{
                  ...cStyle,
                  padding: '8px 20px',
                  background: `${COLORS.success}15`,
                  border: `1px solid ${COLORS.success}40`,
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 700,
                  color: COLORS.success,
                  letterSpacing: '1px',
                }}
              >
                ✓ {cert}
              </div>
            );
          })}
        </div>

        {/* Right: Features */}
        <div style={{ flex: 1 }}>
          <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.success, textTransform: 'uppercase', marginBottom: 12 }}>
            Sécurité & Conformité
          </div>

          <div style={{ ...titleStyle, fontSize: 60, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 16 }}>
            Vos données sont{' '}
            <span style={{ color: COLORS.success }}>entre de bonnes mains</span>
          </div>

          <div style={{ ...subtitleStyle, fontSize: 17, color: COLORS.textMuted, marginBottom: 40, lineHeight: 1.6 }}>
            La sécurité est au cœur de chaque décision d'architecture.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {secFeatures.map((f, i) => {
              const fStyle = slideFromLeft(frame, 110 + i * 40, 30);
              return (
                <div
                  key={i}
                  style={{
                    ...fStyle,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '14px 20px',
                    background: `${f.color}08`,
                    borderRadius: 10,
                    border: `1px solid ${f.color}20`,
                  }}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: f.color, marginBottom: 2 }}>
                      {f.label}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted }}>
                      {f.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
