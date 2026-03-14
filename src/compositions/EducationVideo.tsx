import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Audio,
} from "remotion";
import type { EducationSlide } from "@/types/education";
import { SceneRenderer } from "@/components/visuals/SceneRenderer";

interface EducationSlideViewProps {
  slide: EducationSlide;
  durationInFrames: number;
}

const EducationSlideView: React.FC<EducationSlideViewProps> = ({
  slide,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const titleY = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const bodyDelay = spring({ frame: frame - 15, fps, config: { damping: 15, stiffness: 100 } });

  const hasScene = slide.scene && slide.scene.actors && slide.scene.actors.length > 0;

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: hasScene ? "transparent" : slide.bgColor,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      {/* Scene with animated actors */}
      {hasScene && <SceneRenderer scene={slide.scene!} />}

      {/* Text overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 60,
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Title with backdrop */}
        <div
          style={{
            background: hasScene ? "rgba(0,0,0,0.35)" : "transparent",
            borderRadius: 20,
            padding: hasScene ? "16px 40px" : "0",
            backdropFilter: hasScene ? "blur(8px)" : "none",
          }}
        >
          <h1
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: hasScene ? "#FFFFFF" : slide.textColor,
              textAlign: "center",
              marginBottom: 0,
              transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
              opacity: titleY,
              lineHeight: 1.1,
              textShadow: hasScene ? "0 2px 12px rgba(0,0,0,0.4)" : "none",
            }}
          >
            {slide.title}
          </h1>
        </div>

        {/* Body with backdrop */}
        <div
          style={{
            background: hasScene ? "rgba(0,0,0,0.25)" : "transparent",
            borderRadius: 16,
            padding: hasScene ? "12px 32px" : "0",
            marginTop: 16,
            backdropFilter: hasScene ? "blur(6px)" : "none",
            maxWidth: "85%",
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: hasScene ? "#FFFFFF" : slide.textColor,
              textAlign: "center",
              opacity: bodyDelay,
              transform: `translateY(${interpolate(bodyDelay, [0, 1], [20, 0])}px)`,
              lineHeight: 1.4,
              fontWeight: 500,
              textShadow: hasScene ? "0 1px 8px rgba(0,0,0,0.3)" : "none",
              margin: 0,
            }}
          >
            {slide.body}
          </p>
        </div>
      </div>

      {/* Audio */}
      {slide.audioUrl && <Audio src={slide.audioUrl} />}
    </AbsoluteFill>
  );
};

interface EducationVideoProps {
  slides: EducationSlide[];
  defaultDurationPerSlide?: number;
}

export const EducationVideo: React.FC<EducationVideoProps> = ({
  slides,
  defaultDurationPerSlide = 150,
}) => {
  let currentFrame = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {slides.map((slide, i) => {
        const from = currentFrame;
        const dur = slide.durationInFrames || defaultDurationPerSlide;
        currentFrame += dur;
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <EducationSlideView slide={slide} durationInFrames={dur} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
