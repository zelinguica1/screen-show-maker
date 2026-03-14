import React from "react";

interface IconProps {
  size?: number;
  color?: string;
}

const Apple: React.FC<IconProps> = ({ size = 64, color = "#FF6B6B" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="38" rx="20" ry="22" fill={color} />
    <ellipse cx="32" cy="38" rx="20" ry="22" fill="rgba(0,0,0,0.08)" />
    <ellipse cx="26" cy="34" rx="6" ry="8" fill="rgba(255,255,255,0.25)" />
    <path d="M32 16 C32 16 34 4 40 8" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="38" cy="12" rx="6" ry="4" fill="#4CAF50" transform="rotate(-20 38 12)" />
  </svg>
);

const Star: React.FC<IconProps> = ({ size = 64, color = "#FFE66D" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 4L39.5 22.5L58 25L44 39L48 58L32 49L16 58L20 39L6 25L24.5 22.5Z"
      fill={color}
      stroke="rgba(0,0,0,0.1)"
      strokeWidth="1"
    />
    <path
      d="M32 12L36.5 24L48 25.5L40 34L42 46L32 40.5L22 46L24 34L16 25.5L27.5 24Z"
      fill="rgba(255,255,255,0.2)"
    />
  </svg>
);

const Heart: React.FC<IconProps> = ({ size = 64, color = "#F472B6" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 56C32 56 6 40 6 22C6 14 12 8 20 8C25 8 29 11 32 14C35 11 39 8 44 8C52 8 58 14 58 22C58 40 32 56 32 56Z"
      fill={color}
    />
    <path
      d="M20 14C16 14 12 18 12 22C12 28 20 36 26 42"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Circle: React.FC<IconProps> = ({ size = 64, color = "#60A5FA" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="26" fill={color} />
    <circle cx="24" cy="24" r="8" fill="rgba(255,255,255,0.2)" />
  </svg>
);

const Fish: React.FC<IconProps> = ({ size = 64, color = "#4ECDC4" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="30" cy="32" rx="22" ry="14" fill={color} />
    <polygon points="52,32 62,20 62,44" fill={color} />
    <circle cx="18" cy="28" r="3" fill="white" />
    <circle cx="17" cy="28" r="1.5" fill="#1E1B4B" />
    <path d="M26 38C30 42 36 42 40 38" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
  </svg>
);

const Flower: React.FC<IconProps> = ({ size = 64, color = "#F472B6" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {[0, 60, 120, 180, 240, 300].map((angle) => (
      <ellipse
        key={angle}
        cx="32"
        cy="18"
        rx="8"
        ry="12"
        fill={color}
        opacity="0.85"
        transform={`rotate(${angle} 32 32)`}
      />
    ))}
    <circle cx="32" cy="32" r="8" fill="#FFE66D" />
    <circle cx="30" cy="30" r="3" fill="rgba(255,255,255,0.3)" />
  </svg>
);

const Sun: React.FC<IconProps> = ({ size = 64, color = "#FBBF24" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <circle cx="32" cy="32" r="14" fill={color} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="32"
        y1="10"
        x2="32"
        y2="4"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        transform={`rotate(${angle} 32 32)`}
      />
    ))}
    <circle cx="28" cy="28" r="5" fill="rgba(255,255,255,0.25)" />
  </svg>
);

const Tree: React.FC<IconProps> = ({ size = 64, color = "#34D399" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <rect x="28" y="44" width="8" height="16" rx="2" fill="#8B5E3C" />
    <polygon points="32,6 52,44 12,44" fill={color} />
    <polygon points="32,6 38,24 26,24" fill="rgba(255,255,255,0.15)" />
  </svg>
);

const Moon: React.FC<IconProps> = ({ size = 64, color = "#A78BFA" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M40 8C28 8 18 18 18 32C18 46 28 56 40 56C44 56 47 55 50 53C42 53 36 44 36 34C36 24 42 15 50 13C47 10 44 8 40 8Z"
      fill={color}
    />
  </svg>
);

const Bird: React.FC<IconProps> = ({ size = 64, color = "#FB923C" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="36" rx="16" ry="12" fill={color} />
    <circle cx="24" cy="32" r="8" fill={color} />
    <circle cx="21" cy="30" r="2.5" fill="white" />
    <circle cx="20.5" cy="30" r="1.2" fill="#1E1B4B" />
    <polygon points="14,32 6,30 14,34" fill="#FFE66D" />
    <path d="M44 28L56 18" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <path d="M46 32L58 24" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Cloud: React.FC<IconProps> = ({ size = 64, color = "#E0E7FF" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="36" rx="20" ry="12" fill={color} />
    <circle cx="22" cy="30" r="10" fill={color} />
    <circle cx="38" cy="28" r="12" fill={color} />
    <circle cx="28" cy="24" r="8" fill={color} />
  </svg>
);

const Drop: React.FC<IconProps> = ({ size = 64, color = "#60A5FA" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path
      d="M32 8C32 8 14 30 14 42C14 52 22 58 32 58C42 58 50 52 50 42C50 30 32 8 32 8Z"
      fill={color}
    />
    <ellipse cx="26" cy="38" rx="4" ry="6" fill="rgba(255,255,255,0.3)" transform="rotate(-15 26 38)" />
  </svg>
);

// Icon registry mapping keywords to components
const ICON_MAP: Record<string, React.FC<IconProps>> = {
  apple: Apple, maçã: Apple, fruta: Apple, fruit: Apple,
  star: Star, estrela: Star,
  heart: Heart, coração: Heart,
  circle: Circle, círculo: Circle, bola: Circle, ball: Circle,
  fish: Fish, peixe: Fish,
  flower: Flower, flor: Flower,
  sun: Sun, sol: Sun,
  tree: Tree, árvore: Tree,
  moon: Moon, lua: Moon,
  bird: Bird, pássaro: Bird, ave: Bird,
  cloud: Cloud, nuvem: Cloud,
  drop: Drop, gota: Drop, água: Drop, water: Drop,
};

const FALLBACK_ICONS = [Apple, Star, Heart, Circle, Fish, Flower, Sun, Tree, Moon, Bird, Cloud, Drop];
const ICON_COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#FB923C", "#34D399", "#60A5FA", "#F472B6"];

export function getIconForItem(label: string, index: number): { Icon: React.FC<IconProps>; color: string } {
  const lower = label.toLowerCase();
  for (const [key, Icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) {
      return { Icon, color: ICON_COLORS[index % ICON_COLORS.length] };
    }
  }
  return { Icon: FALLBACK_ICONS[index % FALLBACK_ICONS.length], color: ICON_COLORS[index % ICON_COLORS.length] };
}

export { Apple, Star, Heart, Circle, Fish, Flower, Sun, Tree, Moon, Bird, Cloud, Drop };
