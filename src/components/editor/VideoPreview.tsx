import { Player } from "@remotion/player";
import { TutorialVideo } from "@/compositions/TutorialVideo";
import type { Slide } from "@/types/video";
import { DEFAULT_FPS, DEFAULT_WIDTH, DEFAULT_HEIGHT } from "@/types/video";
import { Film } from "lucide-react";

interface VideoPreviewProps {
  slides: Slide[];
  totalDuration: number;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ slides, totalDuration }) => {
  if (slides.length === 0) {
    return (
      <div className="w-full aspect-video bg-muted rounded-lg flex flex-col items-center justify-center gap-3">
        <Film className="w-12 h-12 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          Adicione imagens para visualizar o vídeo
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg overflow-hidden bg-muted">
      <Player
        component={TutorialVideo}
        inputProps={{ slides }}
        durationInFrames={Math.max(totalDuration, 1)}
        fps={DEFAULT_FPS}
        compositionWidth={DEFAULT_WIDTH}
        compositionHeight={DEFAULT_HEIGHT}
        style={{ width: "100%" }}
        controls
        autoPlay={false}
        loop
      />
    </div>
  );
};
