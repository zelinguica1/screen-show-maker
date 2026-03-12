import type { Slide } from "@/types/video";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, MoveLeft, MoveRight, Circle } from "lucide-react";

interface SlideEditorProps {
  slide: Slide;
  onUpdate: (id: string, updates: Partial<Slide>) => void;
}

const effects = [
  { value: "none" as const, label: "Nenhum", icon: Circle },
  { value: "zoom-in" as const, label: "Zoom In", icon: ZoomIn },
  { value: "zoom-out" as const, label: "Zoom Out", icon: ZoomOut },
  { value: "pan-left" as const, label: "Pan ←", icon: MoveLeft },
  { value: "pan-right" as const, label: "Pan →", icon: MoveRight },
];

export const SlideEditor: React.FC<SlideEditorProps> = ({ slide, onUpdate }) => {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="rounded-lg overflow-hidden bg-muted aspect-video">
        <img
          src={slide.imageUrl}
          alt="Preview"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-3">
        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Legenda</Label>
          <Input
            value={slide.caption}
            onChange={(e) => onUpdate(slide.id, { caption: e.target.value })}
            placeholder="Ex: Clique no botão Salvar..."
            className="bg-secondary border-border text-sm"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">
            Duração: {(slide.duration / 30).toFixed(1)}s
          </Label>
          <Slider
            value={[slide.duration]}
            onValueChange={([v]) => onUpdate(slide.id, { duration: v })}
            min={30}
            max={300}
            step={15}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground mb-1.5 block">Efeito</Label>
          <div className="grid grid-cols-5 gap-1.5">
            {effects.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => onUpdate(slide.id, { zoomEffect: value })}
                className={`
                  flex flex-col items-center gap-1 p-2 rounded-md text-[10px] transition-all
                  ${slide.zoomEffect === value
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 border border-transparent"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
