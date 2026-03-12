import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

export const Scene03Constat: React.FC = () => {
  const frame = useCurrentFrame();

  const risks = [
    { icon: '📋', label: 'Documents manquants', detail: 'Dossiers incomplets non détectés' },
    { icon: '⌛', label: 'Pièces expirées', detail: "CNI, KBIS dépassés en circulation" },
    { icon: '✍️', label: 'Signatures absentes', detail: 'Contrats non validés' },
    { icon: '🔕', label: 'Oublis de relance', detail: 'Clients non contactés à temps' },
  ];

  return (
    <SceneWrapper sceneNum={3}>
      <AbsoluteFill style={{ padding: '80px 120px' }}>
        {/* Section label */}
        <div style={{ ...fadeIn(frame, 3, 8), marginBottom: 16 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: '#EF4444',
              textTransform: 'uppercase',
            }}
          >
            Le risque
          </div>
        </div>

        {/* Title */}
        <div style={fadeUp(frame, 8, 10)}>
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1.2,
              maxWidth: 680,
              marginBottom: 40,
            }}
          >
            Sans surveillance automatisée...
          </div>
        </div>

        {/* Risk cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            maxWidth: 780,
          }}
        >
          {risks.map((risk, i) => (
            <div
              key={risk.label}
              style={{
                ...slideFromLeft(frame, 18 + i * 8, 10),
                background: `${COLORS.card}`,
                border: `1px solid #EF444430`,
                borderLeft: `3px solid #EF4444`,
                borderRadius: 12,
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
              }}
            >
              <div style={{ fontSize: 28, lineHeight: 1 }}>{risk.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: 4,
                  }}
                >
                  {risk.label}
                </div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.4 }}>
                  {risk.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Warning note */}
        <div
          style={{
            ...fadeIn(frame, 52, 8),
            marginTop: 28,
            padding: '12px 20px',
            background: '#EF444410',
            border: `1px solid #EF444430`,
            borderRadius: 10,
            maxWidth: 500,
          }}
        >
          <div style={{ fontSize: 14, color: '#EF4444', fontWeight: 600 }}>
            ⚠️ Sanctions FSMA, pertes clients, amendes LCB-FT
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
