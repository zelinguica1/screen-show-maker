import { useState, useCallback } from "react";
import type { Slide, VideoProject } from "@/types/video";
import { DEFAULT_FPS, DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SLIDE_DURATION } from "@/types/video";

let nextId = 1;
const genId = () => `slide-${nextId++}`;

export function useVideoProject() {
  const [project, setProject] = useState<VideoProject>({
    title: "Meu Tutorial",
    slides: [],
    fps: DEFAULT_FPS,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });

  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(null);

  const addSlides = useCallback((files: File[]) => {
    const newSlides: Slide[] = files.map((file) => ({
      id: genId(),
      imageUrl: URL.createObjectURL(file),
      caption: "",
      duration: DEFAULT_SLIDE_DURATION,
      zoomEffect: "zoom-in" as const,
    }));

    setProject((prev) => ({
      ...prev,
      slides: [...prev.slides, ...newSlides],
    }));

    if (newSlides.length > 0 && !selectedSlideId) {
      setSelectedSlideId(newSlides[0].id);
    }
  }, [selectedSlideId]);

  const updateSlide = useCallback((id: string, updates: Partial<Slide>) => {
    setProject((prev) => ({
      ...prev,
      slides: prev.slides.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }, []);

  const removeSlide = useCallback((id: string) => {
    setProject((prev) => {
      const newSlides = prev.slides.filter((s) => s.id !== id);
      return { ...prev, slides: newSlides };
    });
    setSelectedSlideId((prev) => (prev === id ? null : prev));
  }, []);

  const reorderSlides = useCallback((fromIndex: number, toIndex: number) => {
    setProject((prev) => {
      const newSlides = [...prev.slides];
      const [removed] = newSlides.splice(fromIndex, 1);
      newSlides.splice(toIndex, 0, removed);
      return { ...prev, slides: newSlides };
    });
  }, []);

  const totalDuration = project.slides.reduce((sum, s) => sum + s.duration, 0);
  const selectedSlide = project.slides.find((s) => s.id === selectedSlideId) ?? null;

  return {
    project,
    setProject,
    selectedSlide,
    selectedSlideId,
    setSelectedSlideId,
    addSlides,
    updateSlide,
    removeSlide,
    reorderSlides,
    totalDuration,
  };
}
