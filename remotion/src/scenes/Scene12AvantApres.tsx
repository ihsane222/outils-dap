import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

export const Scene12AvantApres: React.FC = () => {
  const frame = useCurrentFrame();

  const avant = [
    { icon: '⏱', text: '3h de travail manuel' },
    { icon: '⚠️', text: 'Risque d\'oubli' },
    { icon: '📊', text: 'Excel et emails' },
    { icon: '❌', text: 'Erreurs humaines' },
  ];

  const apres = [
    { icon: '⚡', text: '2 secondes chrono' },
    { icon: '✅', text: 'Zéro oubli possible' },
    { icon: '🤖', text: '100% automatique' },
    { icon: '📋', text: 'Tracé et auditable' },
  ];

  return (
    <SceneWrapper sceneNum={12}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={{ ...fadeUp(frame, 0, 8), marginBottom: 32, textAlign: 'center' }}>
          <div style={{
            fontSize: 40,
            fontWeight: 800,
            color: COLORS.text,
          }}>
            Ce que Courtis change
          </div>
        </div>

        {/* 2 colonnes */}
        <div style={{ display: 'flex', gap: 0, alignItems: 'stretch' }}>
          {/* AVANT */}
          <div style={{
            ...slideFromLeft(frame, 8, 9),
            flex: 1,
            background: `#1a0a0a`,
            border: `1px solid #EF444440`,
            borderRadius: '12px 0 0 12px',
            padding: '24px 28px',
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: '#EF4444',
              textTransform: 'uppercase',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>✗</span> AVANT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {avant.map((item, i) => (
                <div key={i} style={{
                  ...fadeIn(frame, 14 + i * 5, 7),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: `#EF444412`,
                  border: `1px solid #EF444425`,
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 15, color: '#FCA5A5', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Séparateur central */}
          <div style={{
            ...fadeIn(frame, 8, 8),
            width: 3,
            background: `linear-gradient(to bottom, ${COLORS.primary}20, ${COLORS.primary}, ${COLORS.primary}20)`,
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: COLORS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 700,
              color: COLORS.text,
            }}>
              →
            </div>
          </div>

          {/* APRÈS */}
          <div style={{
            ...slideFromLeft(frame, 8, 9),
            flex: 1,
            background: `#0a1a10`,
            border: `1px solid ${COLORS.success}40`,
            borderRadius: '0 12px 12px 0',
            padding: '24px 28px',
          }}>
            <div style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: COLORS.success,
              textTransform: 'uppercase',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>✓</span> APRÈS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {apres.map((item, i) => (
                <div key={i} style={{
                  ...fadeIn(frame, 14 + i * 5, 7),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 8,
                  background: `${COLORS.success}12`,
                  border: `1px solid ${COLORS.success}25`,
                }}>
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 15, color: '#6EE7B7', fontWeight: 500 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
