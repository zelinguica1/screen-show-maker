import type { Slide } from "@/types/video";

interface TimelineProps {
  slides: Slide[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  totalDuration: number;
}

export const Timeline: React.FC<TimelineProps> = ({ slides, selectedId, onSelect, totalDuration }) => {
  if (slides.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          Timeline
        </span>
        <span className="text-[10px] font-mono text-primary">
          {(totalDuration / 30).toFixed(1)}s total
        </span>
      </div>
      <div className="flex gap-1 overflow-x-auto scrollbar-thin pb-1">
        {slides.map((slide, i) => {
          const widthPercent = Math.max((slide.duration / totalDuration) * 100, 5);
          return (
            <button
              key={slide.id}
              onClick={() => onSelect(slide.id)}
              className={`
                relative flex-shrink-0 h-12 rounded overflow-hidden transition-all
                ${selectedId === slide.id
                  ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                  : "hover:ring-1 hover:ring-border"
                }
              `}
              style={{ width: `${Math.max(widthPercent, 4)}%`, minWidth: 48 }}
            >
              <img
                src={slide.imageUrl}
                alt=""
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <span className="absolute bottom-0.5 left-1 text-[9px] font-mono text-foreground/80">
                {i + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
