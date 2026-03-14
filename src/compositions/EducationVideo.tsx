import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import type { EducationSlide } from "@/types/education";

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
  const itemsDelay = (i: number) =>
    spring({ frame: frame - 25 - i * 5, fps, config: { damping: 12, stiffness: 120 } });

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
      {/* Emoji */}
      <div
        style={{
          fontSize: 100,
          marginBottom: 20,
          transform: `translateY(${interpolate(titleY, [0, 1], [-40, 0])}px)`,
          opacity: titleY,
        }}
      >
        {slide.emoji}
      </div>

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

      {/* Visual Items */}
      {slide.items && slide.items.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 40,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "90%",
          }}
        >
          {slide.items.map((item, i) => {
            const s = itemsDelay(i);
            return (
              <div
                key={i}
                style={{
                  fontSize: 56,
                  opacity: s,
                  transform: `scale(${interpolate(s, [0, 1], [0.5, 1])}) translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: 20,
                  padding: "16px 28px",
                  fontWeight: 700,
                  color: slide.textColor,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

interface EducationVideoProps {
  slides: EducationSlide[];
  durationPerSlide?: number; // frames
}

export const EducationVideo: React.FC<EducationVideoProps> = ({
  slides,
  durationPerSlide = 150,
}) => {
  let currentFrame = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {slides.map((slide, i) => {
        const from = currentFrame;
        currentFrame += durationPerSlide;
        return (
          <Sequence key={i} from={from} durationInFrames={durationPerSlide}>
            <EducationSlideView slide={slide} durationInFrames={durationPerSlide} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
