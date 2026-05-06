export const playAudio = (src) => {
  const audio = new Audio(src);
  audio.play().catch((err) => {
    console.error("Audio playback failed:", err);
  });
};
