import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

const integrations = [
  { name: 'Microsoft 365', icon: '📧', desc: 'Teams, Outlook, SharePoint', color: '#0078D4' },
  { name: 'Active Directory', icon: '🔑', desc: 'SSO & gestion des accès', color: '#6366F1' },
  { name: 'Jira / Confluence', icon: '📋', desc: 'Synchronisation des projets', color: '#0052CC' },
  { name: 'Slack', icon: '💬', desc: 'Alertes & notifications', color: '#4A154B' },
  { name: 'API REST', icon: '🔌', desc: 'Intégration sur mesure', color: '#10B981' },
  { name: 'Webhooks', icon: '⚡', desc: 'Événements en temps réel', color: '#F59E0B' },
];

export const Scene10Integrations: React.FC = () => {
  const frame = useCurrentFrame();

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);
  const subtitleStyle = fadeUp(frame, 16, 10);

  return (
    <SceneWrapper sceneNum={10}>
      <AbsoluteFill style={{ padding: '100px 120px 80px' }}>
        <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.success, textTransform: 'uppercase', marginBottom: 12 }}>
          Connectivité
        </div>

        <div style={{ ...titleStyle, fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 16 }}>
          Connecté à votre{' '}
          <span style={{ color: COLORS.success }}>SI</span>
        </div>

        <div style={{ ...subtitleStyle, fontSize: 18, color: COLORS.textMuted, marginBottom: 48 }}>
          Courtis s'intègre nativement avec vos outils existants — sans rupture de workflow.
        </div>

        {/* Integration grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {integrations.map((intg, i) => {
            const iStyle = scaleUp(frame, 100 + i * 40, 30);
            return (
              <div
                key={i}
                style={{
                  ...iStyle,
                  background: COLORS.card,
                  borderRadius: 18,
                  padding: '28px 28px',
                  border: `1px solid ${intg.color}25`,
                  display: 'flex',
                  gap: 18,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${intg.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 26,
                    flexShrink: 0,
                  }}
                >
                  {intg.icon}
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: intg.color, marginBottom: 6 }}>
                    {intg.name}
                  </div>
                  <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.5 }}>
                    {intg.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div
          style={{
            ...fadeIn(frame, 45, 10),
            marginTop: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            fontSize: 16,
            color: COLORS.textMuted,
          }}
        >
          <span style={{ color: COLORS.success, fontWeight: 700 }}>+</span>
          Des nouvelles intégrations ajoutées chaque trimestre
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
