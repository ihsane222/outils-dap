import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

const team = [
  { initials: 'SA', name: 'Sarah A.', role: 'Product Owner', desc: 'Vision & roadmap produit', color: '#6366F1' },
  { initials: 'MT', name: 'Marc T.', role: 'Lead Developer', desc: 'Architecture & code', color: '#06B6D4' },
  { initials: 'LB', name: 'Léa B.', role: 'UX Designer', desc: 'Expérience utilisateur', color: '#8B5CF6' },
  { initials: 'KO', name: 'Kevin O.', role: 'DevOps', desc: 'Infrastructure & déploiement', color: '#10B981' },
  { initials: 'AF', name: 'Amina F.', role: 'Data Engineer', desc: 'Analytics & data pipelines', color: '#F59E0B' },
];

export const Scene13Equipe: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelStyle = fadeIn(frame, 3, 10);
  const titleStyle = fadeUp(frame, 8, 10);
  const subtitleStyle = fadeUp(frame, 16, 10);

  const ethienneScale = spring({ frame: frame - 45, fps, config: { damping: 12, stiffness: 150 } });
  const ethienneOpacity = interpolate(frame, [42, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <SceneWrapper sceneNum={13}>
      <AbsoluteFill style={{ padding: '100px 120px 80px' }}>
        <div style={{ ...labelStyle, fontSize: 14, fontWeight: 600, letterSpacing: '4px', color: COLORS.accent2, textTransform: 'uppercase', marginBottom: 12 }}>
          L'équipe
        </div>

        <div style={{ ...titleStyle, fontSize: 64, fontWeight: 900, color: COLORS.text, lineHeight: 1.1, marginBottom: 16 }}>
          Des gens passionnés{' '}
          <span style={{ color: COLORS.accent2 }}>pour toi</span>
        </div>

        <div style={{ ...subtitleStyle, fontSize: 18, color: COLORS.textMuted, marginBottom: 48 }}>
          Une équipe pluridisciplinaire et bienveillante, toujours disponible.
        </div>

        {/* Team members */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          {team.map((m, i) => {
            const mStyle = scaleUp(frame, 100 + i * 40, 30);
            return (
              <div
                key={i}
                style={{
                  ...mStyle,
                  flex: 1,
                  background: COLORS.card,
                  borderRadius: 20,
                  padding: '28px 20px',
                  textAlign: 'center',
                  border: `1px solid ${m.color}25`,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: `${m.color}25`,
                    border: `2px solid ${m.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 700,
                    color: m.color,
                    margin: '0 auto 16px',
                  }}
                >
                  {m.initials}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: m.color, marginBottom: 8 }}>
                  {m.role}
                </div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.4 }}>
                  {m.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethienne joins! */}
        <div
          style={{
            opacity: ethienneOpacity,
            transform: `scale(${ethienneScale})`,
            background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.accent}15 100%)`,
            border: `2px solid ${COLORS.accent}`,
            borderRadius: 20,
            padding: '24px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            boxShadow: `0 0 60px ${COLORS.accent}20`,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
              boxShadow: `0 0 30px ${COLORS.accent}60`,
              flexShrink: 0,
            }}
          >
            E
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: COLORS.accent }}>
              + Ethienne — IT Engineer
            </div>
            <div style={{ fontSize: 16, color: COLORS.textMuted, marginTop: 4 }}>
              Et maintenant... tu rejoins l'aventure !
            </div>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: 36 }}>🎉</div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
