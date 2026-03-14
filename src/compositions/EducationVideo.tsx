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
import { SlideVisuals } from "@/components/visuals/SlideVisuals";

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

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.03], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: slide.bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
        transform: `scale(${scale})`,
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: slide.textColor,
          textAlign: "center",
          marginBottom: 16,
          transform: `translateY(${interpolate(titleY, [0, 1], [30, 0])}px)`,
          opacity: titleY,
          lineHeight: 1.1,
        }}
      >
        {slide.title}
      </h1>

      {/* Body */}
      <p
        style={{
          fontSize: 40,
          color: slide.textColor,
          textAlign: "center",
          maxWidth: "85%",
          opacity: bodyDelay,
          transform: `translateY(${interpolate(bodyDelay, [0, 1], [20, 0])}px)`,
          lineHeight: 1.4,
          fontWeight: 500,
        }}
      >
        {slide.body}
      </p>

      {/* Visual Items (React components instead of emojis) */}
      <SlideVisuals
        visualType={slide.visualType}
        items={slide.items}
        textColor={slide.textColor}
      />

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
