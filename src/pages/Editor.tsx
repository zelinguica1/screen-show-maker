import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@remotion/player";
import { ArrowLeft, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EducationVideo } from "@/compositions/EducationVideo";
import type { EducationSlide } from "@/types/education";

const DEFAULT_DURATION = 150; // 5s at 30fps

export default function Editor() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<EducationSlide[]>([]);
  const [topic, setTopic] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [durationPerSlide, setDurationPerSlide] = useState(DEFAULT_DURATION);

  useEffect(() => {
    const stored = sessionStorage.getItem("educationSlides");
    const storedTopic = sessionStorage.getItem("educationTopic");
    if (!stored) {
      navigate("/");
      return;
    }
    setSlides(JSON.parse(stored));
    setTopic(storedTopic || "");
  }, [navigate]);

  const updateSlide = (idx: number, updates: Partial<EducationSlide>) => {
    setSlides((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, ...updates } : s))
    );
  };

  const totalDuration = slides.length * durationPerSlide;
  const selected = slides[selectedIdx];

  if (!slides.length) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="w-8 h-8"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-sm font-semibold tracking-tight truncate">
          {topic || "Vídeo Educativo"}
        </h1>
        <span className="text-[10px] font-mono text-muted-foreground ml-auto">
          {slides.length} slides · {(totalDuration / 30).toFixed(1)}s
        </span>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left - Slide List */}
        <aside className="w-64 border-r border-border bg-card flex flex-col flex-shrink-0 overflow-y-auto">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider p-3 pb-1">
            Slides ({slides.length})
          </p>
          <div className="p-2 space-y-2">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className={`w-full text-left p-3 rounded-lg transition-all text-xs ${
                  selectedIdx === i
                    ? "bg-primary/15 border border-primary/30"
                    : "bg-secondary/50 border border-transparent hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{slide.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-medium truncate text-foreground">
                      {slide.title}
                    </p>
                    <p className="text-muted-foreground truncate text-[10px]">
                      {slide.body}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Center - Preview */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 min-w-0 gap-4">
          <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-border">
            <Player
              component={EducationVideo}
              inputProps={{ slides, durationPerSlide }}
              durationInFrames={Math.max(totalDuration, 1)}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={30}
              style={{ width: "100%", height: "100%" }}
              controls
              autoPlay={false}
            />
          </div>
          
          {/* Mini timeline */}
          <div className="w-full max-w-3xl flex gap-1.5">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setSelectedIdx(i)}
                className={`flex-1 h-10 rounded-md flex items-center justify-center text-xs font-medium transition-all ${
                  selectedIdx === i ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                }`}
                style={{
                  backgroundColor: slide.bgColor,
                  color: slide.textColor,
                }}
              >
                {slide.emoji}
              </button>
            ))}
          </div>
        </main>

        {/* Right - Editor */}
        <aside className="w-72 border-l border-border bg-card flex-shrink-0 p-4 overflow-y-auto space-y-5">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Editar Slide {selectedIdx + 1}
          </p>

          {selected && (
            <div className="space-y-4 animate-fade-in">
              {/* Preview chip */}
              <div
                className="rounded-lg p-4 text-center"
                style={{ backgroundColor: selected.bgColor, color: selected.textColor }}
              >
                <span className="text-3xl">{selected.emoji}</span>
                <p className="font-bold text-sm mt-1">{selected.title}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Título</Label>
                <Input
                  value={selected.title}
                  onChange={(e) => updateSlide(selectedIdx, { title: e.target.value })}
                  className="bg-secondary border-border text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Texto</Label>
                <textarea
                  value={selected.body}
                  onChange={(e) => updateSlide(selectedIdx, { body: e.target.value })}
                  className="w-full bg-secondary border border-border rounded-md p-2 text-sm min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Emoji</Label>
                <Input
                  value={selected.emoji || ""}
                  onChange={(e) => updateSlide(selectedIdx, { emoji: e.target.value })}
                  className="bg-secondary border-border text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Cor de fundo
                </Label>
                <input
                  type="color"
                  value={selected.bgColor}
                  onChange={(e) => updateSlide(selectedIdx, { bgColor: e.target.value })}
                  className="w-full h-10 rounded-md cursor-pointer border border-border"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">
                  Duração por slide: {(durationPerSlide / 30).toFixed(1)}s
                </Label>
                <Slider
                  value={[durationPerSlide]}
                  onValueChange={([v]) => setDurationPerSlide(v)}
                  min={60}
                  max={300}
                  step={30}
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="w-full gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Gerar novo vídeo
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
