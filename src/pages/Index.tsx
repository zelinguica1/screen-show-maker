import { Clapperboard } from "lucide-react";
import { useVideoProject } from "@/hooks/useVideoProject";
import { ImageUploader } from "@/components/editor/ImageUploader";
import { SlideList } from "@/components/editor/SlideList";
import { SlideEditor } from "@/components/editor/SlideEditor";
import { VideoPreview } from "@/components/editor/VideoPreview";
import { Timeline } from "@/components/editor/Timeline";

const Index = () => {
  const {
    project,
    selectedSlide,
    selectedSlideId,
    setSelectedSlideId,
    addSlides,
    updateSlide,
    removeSlide,
    reorderSlides,
    totalDuration,
  } = useVideoProject();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-3 flex-shrink-0">
        <div className="w-8 h-8 rounded-md bg-primary/20 flex items-center justify-center">
          <Clapperboard className="w-4 h-4 text-primary" />
        </div>
        <h1 className="text-sm font-semibold tracking-tight">
          Tutorial<span className="text-primary">Studio</span>
        </h1>
        <span className="text-[10px] font-mono text-muted-foreground ml-auto">
          {project.slides.length} slides · {(totalDuration / 30).toFixed(1)}s
        </span>
      </header>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <aside className="w-72 border-r border-border bg-card flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-border">
            <ImageUploader onUpload={addSlides} />
          </div>
          <div className="flex-1 p-3 overflow-hidden flex flex-col">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-2">
              Slides ({project.slides.length})
            </p>
            <SlideList
              slides={project.slides}
              selectedId={selectedSlideId}
              onSelect={setSelectedSlideId}
              onRemove={removeSlide}
              onReorder={reorderSlides}
            />
          </div>
        </aside>

        {/* Center - Preview */}
        <main className="flex-1 flex flex-col min-w-0 p-4 gap-4">
          <VideoPreview slides={project.slides} totalDuration={totalDuration} />
          <Timeline
            slides={project.slides}
            selectedId={selectedSlideId}
            onSelect={setSelectedSlideId}
            totalDuration={totalDuration}
          />
        </main>

        {/* Right Panel - Editor */}
        <aside className="w-72 border-l border-border bg-card flex-shrink-0 p-3 overflow-y-auto scrollbar-thin">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-3">
            Propriedades
          </p>
          {selectedSlide ? (
            <SlideEditor slide={selectedSlide} onUpdate={updateSlide} />
          ) : (
            <p className="text-xs text-muted-foreground text-center py-12">
              Selecione um slide para editar
            </p>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Index;
