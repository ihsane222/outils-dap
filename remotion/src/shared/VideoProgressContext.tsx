import { createContext, useContext } from 'react';

type VideoProgressContextType = {
  startFrame: number;
  totalFrames: number;
  label: string;
};

export const VideoProgressContext = createContext<VideoProgressContextType>({
  startFrame: 0,
  totalFrames: 4710,
  label: '',
});

export const useVideoProgress = () => useContext(VideoProgressContext);
