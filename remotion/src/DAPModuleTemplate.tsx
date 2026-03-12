import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { slide } from '@remotion/transitions/slide';
import { fade } from '@remotion/transitions/fade';
import { DAP_COLORS, getDomainColors, DAP_FONT, TITLE_FONT } from './shared/designDAP';
import type { ModuleData } from './modulesData';

// ─── Config ──────────────────────────────────────────────────────────────────
const FPS        = 30;
const TRANSITION = 15;
const T_SLIDE    = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION });
const T_FADE     = linearTiming({ durationInFrames: TRANSITION });

const S1 = 3 * FPS;    //  3s — Intro logo
const S2 = 9 * FPS;    //  9s — Titre module  (titre + cartes + badges)
const S3 = 8 * FPS;    //  8s — Objectifs     (lecture confortable)
const S4 = 4 * FPS;    //  4s — Outro
// Total brut = 24s — transitions = ~22.5s

export const DAP_MODULE_FRAMES = S1 + S2 + S3 + S4 - 3 * TRANSITION;
const TOTAL = DAP_MODULE_FRAMES;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const clamp = (f: number, from: number, to: number, out: [number, number]) =>
  interpolate(f, [from, to], out, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// ─── Scène 1 — Intro ─────────────────────────────────────────────────────────
const SceneIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoS   = spring({ frame, fps, config: { damping: 22, stiffness: 200 } });
  const lineW   = clamp(frame,  6, 28, [0, 360]);
  const titleOp = clamp(frame, 16, 36, [0, 1]);
  const titleY  = clamp(frame, 16, 36, [28, 0]);
  const subOp   = clamp(frame, 36, 60, [0, 1]);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, #1B3344 0%, ${DAP_COLORS.navy} 55%, #1a3a52 100%)`,
      fontFamily: DAP_FONT, overflow: 'hidden',
    }}>
      {/* Halos */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-8%',
        width: 700, height: 700, borderRadius: '50%',
        background: `radial-gradient(circle, ${DAP_COLORS.sky}22 0%, transparent 65%)`,
      }} />
      <div style={{
        position: 'absolute', bottom: '-12%', left: '-6%',
        width: 500, height: 500, borderRadius: '50%',
        background: `radial-gradient(circle, ${DAP_COLORS.sky}14 0%, transparent 65%)`,
      }} />

      {/* Grille subtile */}
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }} width="1920" height="1080">
        {Array.from({ length: 13 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 160} y1={0} x2={i * 160} y2={1080} stroke="white" strokeWidth="1" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 140} x2={1920} y2={i * 140} stroke="white" strokeWidth="1" />
        ))}
      </svg>

      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100%', gap: 26, position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{
          transform: `scale(${logoS})`,
          background: 'white', borderRadius: 20, padding: '22px 52px',
          boxShadow: `0 20px 60px rgba(0,0,0,0.35), 0 4px 20px rgba(0,0,0,0.2)`,
        }}>
          <Img src={staticFile('logo-dap.png')} style={{ height: 80, display: 'block' }} />
        </div>

        {/* Ligne dégradée */}
        <div style={{
          width: lineW, height: 4, borderRadius: 2,
          background: `linear-gradient(90deg, ${DAP_COLORS.navy}, ${DAP_COLORS.sky}, ${DAP_COLORS.navy})`,
          boxShadow: `0 0 20px ${DAP_COLORS.sky}70`,
        }} />

        {/* DAP ACADEMY */}
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <div style={{
            fontFamily: TITLE_FONT,
            fontSize: 72, fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '0.20em',
            textShadow: `0 0 40px ${DAP_COLORS.sky}60, 0 2px 8px rgba(0,0,0,0.4)`,
          }}>
            DAP ACADEMY
          </div>
        </div>

        <div style={{ opacity: subOp, textAlign: 'center' }}>
          <div style={{
            fontSize: 22, color: 'rgba(255,255,255,0.70)',
            fontWeight: 400, letterSpacing: '0.10em',
          }}>
            Plan Global de Formation · 2026
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 2 — Titre module ───────────────────────────────────────────────────
const SceneTitre: React.FC<{ data: ModuleData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const C = getDomainColors(data.domaine);

  const bgRightX  = clamp(frame,  0, 28, [200, 0]);
  const badgeOp   = clamp(frame,  0, 14, [0, 1]);
  const badgeX    = clamp(frame,  0, 14, [-50, 0]);
  const title1Op  = clamp(frame, 10, 28, [0, 1]);
  const title1Y   = clamp(frame, 10, 28, [40, 0]);
  const title2Op  = clamp(frame, 22, 38, [0, 1]);
  const title2Y   = clamp(frame, 22, 38, [40, 0]);
  const divW      = clamp(frame, 36, 58, [0, 160]);
  const metaOp    = clamp(frame, 58, 80, [0, 1]);
  const card1S    = spring({ frame: frame - 16, fps, config: { damping: 18, stiffness: 220 } });
  const card2S    = spring({ frame: frame - 32, fps, config: { damping: 18, stiffness: 220 } });
  const card3S    = spring({ frame: frame - 48, fps, config: { damping: 18, stiffness: 220 } });
  const bigNumOp  = clamp(frame,  8, 24, [0, 1]);
  const bigNumS   = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 160 } });
  const pulse     = 1 + 0.012 * Math.sin(frame * 0.12);
  const cardSprings = [card1S, card2S, card3S];

  return (
    <AbsoluteFill style={{ fontFamily: DAP_FONT, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: DAP_COLORS.offWhite }} />

      {/* Fond droit dégradé domaine */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '46%',
        transform: `translateX(${bgRightX}px)`,
        background: `linear-gradient(145deg, ${C.dark} 0%, ${C.primary} 55%, ${C.accent} 100%)`,
        clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)',
      }} />

      {/* Cercles décoratifs */}
      {[260, 170, 90].map((r, i) => (
        <div key={i} style={{
          position: 'absolute', right: 180, top: '50%',
          width: r * 2, height: r * 2, marginTop: -r,
          borderRadius: '50%',
          border: `2px solid rgba(255,255,255,${0.04 + i * 0.04})`,
          transform: `scale(${pulse})`,
        }} />
      ))}

      {/* Barre gauche */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 10,
        background: `linear-gradient(180deg, ${C.primary} 0%, ${C.accent} 100%)`,
      }} />

      {/* Logo */}
      <div style={{
        position: 'absolute', top: 36, left: 48,
        background: 'white', borderRadius: 12, padding: '10px 22px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)', opacity: metaOp,
      }}>
        <Img src={staticFile('logo-dap.png')} style={{ height: 38, display: 'block' }} />
      </div>

      {/* Contenu gauche */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: '56%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        paddingLeft: 100, paddingRight: 40, paddingTop: 80,
      }}>
        {/* Badge module */}
        <div style={{ opacity: badgeOp, transform: `translateX(${badgeX}px)`, marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: C.primary, borderRadius: 50, padding: '9px 22px',
            boxShadow: `0 4px 16px ${C.primary}40`,
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 900, color: 'white',
            }}>{data.num}</div>
            <span style={{ fontSize: 17, fontWeight: 800, color: 'white', letterSpacing: '0.08em' }}>
              MODULE · {data.domaineLabel.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Titre ligne 1 */}
        <div style={{ opacity: title1Op, transform: `translateY(${title1Y}px)` }}>
          <div style={{
            fontFamily: TITLE_FONT,
            fontSize: data.titleL1.length > 14 ? 64 : 84,
            fontWeight: 900, color: DAP_COLORS.text,
            lineHeight: 1, letterSpacing: '-0.02em',
          }}>
            {data.titleL1}
          </div>
        </div>

        {/* Titre ligne 2 */}
        {data.titleL2 && (
          <div style={{ opacity: title2Op, transform: `translateY(${title2Y}px)`, marginBottom: 20 }}>
            <div style={{
              fontFamily: TITLE_FONT,
              fontSize: 46, fontWeight: 700,
              background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
            }}>
              {data.titleL2}
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{
          width: divW, height: 4, borderRadius: 2,
          marginTop: data.titleL2 ? 0 : 12,
          marginBottom: 28,
          background: `linear-gradient(90deg, ${C.primary}, ${C.accent})`,
        }} />

        {/* Meta badges */}
        <div style={{ opacity: metaOp, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { icon: '⏱️', label: data.meta.duree,                  bg: C.light,              color: C.primary       },
            { icon: '🖥️', label: data.meta.format,                 bg: '#EBF6FC',            color: DAP_COLORS.sky  },
            { icon: '👥', label: `Public : ${data.meta.public}`,    bg: DAP_COLORS.offWhite,  color: DAP_COLORS.navy },
            { icon: '📅', label: data.meta.mois,                    bg: '#F5F3FF',            color: C.primary       },
          ].map(({ icon, label, bg, color }, i) => {
            const s = spring({ frame: frame - 58 - i * 10, fps, config: { damping: 16, stiffness: 280 } });
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                background: bg, borderRadius: 50, padding: '8px 18px',
                transform: `scale(${s})`,
                border: `1px solid ${color}22`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 17, fontWeight: 600, color }}>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenu droit */}
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: '44%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 22,
      }}>
        {/* Grand numéro décoratif */}
        <div style={{
          opacity: bigNumOp,
          fontSize: 180, fontWeight: 900,
          color: 'rgba(255,255,255,0.08)',
          lineHeight: 1, position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, -54%) scale(${bigNumS})`,
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}>
          {data.num}
        </div>

        {/* Cartes */}
        {data.cards.map(({ icon, title, sub }, i) => (
          <div key={i} style={{
            transform: `scale(${cardSprings[i]})`,
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            borderRadius: 18, padding: '18px 26px',
            border: '1px solid rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', gap: 16,
            width: 340,
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, flexShrink: 0,
              background: 'rgba(255,255,255,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26,
            }}>
              {icon}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'white', lineHeight: 1.2 }}>{title}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 3 — Objectifs ──────────────────────────────────────────────────────
const SceneObjectifs: React.FC<{ data: ModuleData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const C = getDomainColors(data.domaine);

  const headerOp = clamp(frame, 0, 8, [0, 1]);
  const headerY  = clamp(frame, 0, 8, [-18, 0]);

  return (
    <AbsoluteFill style={{ background: DAP_COLORS.offWhite, fontFamily: DAP_FONT }}>
      {/* Barre top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 7,
        background: `linear-gradient(90deg, ${C.primary} 0%, ${C.accent} 50%, ${C.primary} 100%)`,
      }} />

      {/* Logo discret */}
      <div style={{ position: 'absolute', top: 28, right: 48, opacity: 0.3 }}>
        <Img src={staticFile('logo-dap.png')} style={{ height: 34, display: 'block' }} />
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column',
        height: '100%', padding: '52px 88px 48px',
      }}>
        {/* Header */}
        <div style={{ opacity: headerOp, transform: `translateY(${headerY}px)`, marginBottom: 28, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 8, height: 42, borderRadius: 4,
              background: `linear-gradient(180deg, ${C.primary}, ${C.accent})`,
            }} />
            <div style={{
              fontFamily: TITLE_FONT,
              fontSize: 30, fontWeight: 700, color: C.primary,
              letterSpacing: '0.07em', textTransform: 'uppercase',
            }}>
              Objectifs pédagogiques
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${C.primary}, ${C.accent})`,
              color: 'white', borderRadius: 50, width: 38, height: 38,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 17, fontWeight: 800,
              boxShadow: `0 4px 12px ${C.primary}40`,
            }}>
              {data.objectifs.length}
            </div>
          </div>
        </div>

        {/* Objectifs */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          flex: 1, justifyContent: 'space-between',
        }}>
          {data.objectifs.map((obj, i) => {
            const delay = 4 + i * 9;
            const op  = clamp(frame, delay, delay + 8, [0, 1]);
            const x   = clamp(frame, delay, delay + 10, [-60, 0]);
            const ns  = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 280 } });

            return (
              <div key={i} style={{
                opacity: op, transform: `translateX(${x}px)`,
                display: 'flex', alignItems: 'center', gap: 24,
                background: 'white', borderRadius: 18,
                padding: '22px 32px',
                boxShadow: `0 4px 20px rgba(42,75,98,0.10), 0 0 0 1px ${C.light}`,
                flex: 1, maxHeight: 120,
              }}>
                <div style={{
                  width: 58, height: 58, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.primary} 0%, ${C.accent} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `scale(${ns})`,
                  boxShadow: `0 6px 16px ${C.primary}35`,
                }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: 'white' }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 27, color: DAP_COLORS.text, fontWeight: 500, lineHeight: 1.3 }}>
                  {obj}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scène 4 — Outro ─────────────────────────────────────────────────────────
const SceneOutro: React.FC<{ data: ModuleData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const C = getDomainColors(data.domaine);

  const mainS  = spring({ frame, fps, config: { damping: 18, stiffness: 220 } });
  const subOp  = clamp(frame, 14, 30, [0, 1]);
  const logoOp = clamp(frame, 40, 62, [0, 1]);
  const pulse  = 1 + 0.016 * Math.sin(frame * 0.13);

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${C.dark} 0%, ${C.primary} 50%, ${C.accent} 100%)`,
      fontFamily: DAP_FONT,
    }}>
      {[320, 210, 120].map((r, i) => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          width: r * 2, height: r * 2,
          marginLeft: -r, marginTop: -r,
          borderRadius: '50%',
          border: `2px solid rgba(255,255,255,${0.05 + i * 0.05})`,
          transform: `scale(${pulse})`,
        }} />
      ))}

      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100%', gap: 22, textAlign: 'center', position: 'relative',
      }}>
        <div style={{ transform: `scale(${mainS})` }}>
          <div style={{ fontSize: 90 }}>🚀</div>
          <div style={{
            fontFamily: TITLE_FONT,
            fontSize: 84, fontWeight: 800, color: 'white',
            letterSpacing: '-0.02em', lineHeight: 1, marginTop: 6,
          }}>
            C'est parti !
          </div>
        </div>

        <div style={{ opacity: subOp }}>
          <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>
            {data.titleL1}{data.titleL2 ? ` : ${data.titleL2}` : ''}
          </div>
          <div style={{ fontSize: 19, color: 'rgba(255,255,255,0.60)', marginTop: 10, letterSpacing: '0.06em' }}>
            Module {data.num} · {data.meta.duree} · {data.meta.format}
          </div>
        </div>

        <div style={{ opacity: logoOp, marginTop: 6 }}>
          <div style={{
            background: 'rgba(255,255,255,0.14)', borderRadius: 14,
            padding: '12px 32px', backdropFilter: 'blur(8px)',
          }}>
            <Img
              src={staticFile('logo-dap.png')}
              style={{ height: 42, display: 'block', filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Composition principale ───────────────────────────────────────────────────
export const DAPModuleTemplate: React.FC<{ data: ModuleData }> = ({ data }) => {
  const musicVolume = (f: number) => {
    const fadeIn  = interpolate(f, [0, 15],           [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const fadeOut = interpolate(f, [TOTAL - 25, TOTAL], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    return Math.min(fadeIn, fadeOut) * 0.22;
  };

  return (
    <AbsoluteFill>
      <Audio src={staticFile('background.mp3')} loop volume={musicVolume} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={S1}>
          <SceneIntro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={T_SLIDE} />

        <TransitionSeries.Sequence durationInFrames={S2}>
          <SceneTitre data={data} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={T_SLIDE} />

        <TransitionSeries.Sequence durationInFrames={S3}>
          <SceneObjectifs data={data} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={T_FADE} />

        <TransitionSeries.Sequence durationInFrames={S4}>
          <SceneOutro data={data} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
