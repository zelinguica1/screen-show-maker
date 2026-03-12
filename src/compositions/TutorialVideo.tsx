import { AbsoluteFill, Img, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from "remotion";
import type { Slide } from "@/types/video";

interface TutorialSlideProps {
  slide: Slide;
}

const TutorialSlide: React.FC<TutorialSlideProps> = ({ slide }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [slide.duration - 15, slide.duration], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const scale = (() => {
    switch (slide.zoomEffect) {
      case "zoom-in":
        return interpolate(frame, [0, slide.duration], [1, 1.15], { extrapolateRight: "clamp" });
      case "zoom-out":
        return interpolate(frame, [0, slide.duration], [1.15, 1], { extrapolateRight: "clamp" });
      default:
        return 1;
    }
  })();

  const translateX = (() => {
    switch (slide.zoomEffect) {
      case "pan-left":
        return interpolate(frame, [0, slide.duration], [3, -3], { extrapolateRight: "clamp" });
      case "pan-right":
        return interpolate(frame, [0, slide.duration], [-3, 3], { extrapolateRight: "clamp" });
      default:
        return 0;
    }
  })();

  const captionY = spring({ frame: frame - 10, fps, config: { damping: 15, stiffness: 120 } });
  const captionOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity, backgroundColor: "#0d1117" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Img
          src={slide.imageUrl}
          style={{
            width: "92%",
            height: "85%",
            objectFit: "contain",
            transform: `scale(${scale}) translateX(${translateX}%)`,
            borderRadius: 12,
            boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
          }}
        />
      </div>
      {slide.caption && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: captionOpacity,
            transform: `translateY(${interpolate(captionY, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.9), rgba(6,95,70,0.9))",
              padding: "14px 36px",
              borderRadius: 10,
              maxWidth: "80%",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 32,
                fontWeight: 600,
                fontFamily: "Space Grotesk, system-ui, sans-serif",
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {slide.caption}
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

interface TutorialVideoProps {
  slides: Slide[];
}

export const TutorialVideo: React.FC<TutorialVideoProps> = ({ slides }) => {
  let currentFrame = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0d1117" }}>
      {slides.map((slide) => {
        const from = currentFrame;
        currentFrame += slide.duration;
        return (
          <Sequence key={slide.id} from={from} durationInFrames={slide.duration}>
            <TutorialSlide slide={slide} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
