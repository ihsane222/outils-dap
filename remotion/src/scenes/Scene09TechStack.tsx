import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

const stack = [
  { layer: 'Frontend', items: ['React 18', 'TypeScript', 'TailwindCSS'], color: '#06B6D4', icon: '🖥️' },
  { layer: 'Backend', items: ['Node.js', 'NestJS', 'GraphQL'], color: '#6366F1', icon: '⚙️' },
  { layer: 'Base de données', items: ['PostgreSQL', 'Redis', 'Elasticsearch'], color: '#8B5CF6', icon: '🗄️' },
  { layer: 'Infrastructure', items: ['Docker', 'Kubernetes', 'AWS'], color: '#10B981', icon: '☁️' },
  { layer: 'CI/CD', items: ['GitHub Actions', 'SonarQube', 'Datadog'], color: '#F59E0B', icon: '🔄' },
];

export const Scene09TechStack: React.FC = () => {
  const frame = useCurrentFrame();

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);
  const subtitleStyle = fadeUp(frame, 16, 10);

  return (
    <SceneWrapper sceneNum={9}>
      <AbsoluteFill style={{ padding: '100px 120px 80px' }}>
        <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.accent, textTransform: 'uppercase', marginBottom: 12 }}>
          Pour les équipes IT
        </div>

        <div style={{ ...titleStyle, fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 16 }}>
          La stack technique
        </div>

        <div style={{ ...subtitleStyle, fontSize: 18, color: COLORS.textMuted, marginBottom: 48 }}>
          Des technologies modernes, éprouvées et maintenues activement.
        </div>

        {/* Stack layers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {stack.map((layer, i) => {
            const layerStyle = scaleUp(frame, 100 + i * 50, 30);
            return (
              <div
                key={i}
                style={{
                  ...layerStyle,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  background: COLORS.card,
                  borderRadius: 14,
                  padding: '20px 28px',
                  border: `1px solid ${layer.color}25`,
                  borderLeft: `4px solid ${layer.color}`,
                }}
              >
                {/* Icon + label */}
                <div style={{ flex: '0 0 220px', display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 28 }}>{layer.icon}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: layer.color }}>
                    {layer.layer}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ width: 1, height: 36, background: COLORS.border }} />

                {/* Tech badges */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {layer.items.map((tech, j) => (
                    <div
                      key={j}
                      style={{
                        padding: '6px 16px',
                        background: `${layer.color}15`,
                        border: `1px solid ${layer.color}40`,
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 600,
                        color: layer.color,
                      }}
                    >
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
