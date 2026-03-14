export type VisualEffectType =
  | "particles"
  | "bubbles"
  | "stars"
  | "confetti"
  | "waves"
  | "sparkles"
  | "geometric"
  | "rain"
  | "snow"
  | "hearts"
  | "leaves"
  | "fireflies"
  | "rings"
  | "dots";

export interface VisualEffect {
  type: VisualEffectType;
  color?: string;
  density?: number; // 1-10, default 5
  speed?: number;   // 0.5-3, default 1
  size?: number;    // 0.5-2, default 1
}

export interface SceneConfig {
  backgroundGradient: string;
  effects: VisualEffect[];
}

export interface EducationSlide {
  title: string;
  body: string;
  narrationText?: string;
  scene?: SceneConfig;
  bgColor: string;
  textColor: string;
  audioUrl?: string;
  durationInFrames?: number;
  // Legacy fields kept for backwards compatibility
  visualType?: string;
  items?: string[];
}

export interface EducationContent {
  topic: string;
  ageRange: string;
  language: string;
  slides: EducationSlide[];
}

export interface TopicFormData {
  topic: string;
  ageMin: number;
  ageMax: number;
  language: string;
}
