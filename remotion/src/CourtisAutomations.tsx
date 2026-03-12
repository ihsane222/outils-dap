import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

import { SceneAutoIntro } from './scenes/SceneAutoIntro';
import { SceneAuto01Concept } from './scenes/SceneAuto01Concept';
import { SceneAuto01Workflow } from './scenes/SceneAuto01Workflow';
import { SceneAuto01Rapport } from './scenes/SceneAuto01Rapport';
import { SceneAuto02Concept } from './scenes/SceneAuto02Concept';
import { SceneAuto02Workflow } from './scenes/SceneAuto02Workflow';
import { SceneAuto02Email } from './scenes/SceneAuto02Email';
import { SceneAuto02Rapport } from './scenes/SceneAuto02Rapport';
import { SceneAuto03Concept } from './scenes/SceneAuto03Concept';
import { SceneAuto03Workflow } from './scenes/SceneAuto03Workflow';
import { SceneAuto03Email } from './scenes/SceneAuto03Email';
import { SceneAuto03Rapport } from './scenes/SceneAuto03Rapport';
import { SceneOutro } from './scenes/SceneOutro';
import { VideoProgressContext } from './shared/VideoProgressContext';

const TRANSITION_FRAMES = 25;
const BASE = 300;   // 10s — scènes concept / intro
const LONG = 420;   // 14s — scènes avec screenshot (+4s)

// Chaque entrée : { component, frames, label }
const SLIDES = [
  { component: SceneAutoIntro,      frames: BASE, label: 'Vue d\'ensemble' },
  { component: SceneAuto01Concept,  frames: BASE, label: 'Automatisation 01 · Scan Conformité' },
  { component: SceneAuto01Workflow, frames: LONG, label: 'Conformité · Workflow n8n' },
  { component: SceneAuto01Rapport,  frames: LONG, label: 'Conformité · Rapport Manager' },
  { component: SceneAuto02Concept,  frames: BASE, label: 'Automatisation 02 · Enrichissement Contacts' },
  { component: SceneAuto02Workflow, frames: LONG, label: 'Enrichissement · Workflow n8n' },
  { component: SceneAuto02Email,    frames: LONG, label: 'Enrichissement · Email Client' },
  { component: SceneAuto02Rapport,  frames: LONG, label: 'Enrichissement · Rapport Manager' },
  { component: SceneAuto03Concept,  frames: BASE, label: 'Automatisation 03 · Upsell Portefeuille' },
  { component: SceneAuto03Workflow, frames: LONG, label: 'Upsell · Workflow n8n' },
  { component: SceneAuto03Email,    frames: LONG, label: 'Upsell · Email Commercial' },
  { component: SceneAuto03Rapport,  frames: LONG, label: 'Upsell · Rapport Manager' },
  { component: SceneOutro,          frames: 450,  label: '' },
];

// 4×300 + 8×420 + 1×450 − 12×25 = 1200 + 3360 + 450 − 300 = 4710 frames ≈ 157s @ 30fps
export const AUTOMATIONS_TOTAL_FRAMES =
  SLIDES.reduce((acc, s) => acc + s.frames, 0) - (SLIDES.length - 1) * TRANSITION_FRAMES;

// Cumul des frames de départ (en tenant compte des transitions)
const START_FRAMES = SLIDES.reduce<number[]>((acc, _, i) => {
  if (i === 0) return [0];
  return [...acc, acc[i - 1] + SLIDES[i - 1].frames - TRANSITION_FRAMES];
}, []);

export const CourtisAutomations: React.FC = () => {
  const fadeTransition = fade();
  const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

  return (
    <AbsoluteFill>
      {/* Musique de fond — loop lisse, volume constant */}
      {/* trimAfter=2670 → coupe à 89s (avant le silence de fin du fichier 96s) */}
      <Audio
        src={staticFile('background.mp3')}
        loop
        volume={0.28}
        trimAfter={2670}
      />
      <TransitionSeries>
        {SLIDES.map(({ component: SlideComponent, frames, label }, index) => (
          <>
            {index > 0 && (
              <TransitionSeries.Transition
                key={`t-${index}`}
                presentation={fadeTransition}
                timing={timing}
              />
            )}
            <TransitionSeries.Sequence
              key={`s-${index}`}
              durationInFrames={frames}
              premountFor={TRANSITION_FRAMES}
            >
              <VideoProgressContext.Provider
                value={{
                  startFrame: START_FRAMES[index],
                  totalFrames: AUTOMATIONS_TOTAL_FRAMES,
                  label,
                }}
              >
                <SlideComponent />
              </VideoProgressContext.Provider>
            </TransitionSeries.Sequence>
          </>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
