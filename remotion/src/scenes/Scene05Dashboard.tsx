import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn } from '../shared/animations';

export const Scene05Dashboard: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { icon: '⏰', label: 'Déclencheur', sub: '8h30', color: COLORS.accent },
    { icon: '📂', label: 'Dossiers', sub: 'Clients', color: COLORS.primary },
    { icon: '⚙️', label: 'Moteur', sub: 'Règles', color: COLORS.accent2 },
    { icon: '🔀', label: 'Verdict', sub: 'Anomalies?', color: '#F59E0B' },
    { icon: '📧', label: 'Rapport', sub: 'HTML', color: COLORS.primary },
    { icon: '📨', label: 'Email', sub: 'Gmail', color: COLORS.accent },
    { icon: '✅', label: 'Conforme', sub: 'OK', color: '#10B981' },
  ];

  return (
    <SceneWrapper sceneNum={5}>
      <AbsoluteFill style={{ padding: '80px 80px' }}>
        {/* Section label */}
        <div style={{ ...fadeIn(frame, 3, 8), marginBottom: 12 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.3em',
              color: COLORS.accent,
              textTransform: 'uppercase',
            }}
          >
            Le workflow n8n
          </div>
        </div>

        {/* Title */}
        <div style={{ ...fadeUp(frame, 8, 10), marginBottom: 40 }}>
          <div style={{ fontSize: 38, fontWeight: 800, color: COLORS.text }}>
            7 nœuds · Un pipeline complet
          </div>
        </div>

        {/* Nodes row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {nodes.map((node, i) => {
            const nodeOpacity = interpolate(frame, [16 + i * 6, 26 + i * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const nodeY = interpolate(frame, [16 + i * 6, 26 + i * 6], [30, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const connectorW = interpolate(frame, [22 + i * 6, 32 + i * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div key={node.label} style={{ display: 'flex', alignItems: 'center' }}>
                {/* Node */}
                <div
                  style={{
                    opacity: nodeOpacity,
                    transform: `translateY(${nodeY}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 20,
                      background: COLORS.card,
                      border: `2px solid ${node.color}50`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 20px ${node.color}30`,
                    }}
                  >
                    <div style={{ fontSize: 28 }}>{node.icon}</div>
                  </div>
                  <div
                    style={{
                      textAlign: 'center',
                      width: 90,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: COLORS.text,
                        lineHeight: 1.2,
                      }}
                    >
                      {node.label}
                    </div>
                    <div style={{ fontSize: 10, color: node.color, marginTop: 2 }}>{node.sub}</div>
                  </div>
                </div>

                {/* Connector */}
                {i < nodes.length - 1 && (
                  <div
                    style={{
                      width: 32,
                      height: 2,
                      background: `linear-gradient(90deg, ${node.color}60, ${nodes[i + 1].color}60)`,
                      transformOrigin: 'left center',
                      transform: `scaleX(${connectorW})`,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Workflow name */}
        <div style={{ ...fadeIn(frame, 56, 8), marginTop: 36 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: COLORS.surface,
              border: `1px solid ${COLORS.primary}30`,
              borderRadius: 10,
              padding: '10px 18px',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 8px #10B98180',
              }}
            />
            <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 500 }}>
              🛡️ Courtis — Scan Quotidien Conformité V1
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
