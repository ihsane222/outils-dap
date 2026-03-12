import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft, scaleUp } from '../shared/animations';

export const Scene13Stack: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { name: 'n8n-nodes-base.scheduleTrigger', label: 'Schedule Trigger', icon: '⏰', color: COLORS.accent },
    { name: 'n8n-nodes-base.code', label: 'Code Node ×2', icon: '💻', color: COLORS.primary },
    { name: 'n8n-nodes-base.if', label: 'IF (Conditionnel)', icon: '🔀', color: COLORS.accent2 },
    { name: 'n8n-nodes-base.gmail', label: 'Gmail', icon: '📧', color: COLORS.success },
  ];

  return (
    <SceneWrapper sceneNum={13}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={{ ...fadeUp(frame, 0, 8), marginBottom: 32 }}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            Pour Ethienne — La stack technique
          </div>
          <div style={{
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.text,
          }}>
            Comment c'est construit ?
          </div>
        </div>

        {/* Nœuds n8n */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {nodes.map((node, i) => (
            <div
              key={i}
              style={{
                ...slideFromLeft(frame, 10 + i * 7, 9),
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: '14px 20px',
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: `${node.color}20`,
                border: `1.5px solid ${node.color}60`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}>
                {node.icon}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 3 }}>{node.label}</div>
                <div style={{
                  fontSize: 12,
                  fontFamily: 'monospace',
                  color: node.color,
                  opacity: 0.8,
                }}>
                  {node.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sous-titre */}
        <div style={{ ...fadeIn(frame, 40, 8), marginBottom: 16 }}>
          <div style={{
            fontSize: 15,
            color: COLORS.textMuted,
            fontWeight: 500,
          }}>
            7 nœuds · Aucune infrastructure à gérer · Hébergé sur n8n cloud
          </div>
        </div>

        {/* Badges */}
        <div style={{ ...scaleUp(frame, 46, 8), display: 'flex', gap: 12 }}>
          {['Open source', 'Extensible', 'Webhook-ready'].map((tag, i) => (
            <div key={i} style={{
              padding: '7px 16px',
              borderRadius: 20,
              background: `${COLORS.primary}18`,
              border: `1px solid ${COLORS.primary}50`,
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.primary,
            }}>
              {tag}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
