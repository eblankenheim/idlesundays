declare module "*.css";

// Injected by Instagram's embed.js once it loads
interface Window {
  instgrm?: {
    Embeds: {
      process: () => void;
    };
  };
}
