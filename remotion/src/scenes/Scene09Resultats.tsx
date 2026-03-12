import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, scaleUp } from '../shared/animations';

export const Scene09Resultats: React.FC = () => {
  const frame = useCurrentFrame();

  const countUp = (target: number, delay: number, duration: number) => {
    const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return Math.round(progress * target);
  };

  const dossiers = countUp(8, 8, 14);
  const critiques = countUp(13, 18, 14);
  const attentions = countUp(7, 28, 12);

  return (
    <SceneWrapper sceneNum={9}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Titre */}
        <div style={{ ...fadeUp(frame, 0, 8), textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 8,
          }}>
            Résultats du scan
          </div>
          <div style={{ fontSize: 16, color: COLORS.textMuted }}>
            11 dossiers analysés ce matin
          </div>
        </div>

        {/* 3 compteurs */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginBottom: 36,
        }}>
          {/* Dossiers non conformes */}
          <div style={{
            ...scaleUp(frame, 6, 9),
            background: COLORS.card,
            border: `2px solid ${COLORS.warning}60`,
            borderRadius: 16,
            padding: '28px 36px',
            textAlign: 'center',
            minWidth: 160,
          }}>
            <div style={{
              fontSize: 72,
              fontWeight: 900,
              color: COLORS.warning,
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {dossiers}
            </div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600 }}>
              dossiers non conformes
            </div>
          </div>

          {/* Critiques */}
          <div style={{
            ...scaleUp(frame, 16, 9),
            background: COLORS.card,
            border: `2px solid #EF444460`,
            borderRadius: 16,
            padding: '28px 36px',
            textAlign: 'center',
            minWidth: 160,
          }}>
            <div style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#EF4444',
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {critiques}
            </div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600 }}>
              🔴 Critiques
            </div>
          </div>

          {/* Attentions */}
          <div style={{
            ...scaleUp(frame, 26, 9),
            background: COLORS.card,
            border: `2px solid ${COLORS.warning}60`,
            borderRadius: 16,
            padding: '28px 36px',
            textAlign: 'center',
            minWidth: 160,
          }}>
            <div style={{
              fontSize: 72,
              fontWeight: 900,
              color: COLORS.warning,
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {attentions}
            </div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600 }}>
              🟠 Attentions
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ ...fadeIn(frame, 44, 8), textAlign: 'center' }}>
          <div style={{
            fontSize: 14,
            color: COLORS.textMuted,
            marginBottom: 6,
          }}>
            sur 11 dossiers analysés · 2 conformes · 1 inactif ignoré
          </div>
          <div style={{
            fontSize: 12,
            color: `${COLORS.textMuted}80`,
            fontFamily: 'monospace',
          }}>
            scan_date: 2026-02-17 · 08:30:14
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
