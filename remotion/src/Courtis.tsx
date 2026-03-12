import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

import { Scene01Intro } from './scenes/Scene01Intro';
import { Scene02Probleme } from './scenes/Scene02Probleme';
import { Scene03Solution } from './scenes/Scene03Solution';
import { Scene04Declencheur } from './scenes/Scene04Declencheur';
import { Scene05Donnees } from './scenes/Scene05Donnees';
import { Scene06Regles } from './scenes/Scene06Regles';
import { Scene07IBIP } from './scenes/Scene07IBIP';
import { Scene08Detection } from './scenes/Scene08Detection';
import { Scene09Resultats } from './scenes/Scene09Resultats';
import { Scene10Rapport } from './scenes/Scene10Rapport';
import { Scene11Gmail } from './scenes/Scene11Gmail';
import { Scene12AvantApres } from './scenes/Scene12AvantApres';
import { Scene13Stack } from './scenes/Scene13Stack';
import { Scene14Conclusion } from './scenes/Scene14Conclusion';

const SCENE_FRAMES = 120; // 4s par scène → total ~56s
const TRANSITION_FRAMES = 15;

const scenes = [
  Scene01Intro,
  Scene02Probleme,
  Scene03Solution,
  Scene04Declencheur,
  Scene05Donnees,
  Scene06Regles,
  Scene07IBIP,
  Scene08Detection,
  Scene09Resultats,
  Scene10Rapport,
  Scene11Gmail,
  Scene12AvantApres,
  Scene13Stack,
  Scene14Conclusion,
];

export const Courtis: React.FC = () => {
  const fadeTransition = fade();
  const timing = linearTiming({ durationInFrames: TRANSITION_FRAMES });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {scenes.map((SceneComponent, index) => (
          <>
            {index > 0 && (
              <TransitionSeries.Transition
                key={`transition-${index}`}
                presentation={fadeTransition}
                timing={timing}
              />
            )}
            <TransitionSeries.Sequence
              key={`scene-${index}`}
              durationInFrames={SCENE_FRAMES}
              premountFor={TRANSITION_FRAMES}
            >
              <SceneComponent />
            </TransitionSeries.Sequence>
          </>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Total: 14 × 120 - 13 × 15 = 1485 frames = ~49.5s
export const COURTIS_TOTAL_FRAMES = scenes.length * SCENE_FRAMES - (scenes.length - 1) * TRANSITION_FRAMES;
