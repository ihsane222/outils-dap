import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { COLORS } from '../shared/design';
import { AutoSceneWrapper } from '../shared/AutoSceneWrapper';

const ACCENT = '#6366F1';
const SCENE_DURATION = 450; // 15s — doit correspondre à CourtisAutomations.tsx

export const SceneOutro: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeO = (d: number, dur = 25) =>
    interpolate(frame, [d, d + dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const slideY = (d: number) =>
    interpolate(frame, [d, d + 30], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Fade to black sur les 5 dernières secondes (150 frames)
  const fadeToBlack = interpolate(
    frame,
    [SCENE_DURATION - 150, SCENE_DURATION - 10],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const lines = [
    { text: "J'espère que tu as bien aimé, et que ça t'a donné une idée", delay: 18 },
    { text: "de ce qu'on peut faire concrètement avec ces outils.", delay: 30 },
  ];

  return (
    <AutoSceneWrapper accent={ACCENT} sceneNum={3}>
      {/* Ligne décorative centrale */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: 1,
          height: '100%',
          background: `linear-gradient(180deg, transparent 0%, ${ACCENT}18 40%, ${ACCENT}18 60%, transparent 100%)`,
          transform: 'translateX(-50%)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          padding: '0 200px',
        }}
      >
        {/* Tag */}
        <div style={{ opacity: fadeO(0), transform: `translateY(${slideY(0)}px)`, marginBottom: 36 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: `${ACCENT}15`,
              border: `1px solid ${ACCENT}35`,
              borderRadius: 6,
              padding: '5px 16px',
              fontSize: 11,
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Pour toi
          </div>
        </div>

        {/* Destinataire */}
        <div style={{ opacity: fadeO(6), transform: `translateY(${slideY(6)}px)`, marginBottom: 28, textAlign: 'center' }}>
          <span
            style={{
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              background: `linear-gradient(135deg, ${COLORS.text} 30%, ${ACCENT})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}
          >
            Etienne,
          </span>
        </div>

        {/* Corps du message */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
            marginBottom: 48,
            maxWidth: 820,
            textAlign: 'center',
          }}
        >
          {lines.map((l, i) => (
            <div
              key={i}
              style={{
                opacity: fadeO(l.delay),
                transform: `translateY(${slideY(l.delay)}px)`,
                fontSize: 24,
                fontWeight: 400,
                color: COLORS.textMuted,
                lineHeight: 1.55,
              }}
            >
              {l.text}
            </div>
          ))}
        </div>

        {/* Séparateur animé */}
        <div
          style={{
            width: interpolate(frame, [55, 85], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            height: 1,
            background: `linear-gradient(90deg, transparent, ${ACCENT}60, transparent)`,
            marginBottom: 40,
          }}
        />

        {/* Invitation retour — ton décontracté */}
        <div
          style={{
            opacity: fadeO(65),
            transform: `translateY(${slideY(65)}px)`,
            maxWidth: 700,
            textAlign: 'center',
            marginBottom: 52,
          }}
        >
          <div style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.75 }}>
            Ces 3 workflows sont encore des maquettes, donc n'hésite pas
            à me faire un retour franc — ce que tu aimes, ce que tu changerais,
            ce qui manque. Ca m'aiderait vraiment pour la suite.
          </div>
        </div>

        {/* Signature */}
        <div
          style={{
            opacity: fadeO(88),
            transform: `translateY(${slideY(88)}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 21, fontWeight: 700, color: COLORS.text, letterSpacing: '0.01em' }}>
              Hâte de démarrer quelque chose de solide avec toi.
            </div>
            <div style={{ fontSize: 14, color: ACCENT, fontWeight: 600, marginTop: 8, letterSpacing: '0.1em' }}>
              Fettache · Courtis V2
            </div>
          </div>

          {/* Logos tools */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 8 }}>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Img src={staticFile('logo-n8n.png')} style={{ height: 18, width: 'auto' }} />
            </div>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '7px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Img src={staticFile('logo-gmail.png')} style={{ height: 16, width: 'auto' }} />
              <span style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 500 }}>Gmail</span>
            </div>
            <div
              style={{
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 8,
                padding: '7px 14px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Img src={staticFile('logo-dap.png')} style={{ height: 18, width: 'auto', opacity: 0.75 }} />
            </div>
          </div>
        </div>

        {/* Orb décoratif centré */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`,
            pointerEvents: 'none',
            opacity: interpolate(frame, [0, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}
        />
      </div>

      {/* Fade to black final — smooth sur 5s */}
      <AbsoluteFill
        style={{
          background: '#000',
          opacity: fadeToBlack,
          pointerEvents: 'none',
        }}
      />
    </AutoSceneWrapper>
  );
};
