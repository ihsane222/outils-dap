import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const ACCENT = '#10B981';

const STEPS = [
  { icon: '🔍', label: 'Scan', desc: 'Chaque dossier client analysé chaque matin' },
  { icon: '⚙️', label: 'Règles', desc: 'Moteur de règles métier FSMA / LCB-FT' },
  { icon: '📧', label: 'Alerte', desc: "Rapport HTML envoyé à l'équipe en temps réel" },
];

export const SceneAuto01Concept: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeO = (d: number) =>
    interpolate(frame, [d, d + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slideY = (d: number) =>
    interpolate(frame, [d, d + 22], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AutoSceneWrapper accent={ACCENT} sceneNum={1}>
      <div
        style={{
          position: 'absolute',
          top: 90,
          bottom: 50,
          left: 80,
          right: 80,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {/* Watermark number */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: -10,
            fontSize: 240,
            fontWeight: 900,
            color: `${ACCENT}08`,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: fadeO(0),
          }}
        >
          01
        </div>

        {/* Chip */}
        <div style={{ opacity: fadeO(0), transform: `translateY(${slideY(0)}px)` }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: `${ACCENT}18`,
              border: `1px solid ${ACCENT}40`,
              borderRadius: 30,
              padding: '6px 18px',
              fontSize: 12,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <span>🛡️</span> Automatisation 01
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            textAlign: 'center',
            opacity: fadeO(8),
            transform: `translateY(${slideY(8)}px)`,
          }}
        >
          <div
            style={{
              fontSize: 62,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: COLORS.text,
            }}
          >
            Compliance
            <br />
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT} 0%, #34D399 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              & Alertes
            </span>
          </div>
          <div
            style={{
              fontSize: 18,
              color: COLORS.textMuted,
              marginTop: 14,
              fontWeight: 400,
            }}
          >
            Détection automatique · Rapport immédiat · Aucune anomalie sans alerte
          </div>
        </div>

        {/* 3 feature cards */}
        <div style={{ display: 'flex', gap: 24, width: '100%', maxWidth: 1100 }}>
          {STEPS.map((s, i) => {
            const d = 20 + i * 10;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: COLORS.card,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 14,
                  padding: '28px 24px',
                  borderTop: `3px solid ${ACCENT}`,
                  opacity: fadeO(d),
                  transform: `translateY(${slideY(d)}px)`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: COLORS.text,
                    marginBottom: 8,
                    letterSpacing: '0.04em',
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Timing pill */}
        <div style={{ opacity: fadeO(48), transform: `translateY(${slideY(48)}px)` }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 12,
              padding: '12px 28px',
            }}
          >
            <span style={{ fontSize: 20 }}>⏰</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.text }}>
              Déclenché automatiquement chaque jour à 8h30
            </span>
          </div>
        </div>
      </div>
    </AutoSceneWrapper>
  );
};
