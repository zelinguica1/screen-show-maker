import React from "react";

interface SlideVisualsProps {
  visualType: string;
  items?: string[];
  textColor: string;
}

const SHAPE_COLORS = [
  "#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA",
  "#FB923C", "#34D399", "#60A5FA", "#F472B6",
];

const CountingVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: SHAPE_COLORS[i % SHAPE_COLORS.length],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {i + 1}
          </div>
          <span style={{ fontSize: 24, fontWeight: 600, color: textColor, textAlign: "center", maxWidth: 120 }}>
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

const EquationVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.25)",
            borderRadius: 16,
            padding: "16px 32px",
            fontSize: 48,
            fontWeight: 800,
            color: textColor,
            fontFamily: "'Space Grotesk', monospace",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            letterSpacing: 4,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const ComparisonVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  return (
    <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 30, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {left.map((item, i) => (
          <div
            key={i}
            style={{
              background: SHAPE_COLORS[0],
              borderRadius: 12,
              padding: "12px 24px",
              fontSize: 32,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: textColor,
          opacity: 0.6,
        }}
      >
        ⟷
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
        {right.map((item, i) => (
          <div
            key={i}
            style={{
              background: SHAPE_COLORS[2],
              borderRadius: 12,
              padding: "12px 24px",
              fontSize: 32,
              fontWeight: 700,
              color: "#1E1B4B",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const ExampleVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 30 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: 16,
            padding: "20px 28px",
            fontSize: 32,
            fontWeight: 600,
            color: textColor,
            borderLeft: `6px solid ${SHAPE_COLORS[i % SHAPE_COLORS.length]}`,
            maxWidth: 400,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

const TextVisual: React.FC<{ items: string[]; textColor: string }> = ({ items, textColor }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30, alignItems: "center" }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: textColor,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          {item}
        </div>
      ))}
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
