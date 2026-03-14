export type ActorAnimation = "idle" | "bounce" | "float" | "walk" | "spin" | "pulse" | "wave" | "grow" | "sway";

export interface SceneActor {
  type: string;       // actor name: "dinosaur", "sun", "tree", etc.
  x: number;          // 0-100 percentage horizontal position
  y: number;          // 0-100 percentage vertical position
  scale?: number;     // default 1
  animation?: ActorAnimation;
  color?: string;     // optional color override
  flipX?: boolean;    // mirror horizontally
}

export interface SceneConfig {
  backgroundGradient: string; // CSS gradient string
  actors: SceneActor[];
}

export interface EducationSlide {
  title: string;
  body: string;
  narrationText?: string;
  visualType: "text" | "equation" | "counting" | "comparison" | "example";
  items?: string[];
  scene?: SceneConfig;
  bgColor: string;
  textColor: string;
  audioUrl?: string;
  durationInFrames?: number;
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
