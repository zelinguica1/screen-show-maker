import React from "react";
import type { SceneConfig, VisualEffect } from "@/types/education";
import {
  ParticlesEffect,
  BubblesEffect,
  StarsEffect,
  ConfettiEffect,
  WavesEffect,
  SparklesEffect,
  GeometricEffect,
  RainEffect,
  SnowEffect,
  HeartsEffect,
  LeavesEffect,
  FirefliesEffect,
  RingsEffect,
  DotsEffect,
} from "./effects";

const EFFECT_MAP: Record<string, React.FC<{ effect: VisualEffect }>> = {
  particles: ParticlesEffect,
  bubbles: BubblesEffect,
  stars: StarsEffect,
  confetti: ConfettiEffect,
  waves: WavesEffect,
  sparkles: SparklesEffect,
  geometric: GeometricEffect,
  rain: RainEffect,
  snow: SnowEffect,
  hearts: HeartsEffect,
  leaves: LeavesEffect,
  fireflies: FirefliesEffect,
  rings: RingsEffect,
  dots: DotsEffect,
};

interface SceneRendererProps {
  scene: SceneConfig;
}

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
      {scene.effects.map((effect, i) => {
        const EffectComp = EFFECT_MAP[effect.type];
        if (!EffectComp) return null;
        return <EffectComp key={`${effect.type}-${i}`} effect={effect} />;
      })}
    </div>
  );
};
