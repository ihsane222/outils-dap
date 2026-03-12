import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { SceneWrapper } from '../shared/SceneWrapper';
import { COLORS } from '../shared/design';
import { fadeUp, fadeIn, slideFromLeft } from '../shared/animations';

export const Scene05Donnees: React.FC = () => {
  const frame = useCurrentFrame();

  const rows = [
    { id: 'C001', client: 'Dupont Marie', type: 'Non-vie', statut: 'Actif' },
    { id: 'C002', client: 'Martin Jean-Paul', type: 'IBIP', statut: 'Actif' },
    { id: 'C003', client: 'Lecomte Sophie', type: 'Non-vie', statut: 'Actif' },
    { id: 'C004', client: 'Bernard Luc', type: 'Non-vie', statut: 'Actif' },
    { id: 'C005', client: 'Moreau Claire', type: 'IBIP', statut: 'Actif' },
  ];

  return (
    <SceneWrapper sceneNum={5}>
      <AbsoluteFill style={{ padding: '100px 120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Titre */}
        <div style={fadeUp(frame, 0, 8)}>
          <div style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: COLORS.accent,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>
            Étape 2
          </div>
          <div style={{
            fontSize: 38,
            fontWeight: 800,
            color: COLORS.text,
            marginBottom: 32,
          }}>
            📂 Lecture des dossiers clients
          </div>
        </div>

        {/* Table */}
        <div style={{
          ...fadeIn(frame, 8, 8),
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 100px 80px',
            padding: '12px 20px',
            background: `${COLORS.primary}20`,
            borderBottom: `1px solid ${COLORS.border}`,
          }}>
            {['ID', 'Client', 'Type', 'Statut'].map((h) => (
              <div key={h} style={{
                fontSize: 11,
                fontWeight: 700,
                color: COLORS.primary,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.id}
              style={{
                ...slideFromLeft(frame, 14 + i * 6, 8),
                display: 'grid',
                gridTemplateColumns: '80px 1fr 100px 80px',
                padding: '11px 20px',
                borderBottom: i < rows.length - 1 ? `1px solid ${COLORS.border}40` : 'none',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, fontFamily: 'monospace' }}>{row.id}</div>
              <div style={{ fontSize: 14, color: COLORS.text, fontWeight: 500 }}>{row.client}</div>
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: row.type === 'IBIP' ? COLORS.accent2 : COLORS.textMuted,
                padding: '3px 10px',
                borderRadius: 12,
                background: row.type === 'IBIP' ? `${COLORS.accent2}18` : `${COLORS.textMuted}12`,
                width: 'fit-content',
              }}>
                {row.type}
              </div>
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.success,
              }}>
                {row.statut}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ ...fadeIn(frame, 48, 8), display: 'flex', gap: 20 }}>
          <div style={{
            padding: '7px 18px',
            borderRadius: 20,
            background: `${COLORS.success}18`,
            border: `1px solid ${COLORS.success}40`,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.success,
          }}>
            11 dossiers chargés
          </div>
          <div style={{
            padding: '7px 18px',
            borderRadius: 20,
            background: `${COLORS.textMuted}12`,
            border: `1px solid ${COLORS.border}`,
            fontSize: 13,
            fontWeight: 500,
            color: COLORS.textMuted,
          }}>
            Inactifs filtrés automatiquement
          </div>
        </div>
      </AbsoluteFill>
    </SceneWrapper>
  );
};
