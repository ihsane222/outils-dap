import { interpolate, Easing } from 'remotion';

export const fadeUp = (frame: number, delay: number, duration = 30) => ({
  opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  transform: `translateY(${interpolate(frame, [delay, delay + duration], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  })}px)`,
});

export const fadeIn = (frame: number, delay: number, duration = 30) => ({
  opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
});

export const slideFromLeft = (frame: number, delay: number, duration = 30) => ({
  opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  transform: `translateX(${interpolate(frame, [delay, delay + duration], [-80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  })}px)`,
});

export const scaleUp = (frame: number, delay: number, duration = 30) => ({
  opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  transform: `scale(${interpolate(frame, [delay, delay + duration], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  })})`,
});

export const expandWidth = (frame: number, delay: number, maxWidth: number, duration = 40) =>
  interpolate(frame, [delay, delay + duration], [0, maxWidth], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
