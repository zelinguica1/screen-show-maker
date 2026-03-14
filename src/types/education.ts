export interface EducationSlide {
  title: string;
  body: string;
  visualType: "text" | "equation" | "counting" | "comparison" | "example";
  emoji?: string;
  items?: string[]; // for counting or listing
  bgColor: string; // tailwind color class like "bg-yellow-400"
  textColor: string;
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
