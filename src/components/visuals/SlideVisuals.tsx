import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { getIconForItem } from "./EducationIcons";

interface SlideVisualsProps {
  visualType: string;
  items?: string[];
  textColor: string;
}

const SHAPE_COLORS = [
  "#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA",
  "#FB923C", "#34D399", "#60A5FA", "#F472B6",
];

/** Staggered entrance + gentle idle bounce for each item */
function useItemAnimation(index: number, totalItems: number) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const staggerDelay = 8;
  const itemFrame = Math.max(0, frame - 25 - index * staggerDelay);

  const entrance = spring({
    frame: itemFrame,
    fps,
    config: { damping: 12, stiffness: 120, mass: 0.8 },
  });

  // Gentle float / bounce after entrance
  const idlePhase = Math.max(0, frame - 25 - index * staggerDelay - 15);
  const bounce = Math.sin((idlePhase / fps) * 2.5 + index * 1.2) * 4;

  const scale = interpolate(entrance, [0, 1], [0.3, 1]);
  const opacity = interpolate(entrance, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(entrance, [0, 1], [40, 0]) + (entrance > 0.9 ? bounce : 0);
  const rotate = interpolate(entrance, [0, 1], [-15, 0]);

  return { scale, opacity, translateY, rotate };
}

const AnimatedItem: React.FC<{
  index: number;
  totalItems: number;
  children: React.ReactNode;
}> = ({ index, totalItems, children }) => {
  const { scale, opacity, translateY, rotate } = useItemAnimation(index, totalItems);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

const CountingVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginTop: 36 }}>
      {items.map((item, i) => {
        const { Icon, color } = getIconForItem(item, i);
        return (
          <AnimatedItem key={i} index={i} totalItems={items.length}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 24,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
                  position: "relative",
                }}
              >
                <Icon size={64} color={color} />
                <div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {i + 1}
                </div>
              </div>
              <span style={{ fontSize: 22, fontWeight: 700, color: textColor, textAlign: "center", maxWidth: 120 }}>
                {item}
              </span>
            </div>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

const EquationVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center", marginTop: 36 }}>
      {items.map((item, i) => {
        // Check if item looks like a number to render icons for it
        const num = parseInt(item, 10);
        const isOperator = /^[+\-×÷=<>]$/.test(item.trim());

        if (isOperator) {
          return (
            <AnimatedItem key={i} index={i} totalItems={items.length}>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  color: textColor,
                  fontFamily: "'Space Grotesk', monospace",
                  padding: "0 8px",
                }}
              >
                {item}
              </div>
            </AnimatedItem>
          );
        }

        if (!isNaN(num) && num > 0 && num <= 10) {
          const { Icon, color } = getIconForItem("star", i);
          return (
            <AnimatedItem key={i} index={i} totalItems={items.length}>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxWidth: 200,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: "16px 20px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                }}
              >
                {Array.from({ length: num }).map((_, j) => {
                  const itemEntrance = spring({
                    frame: Math.max(0, frame - 30 - i * 10 - j * 4),
                    fps,
                    config: { damping: 10, stiffness: 150 },
                  });
                  return (
                    <div key={j} style={{ transform: `scale(${itemEntrance})`, opacity: itemEntrance }}>
                      <Icon size={40} color={color} />
                    </div>
                  );
                })}
              </div>
            </AnimatedItem>
          );
        }

        // Fallback: text expression
        return (
          <AnimatedItem key={i} index={i} totalItems={items.length}>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 20,
                padding: "16px 32px",
                fontSize: 48,
                fontWeight: 800,
                color: textColor,
                fontFamily: "'Space Grotesk', monospace",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                letterSpacing: 4,
              }}
            >
              {item}
            </div>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

const ComparisonVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 36, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        {left.map((item, i) => {
          const { Icon, color } = getIconForItem(item, i);
          return (
            <AnimatedItem key={i} index={i} totalItems={items.length}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.2)", borderRadius: 16, padding: "12px 24px" }}>
                <Icon size={48} color={color} />
                <span style={{ fontSize: 28, fontWeight: 700, color: textColor }}>{item}</span>
              </div>
            </AnimatedItem>
          );
        })}
      </div>
      <AnimatedItem index={Math.floor(items.length / 2)} totalItems={items.length}>
        <div style={{ fontSize: 56, fontWeight: 900, color: textColor, opacity: 0.6 }}>⟷</div>
      </AnimatedItem>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
        {right.map((item, i) => {
          const { Icon, color } = getIconForItem(item, half + i);
          return (
            <AnimatedItem key={i} index={half + i} totalItems={items.length}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.2)", borderRadius: 16, padding: "12px 24px" }}>
                <Icon size={48} color={color} />
                <span style={{ fontSize: 28, fontWeight: 700, color: textColor }}>{item}</span>
              </div>
            </AnimatedItem>
          );
        })}
      </div>
    </div>
  );
};

const ExampleVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 36 }}>
      {items.map((item, i) => {
        const { Icon, color } = getIconForItem(item, i);
        return (
          <AnimatedItem key={i} index={i} totalItems={items.length}>
            <div
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: 20,
                padding: "20px 28px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderLeft: `6px solid ${color}`,
                maxWidth: 420,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              <Icon size={48} color={color} />
              <span style={{ fontSize: 30, fontWeight: 600, color: textColor }}>{item}</span>
            </div>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

const TextVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 36, justifyContent: "center" }}>
      {items.map((item, i) => {
        const { Icon, color } = getIconForItem(item, i);
        return (
          <AnimatedItem key={i} index={i} totalItems={items.length}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 22,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                <Icon size={56} color={color} />
              </div>
              <span style={{ fontSize: 22, fontWeight: 700, color: textColor, textAlign: "center", maxWidth: 130 }}>
                {item}
              </span>
            </div>
          </AnimatedItem>
        );
      })}
    </div>
  );
};

export const SlideVisuals: React.FC<SlideVisualsProps> = ({ visualType, items, textColor }) => {
  if (!items || items.length === 0) return null;

  switch (visualType) {
    case "counting":
      return <CountingVisual items={items} textColor={textColor} />;
    case "equation":
      return <EquationVisual items={items} textColor={textColor} />;
    case "comparison":
      return <ComparisonVisual items={items} textColor={textColor} />;
    case "example":
      return <ExampleVisual items={items} textColor={textColor} />;
    case "text":
    default:
      return <TextVisual items={items} textColor={textColor} />;
  }
};
