export interface EducationSlide {
  title: string;
  body: string;
  narrationText?: string;
  visualType: "text" | "equation" | "counting" | "comparison" | "example";
  items?: string[];
  bgColor: string;
  textColor: string;
  audioUrl?: string;
  durationInFrames?: number; // calculated from audio length
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
