import { Trash2, GripVertical } from "lucide-react";
import type { Slide } from "@/types/video";

interface SlideListProps {
  slides: Slide[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onReorder: (from: number, to: number) => void;
}

export const SlideList: React.FC<SlideListProps> = ({
  slides,
  selectedId,
  onSelect,
  onRemove,
}) => {
  return (
    <div className="flex flex-col gap-2 scrollbar-thin overflow-y-auto max-h-[400px] pr-1">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          onClick={() => onSelect(slide.id)}
          className={`
            group relative flex items-center gap-3 p-2 rounded-lg cursor-pointer
            transition-all duration-150 animate-fade-in
            ${selectedId === slide.id
              ? "bg-primary/15 border border-primary/30"
              : "bg-secondary/50 border border-transparent hover:bg-secondary hover:border-border"
            }
          `}
        >
          <div className="text-muted-foreground/40 cursor-grab">
            <GripVertical className="w-4 h-4" />
          </div>
          <div className="w-16 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
            <img
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              Slide {index + 1}
            </p>
            <p className="text-[10px] text-muted-foreground truncate">
              {slide.caption || "Sem legenda"}
            </p>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">
            {(slide.duration / 30).toFixed(1)}s
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(slide.id); }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
          >
            <Trash2 className="w-3.5 h-3.5 text-destructive" />
          </button>
        </div>
      ))}
      {slides.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-6">
          Nenhum slide adicionado ainda
        </p>
      )}
    </div>
  );
};
