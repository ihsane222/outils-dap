import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const ACCENT = '#06B6D4';

const HIGHLIGHTS = [
  { icon: '✓', text: 'Opportunité identifiée par le moteur de règles' },
  { icon: '✓', text: 'Produit manquant ciblé : RC Auto, MRH, PJ…' },
  { icon: '✓', text: 'Message commercial personnalisé par profil client' },
  { icon: '✓', text: 'CTA direct vers les offres du cabinet DAP' },
];

export const SceneAuto03Email: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame: frame - 8, fps, config: { damping: 20, stiffness: 160 } });

  const fadeO = (d: number) =>
    interpolate(frame, [d, d + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slideX = (d: number) =>
    interpolate(frame, [d, d + 20], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AutoSceneWrapper accent={ACCENT} sceneNum={6}>
      <div
        style={{
          position: 'absolute',
          top: 80,
          bottom: 40,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 70,
          alignItems: 'center',
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div style={{ flexShrink: 0, width: 360, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Badge */}
          <div style={{ opacity: fadeO(0), transform: `translateX(${slideX(0)}px)` }}>
            <div
              style={{
                display: 'inline-flex',
                gap: 8,
                alignItems: 'center',
                background: `${ACCENT}15`,
                border: `1px solid ${ACCENT}35`,
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 700,
                color: ACCENT,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Output · Gmail
            </div>
          </div>

          {/* Title */}
          <div style={{ opacity: fadeO(6), transform: `translateX(${slideX(6)}px)` }}>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: COLORS.text,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Email commercial
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #67E8F9)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                personnalisé
              </span>
            </div>
          </div>

          {/* Description */}
          <div style={{ opacity: fadeO(12), transform: `translateX(${slideX(12)}px)` }}>
            <div
              style={{
                fontSize: 14,
                color: COLORS.textMuted,
                lineHeight: 1.7,
                borderLeft: `3px solid ${ACCENT}`,
                paddingLeft: 14,
              }}
            >
              Le moteur détecte un gap dans le portefeuille et envoie automatiquement une proposition commerciale adaptée au profil exact du client.
            </div>
          </div>

          {/* Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {HIGHLIGHTS.map((h, i) => {
              const d = 20 + i * 9;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    opacity: fadeO(d),
                    transform: `translateX(${slideX(d)}px)`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: ACCENT,
                      fontWeight: 800,
                      marginTop: 2,
                      flexShrink: 0,
                    }}
                  >
                    {h.icon}
                  </span>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{h.text}</div>
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: COLORS.border, opacity: fadeO(65) }} />

          {/* Tool badge */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: fadeO(68) }}>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '7px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <Img src={staticFile('logo-gmail.png')} style={{ height: 18, width: 'auto' }} />
              <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>Gmail</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — large email preview ── */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            justifyContent: 'center',
            opacity: interpolate(frame, [8, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `scale(${cardSpring}) translateY(${interpolate(frame, [8, 35], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}
        >
          <div
            style={{
              width: 500,
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: `0 0 60px ${ACCENT}18, 0 20px 60px rgba(0,0,0,0.55)`,
            }}
          >
            {/* Browser header */}
            <div
              style={{
                background: COLORS.surface,
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                borderBottom: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F' }} />
              <div
                style={{
                  flex: 1,
                  background: COLORS.bg,
                  borderRadius: 5,
                  padding: '4px 12px',
                  fontSize: 11,
                  color: COLORS.textMuted,
                  marginLeft: 12,
                  fontFamily: 'monospace',
                  opacity: 0.65,
                }}
              >
                Gmail · Opportunité RC Auto — Cabinet DAP
              </div>
            </div>

            {/* Email screenshot — tall and readable */}
            <div
              style={{
                height: 760,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-start',
                background: '#f5f6f8',
              }}
            >
              <Img
                src={staticFile('email-upsell.jpg')}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </AutoSceneWrapper>
  );
};
