import { AbsoluteFill } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';
import { useCurrentFrame } from 'remotion';

export const Scene02Welcome: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    { icon: '📄', label: 'Contrats', sub: 'Polices & avenants' },
    { icon: '🪪', label: 'Pièces justificatives', sub: 'CNI, KBIS, attestations' },
    { icon: '⏰', label: "Dates d'échéance", sub: 'Renouvellements & alertes' },
  ];

  return (
    <SceneWrapper sceneNum={2}>
      <AbsoluteFill style={{ padding: '80px 120px' }}>
        {/* Section label */}
        <div style={{ ...fadeIn(frame, 3, 8), marginBottom: 16 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: COLORS.accent,
              textTransform: 'uppercase',
            }}
          >
            Le cabinet
          </div>
        </div>

        {/* Title */}
        <div style={fadeUp(frame, 8, 10)}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: COLORS.text,
              lineHeight: 1.2,
              maxWidth: 700,
              marginBottom: 12,
            }}
          >
            Un cabinet de courtage gère des centaines de dossiers clients...
          </div>
        </div>

        {/* Subtitle */}
        <div style={{ ...fadeIn(frame, 18, 8), marginBottom: 48 }}>
          <div style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 600 }}>
            Chaque dossier contient des documents critiques qui doivent rester conformes à tout moment.
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                ...slideFromLeft(frame, 26 + i * 8, 10),
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                background: COLORS.card,
                borderRadius: 16,
                padding: '20px 28px',
                border: `1px solid ${COLORS.primary}20`,
                maxWidth: 620,
              }}
            >
              <div style={{ fontSize: 36 }}>{item.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: 4,
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: 14, color: COLORS.textMuted }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
