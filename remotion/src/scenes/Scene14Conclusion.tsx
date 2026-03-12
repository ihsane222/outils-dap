import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene14Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 14, stiffness: 240 } });

  const ringOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneWrapper sceneNum={14}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Logo */}
        <div style={{
          opacity: ringOpacity,
          transform: `scale(${ringOpacity})`,
          marginBottom: 20,
        }}>
          <div style={{
            position: 'relative',
            width: 120,
            height: 120,
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `3px solid ${COLORS.primary}`,
              boxShadow: `0 0 40px ${COLORS.primary}50`,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 900,
              color: COLORS.text,
              transform: `scale(${logoScale})`,
            }}>
              C
            </div>
          </div>
        </div>

        {/* COURTIS */}
        <div style={{ ...fadeUp(frame, 8, 9), textAlign: 'center', marginBottom: 6 }}>
          <div style={{
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: '0.25em',
            background: `linear-gradient(135deg, ${COLORS.text} 0%, ${COLORS.accent} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            COURTIS
          </div>
        </div>

        {/* V1 badge */}
        <div style={{ ...scaleUp(frame, 16, 8), marginBottom: 36 }}>
          <div style={{
            padding: '6px 18px',
            borderRadius: 20,
            background: `${COLORS.primary}18`,
            border: `1px solid ${COLORS.primary}50`,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.primary,
          }}>
            V1 — Scan Quotidien de Conformité
          </div>
        </div>

        {/* Message */}
        <div style={{ ...fadeUp(frame, 24, 9), textAlign: 'center', maxWidth: 600, marginBottom: 14 }}>
          <div style={{
            fontSize: 22,
            fontWeight: 600,
            color: COLORS.text,
            lineHeight: 1.5,
            marginBottom: 12,
          }}>
            C'est ce qu'on a construit ensemble, Ihsane.
          </div>
          <div style={{
            fontSize: 17,
            color: COLORS.textMuted,
            lineHeight: 1.6,
          }}>
            La base d'un outil qui va changer le quotidien<br />
            des courtiers belges.
          </div>
        </div>

        {/* Divider */}
        <div style={{ ...fadeIn(frame, 36, 8), display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{ width: 50, height: 1, background: `${COLORS.primary}50` }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS.accent }} />
          <div style={{ width: 50, height: 1, background: `${COLORS.primary}50` }} />
        </div>

        {/* Footer */}
        <div style={{ ...fadeIn(frame, 44, 8), textAlign: 'center' }}>
          <div style={{
            fontSize: 14,
            color: COLORS.textMuted,
            letterSpacing: '0.08em',
          }}>
            DAP · 2025 · Pour Ethienne 👋
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
