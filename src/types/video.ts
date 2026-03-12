export interface Slide {
  id: string;
  imageUrl: string;
  caption: string;
  duration: number; // in frames (30fps)
  zoomEffect: "none" | "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
}

export interface VideoProject {
  title: string;
  slides: Slide[];
  fps: number;
  width: number;
  height: number;
}

export const DEFAULT_FPS = 30;
export const DEFAULT_WIDTH = 1920;
export const DEFAULT_HEIGHT = 1080;
export const DEFAULT_SLIDE_DURATION = 150; // 5 seconds at 30fps
