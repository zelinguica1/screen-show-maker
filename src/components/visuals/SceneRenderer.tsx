import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import type { SceneConfig, SceneActor, ActorAnimation } from "@/types/education";
import { getActorComponent, FallbackActor } from "./actors";

interface SceneRendererProps {
  scene: SceneConfig;
}

function useActorAnimation(
  animation: ActorAnimation,
  index: number
) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered entrance
  const delay = 15 + index * 8;
  const entranceFrame = Math.max(0, frame - delay);
  const entrance = spring({
    frame: entranceFrame,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.8 },
  });

  const entranceScale = interpolate(entrance, [0, 1], [0.2, 1]);
  const entranceOpacity = interpolate(entrance, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
  const entranceY = interpolate(entrance, [0, 1], [50, 0]);

  // Post-entrance animation
  const t = Math.max(0, frame - delay - 10) / fps;
  let animX = 0;
  let animY = 0;
  let animRotate = 0;
  let animScale = 1;

  switch (animation) {
    case "bounce":
      animY = Math.abs(Math.sin(t * 3)) * -20;
      break;
    case "float":
      animY = Math.sin(t * 1.5) * 10;
      animX = Math.cos(t * 0.8) * 5;
      break;
    case "walk":
      animX = Math.sin(t * 2) * 15;
      animRotate = Math.sin(t * 4) * 3;
      break;
    case "spin":
      animRotate = t * 60;
      break;
    case "pulse":
      animScale = 1 + Math.sin(t * 3) * 0.12;
      break;
    case "wave":
      animRotate = Math.sin(t * 3) * 8;
      break;
    case "grow":
      animScale = interpolate(entrance, [0, 1], [0.1, 1]);
      break;
    case "sway":
      animRotate = Math.sin(t * 2) * 6;
      animY = Math.sin(t * 1.2) * 4;
      break;
    case "idle":
    default:
      animY = Math.sin(t * 1.5 + index * 0.7) * 4;
      break;
  }

  return {
    opacity: entranceOpacity,
    translateX: animX,
    translateY: entranceY + animY,
    rotate: animRotate,
    scale: entranceScale * animScale,
  };
}

const SceneActorView: React.FC<{
  actor: SceneActor;
  index: number;
}> = ({ actor, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { opacity, translateX, translateY, rotate, scale } = useActorAnimation(
    actor.animation || "idle",
    index
  );

  const ActorComp = getActorComponent(actor.type) || FallbackActor;
  const actorSize = 120 * (actor.scale || 1);

  return (
    <div
      style={{
        position: "absolute",
        left: `${actor.x}%`,
        top: `${actor.y}%`,
        transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg) ${actor.flipX ? "scaleX(-1)" : ""}`,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      <ActorComp
        size={actorSize}
        color={actor.color}
        frame={frame}
        fps={fps}
      />
    </div>
  );
};

export const SceneRenderer: React.FC<SceneRendererProps> = ({ scene }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: scene.backgroundGradient,
        overflow: "hidden",
      }}
    >
      {scene.actors.map((actor, i) => (
        <SceneActorView key={i} actor={actor} index={i} />
      ))}
    </div>
  );
};
