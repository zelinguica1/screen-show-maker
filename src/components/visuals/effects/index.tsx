import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { VisualEffect } from "@/types/education";

/** Deterministic pseudo-random from seed */
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/* =========================================================
   PARTICLES — Soft floating circles
   ========================================================= */
export const ParticlesEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 4);
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const color = effect.color || "#ffffff";
  const rand = seededRandom(42);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 100;
        const startY = rand() * 120 - 20;
        const r = (rand() * 12 + 6) * size;
        const opacity = rand() * 0.3 + 0.1;
        const phaseX = rand() * Math.PI * 2;
        const speedMul = rand() * 0.5 + 0.75;
        const t = (frame / fps) * speed * speedMul;
        const yPos = ((startY + t * 15) % 120) - 10;
        const xPos = x + Math.sin(t * 1.5 + phaseX) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: r,
              height: r,
              borderRadius: "50%",
              background: color,
              opacity,
              filter: `blur(${r * 0.15}px)`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   BUBBLES — Rising translucent circles
   ========================================================= */
export const BubblesEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 3);
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const color = effect.color || "#88ccff";
  const rand = seededRandom(77);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 90 + 5;
        const startY = 110 + rand() * 30;
        const r = (rand() * 20 + 12) * size;
        const opacity = rand() * 0.25 + 0.08;
        const phaseX = rand() * Math.PI * 2;
        const speedMul = rand() * 0.6 + 0.7;
        const t = (frame / fps) * speed * speedMul;
        const yPos = startY - t * 20;
        const xPos = x + Math.sin(t * 2 + phaseX) * 5;
        const wobble = Math.sin(t * 3 + i) * 0.06 + 1;

        if (yPos < -15) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: r * wobble,
              height: r,
              borderRadius: "50%",
              border: `2px solid ${color}`,
              background: `radial-gradient(circle at 35% 35%, ${color}33, transparent)`,
              opacity,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   STARS — Twinkling star shapes
   ========================================================= */
const StarShape: React.FC<{ x: number; y: number; size: number; color: string; opacity: number; rotation: number }> = ({
  x, y, size: s, color, opacity, rotation,
}) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    style={{
      position: "absolute",
      left: `${x}%`,
      top: `${y}%`,
      opacity,
      transform: `rotate(${rotation}deg)`,
      pointerEvents: "none",
    }}
  >
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={color}
    />
  </svg>
);

export const StarsEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 3);
  const color = effect.color || "#FFD700";
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(123);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 95;
        const y = rand() * 90;
        const s = (rand() * 16 + 10) * size;
        const phase = rand() * Math.PI * 2;
        const t = (frame / fps) * speed;
        const twinkle = Math.sin(t * 3 + phase) * 0.35 + 0.45;
        const rot = Math.sin(t * 0.5 + phase) * 15;

        return <StarShape key={i} x={x} y={y} size={s} color={color} opacity={twinkle} rotation={rot} />;
      })}
    </>
  );
};

/* =========================================================
   CONFETTI — Falling colorful rectangles
   ========================================================= */
export const ConfettiEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 5);
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(256);
  const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#FB923C", "#34D399", "#60A5FA", "#F472B6"];

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 100;
        const startY = -10 - rand() * 20;
        const w = (rand() * 8 + 4) * size;
        const h = (rand() * 12 + 6) * size;
        const color = colors[Math.floor(rand() * colors.length)];
        const spinSpeed = (rand() - 0.5) * 400;
        const drift = (rand() - 0.5) * 30;
        const fallSpeed = rand() * 0.5 + 0.75;
        const t = (frame / fps) * speed * fallSpeed;
        const yPos = startY + t * 25;
        const xPos = x + Math.sin(t * 2 + i) * drift * 0.3;
        const rotate = t * spinSpeed;

        if (yPos > 110) return null;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: w,
              height: h,
              background: color,
              borderRadius: 2,
              transform: `rotate(${rotate}deg)`,
              opacity: 0.75,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   WAVES — Animated sine wave layers
   ========================================================= */
export const WavesEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = effect.color || "#4ECDC4";
  const speed = effect.speed || 1;
  const t = (frame / fps) * speed;

  const layers = [
    { yBase: 75, amplitude: 3, frequency: 1.5, opacity: 0.12, phase: 0 },
    { yBase: 80, amplitude: 4, frequency: 1.2, opacity: 0.15, phase: 1 },
    { yBase: 85, amplitude: 2.5, frequency: 2, opacity: 0.1, phase: 2.5 },
  ];

  return (
    <>
      {layers.map((layer, li) => {
        const points: string[] = [];
        for (let x = 0; x <= 100; x += 2) {
          const y = layer.yBase + Math.sin((x / 100) * Math.PI * 2 * layer.frequency + t * 2 + layer.phase) * layer.amplitude;
          points.push(`${x}%,${y}%`);
        }
        points.push("100%,100%", "0%,100%");

        return (
          <svg
            key={li}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <polygon points={points.join(" ")} fill={color} opacity={layer.opacity} />
          </svg>
        );
      })}
    </>
  );
};

/* =========================================================
   SPARKLES — Small bursts of light
   ========================================================= */
export const SparklesEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 4);
  const color = effect.color || "#FFFFFF";
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(512);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 95;
        const y = rand() * 85;
        const s = (rand() * 4 + 2) * size;
        const phase = rand() * Math.PI * 2;
        const t = (frame / fps) * speed;
        const sparkle = Math.max(0, Math.sin(t * 5 + phase));
        const scale = sparkle * 1.5 + 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: s,
              height: s,
              background: color,
              borderRadius: "50%",
              opacity: sparkle * 0.8,
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${s * 2}px ${s}px ${color}66`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   GEOMETRIC — Floating shapes (triangles, hexagons, squares)
   ========================================================= */
const shapes = ["triangle", "square", "hexagon", "circle"] as const;

const GeoShape: React.FC<{ shape: string; size: number; color: string; opacity: number; rotation: number; x: number; y: number }> = ({
  shape, size: s, color, opacity, rotation, x, y,
}) => {
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${x}%`,
    top: `${y}%`,
    opacity,
    transform: `rotate(${rotation}deg)`,
    pointerEvents: "none",
  };

  if (shape === "circle") {
    return <div style={{ ...style, width: s, height: s, borderRadius: "50%", border: `2px solid ${color}` }} />;
  }
  if (shape === "square") {
    return <div style={{ ...style, width: s, height: s, borderRadius: 3, border: `2px solid ${color}` }} />;
  }

  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={style}>
      {shape === "triangle" && (
        <polygon points="12,2 22,20 2,20" fill="none" stroke={color} strokeWidth="1.5" />
      )}
      {shape === "hexagon" && (
        <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke={color} strokeWidth="1.5" />
      )}
    </svg>
  );
};

export const GeometricEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 2.5);
  const color = effect.color || "#A78BFA";
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(789);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 95;
        const y = rand() * 90;
        const s = (rand() * 24 + 16) * size;
        const shape = shapes[Math.floor(rand() * shapes.length)];
        const phase = rand() * Math.PI * 2;
        const t = (frame / fps) * speed;
        const rot = t * 20 * (i % 2 === 0 ? 1 : -1) + phase * 57;
        const opacity = Math.sin(t * 1.5 + phase) * 0.1 + 0.15;
        const floatY = y + Math.sin(t * 1.2 + phase) * 3;

        return <GeoShape key={i} shape={shape} size={s} color={color} opacity={opacity} rotation={rot} x={x} y={floatY} />;
      })}
    </>
  );
};

/* =========================================================
   RAIN — Falling lines
   ========================================================= */
export const RainEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 6);
  const speed = effect.speed || 1;
  const color = effect.color || "#90CAF9";
  const rand = seededRandom(333);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 105 - 5;
        const startY = -5 - rand() * 15;
        const len = rand() * 15 + 8;
        const fallSpeed = rand() * 0.4 + 0.8;
        const t = (frame / fps) * speed * fallSpeed;
        const yPos = ((startY + t * 50) % 120) - 10;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${yPos}%`,
              width: 2,
              height: len,
              background: `linear-gradient(180deg, transparent, ${color})`,
              opacity: 0.3,
              borderRadius: 1,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   SNOW — Gently falling soft circles
   ========================================================= */
export const SnowEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 4);
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(444);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 100;
        const startY = -5 - rand() * 20;
        const r = (rand() * 6 + 3) * size;
        const phase = rand() * Math.PI * 2;
        const fallSpeed = rand() * 0.3 + 0.7;
        const t = (frame / fps) * speed * fallSpeed;
        const yPos = ((startY + t * 12) % 115) - 10;
        const xPos = x + Math.sin(t * 1.5 + phase) * 6;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: r,
              height: r,
              borderRadius: "50%",
              background: "white",
              opacity: rand() * 0.4 + 0.2,
              filter: `blur(${r * 0.2}px)`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   HEARTS — Floating heart shapes
   ========================================================= */
export const HeartsEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 2);
  const color = effect.color || "#F472B6";
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(555);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 90 + 5;
        const startY = 110 + rand() * 20;
        const s = (rand() * 16 + 12) * size;
        const phase = rand() * Math.PI * 2;
        const riseSpeed = rand() * 0.4 + 0.8;
        const t = (frame / fps) * speed * riseSpeed;
        const yPos = startY - t * 15;
        const xPos = x + Math.sin(t * 2 + phase) * 4;
        const rot = Math.sin(t * 1.5 + phase) * 10;
        const opacity = interpolate(yPos, [100, 70, 30, -10], [0, 0.4, 0.4, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <svg
            key={i}
            width={s}
            height={s}
            viewBox="0 0 24 24"
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              opacity,
              transform: `rotate(${rot}deg)`,
              pointerEvents: "none",
            }}
          >
            <path
              d="M12,21.35l-1.45-1.32C5.4,15.36,2,12.28,2,8.5 C2,5.42,4.42,3,7.5,3c1.74,0,3.41,0.81,4.5,2.09C13.09,3.81,14.76,3,16.5,3 C19.58,3,22,5.42,22,8.5c0,3.78-3.4,6.86-8.55,11.54L12,21.35z"
              fill={color}
            />
          </svg>
        );
      })}
    </>
  );
};

/* =========================================================
   LEAVES — Falling and spinning leaf shapes
   ========================================================= */
export const LeavesEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 2);
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(666);
  const leafColors = ["#66BB6A", "#43A047", "#81C784", "#A5D6A7", "#FFB74D"];

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 110 - 5;
        const startY = -10 - rand() * 20;
        const s = (rand() * 14 + 10) * size;
        const color = leafColors[Math.floor(rand() * leafColors.length)];
        const phase = rand() * Math.PI * 2;
        const drift = (rand() - 0.5) * 40;
        const fallSpeed = rand() * 0.3 + 0.7;
        const t = (frame / fps) * speed * fallSpeed;
        const yPos = ((startY + t * 14) % 120) - 10;
        const xPos = x + Math.sin(t * 1.8 + phase) * drift * 0.15;
        const rot = t * 60 * (i % 2 === 0 ? 1 : -1) + phase * 57;

        return (
          <svg
            key={i}
            width={s}
            height={s * 1.3}
            viewBox="0 0 20 26"
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              opacity: 0.5,
              transform: `rotate(${rot}deg)`,
              pointerEvents: "none",
            }}
          >
            <path d="M10,1 Q18,8 15,18 Q10,26 5,18 Q2,8 10,1Z" fill={color} />
            <line x1="10" y1="1" x2="10" y2="22" stroke={`${color}88`} strokeWidth="0.8" />
          </svg>
        );
      })}
    </>
  );
};

/* =========================================================
   FIREFLIES — Glowing dots with pulse
   ========================================================= */
export const FirefliesEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 5) * 2);
  const color = effect.color || "#FFEB3B";
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const rand = seededRandom(888);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const x = rand() * 90 + 5;
        const y = rand() * 80 + 10;
        const s = (rand() * 4 + 3) * size;
        const phaseX = rand() * Math.PI * 2;
        const phaseY = rand() * Math.PI * 2;
        const phasePulse = rand() * Math.PI * 2;
        const t = (frame / fps) * speed;
        const xPos = x + Math.sin(t * 0.8 + phaseX) * 10;
        const yPos = y + Math.cos(t * 0.6 + phaseY) * 8;
        const pulse = Math.sin(t * 3 + phasePulse) * 0.4 + 0.5;
        const glowSize = s * 3 * (pulse + 0.5);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: s,
              height: s,
              borderRadius: "50%",
              background: color,
              opacity: pulse,
              boxShadow: `0 0 ${glowSize}px ${glowSize * 0.5}px ${color}55`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   RINGS — Expanding concentric rings
   ========================================================= */
export const RingsEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.round((effect.density || 3) * 1.5);
  const color = effect.color || "#E0E0E0";
  const speed = effect.speed || 1;
  const rand = seededRandom(999);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const cx = rand() * 80 + 10;
        const cy = rand() * 70 + 15;
        const phase = rand() * Math.PI * 2;
        const t = (frame / fps) * speed;
        const cycle = ((t * 0.5 + phase) % (Math.PI * 2)) / (Math.PI * 2);
        const radius = cycle * 80;
        const opacity = (1 - cycle) * 0.2;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${cx}%`,
              top: `${cy}%`,
              width: radius,
              height: radius,
              borderRadius: "50%",
              border: `1.5px solid ${color}`,
              opacity,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
};

/* =========================================================
   DOTS — Grid of pulsating dots
   ========================================================= */
export const DotsEffect: React.FC<{ effect: VisualEffect }> = ({ effect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const color = effect.color || "#BDBDBD";
  const speed = effect.speed || 1;
  const size = effect.size || 1;
  const t = (frame / fps) * speed;
  const spacing = 8;

  const dots: React.ReactNode[] = [];
  for (let x = 5; x < 100; x += spacing) {
    for (let y = 5; y < 100; y += spacing) {
      const dist = Math.sqrt((x - 50) ** 2 + (y - 50) ** 2);
      const wave = Math.sin(t * 2 - dist * 0.08) * 0.3 + 0.3;
      const s = (2 + wave * 2) * size;

      dots.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            borderRadius: "50%",
            background: color,
            opacity: wave * 0.5,
            pointerEvents: "none",
          }}
        />
      );
    }
  }

  return <>{dots}</>;
};
