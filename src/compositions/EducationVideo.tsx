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

  const hasScene = slide.scene && slide.scene.effects && slide.scene.effects.length > 0;

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: hasScene ? "transparent" : slide.bgColor,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      {/* Scene with visual effects */}
      {hasScene && <SceneRenderer scene={slide.scene!} />}

      {/* Text overlay */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingLeft: 80,
          paddingRight: 80,
        }}
      >
        {/* Title */}
        <div
          style={{
            background: hasScene ? "rgba(0,0,0,0.4)" : "transparent",
            borderRadius: 24,
            padding: hasScene ? "20px 48px" : "0",
            backdropFilter: hasScene ? "blur(12px)" : "none",
            marginBottom: 20,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: hasScene ? "#FFFFFF" : slide.textColor,
              textAlign: "center",
              margin: 0,
              transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
              opacity: titleY,
              lineHeight: 1.1,
              textShadow: hasScene ? "0 3px 16px rgba(0,0,0,0.5)" : "none",
            }}
          >
            {slide.title}
          </h1>
        </div>

        {/* Body */}
        <div
          style={{
            background: hasScene ? "rgba(0,0,0,0.3)" : "transparent",
            borderRadius: 20,
            padding: hasScene ? "16px 40px" : "0",
            backdropFilter: hasScene ? "blur(8px)" : "none",
            maxWidth: "85%",
          }}
        >
          <p
            style={{
              fontSize: 40,
              color: hasScene ? "#FFFFFF" : slide.textColor,
              textAlign: "center",
              opacity: bodyDelay,
              transform: `translateY(${interpolate(bodyDelay, [0, 1], [20, 0])}px)`,
              lineHeight: 1.4,
              fontWeight: 500,
              textShadow: hasScene ? "0 2px 10px rgba(0,0,0,0.4)" : "none",
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
