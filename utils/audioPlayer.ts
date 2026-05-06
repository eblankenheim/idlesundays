export const playAudio = (src: string): void => {
  const audio = new Audio(src);
  audio.play().catch((err: Error) => {
    console.error("Audio playback failed:", err);
  });
};
