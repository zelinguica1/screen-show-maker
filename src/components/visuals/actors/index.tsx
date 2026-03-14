import React from "react";

interface ActorProps {
  size: number;
  color?: string;
  frame: number;
  fps: number;
}

type ActorComponent = React.FC<ActorProps>;

/* ===================== ANIMALS ===================== */

const Dinosaur: ActorComponent = ({ size, color = "#4CAF50", frame, fps }) => {
  const breathe = Math.sin(frame / fps * 2) * 2;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g transform={`translate(0, ${breathe})`}>
        {/* Body */}
        <ellipse cx="55" cy="70" rx="30" ry="22" fill={color} />
        {/* Tail */}
        <path d={`M25,70 Q5,55 10,40 Q15,50 25,60`} fill={color} />
        {/* Neck + Head */}
        <ellipse cx="78" cy="48" rx="10" ry="18" fill={color} />
        <circle cx="82" cy="35" r="14" fill={color} />
        {/* Eye */}
        <circle cx="88" cy="32" r="4" fill="white" />
        <circle cx="89" cy="31" r="2" fill="#333" />
        {/* Mouth */}
        <path d="M92,38 Q96,40 92,42" fill="none" stroke="#333" strokeWidth="1.5" />
        {/* Spots */}
        <circle cx="45" cy="65" r="4" fill={`${color}99`} />
        <circle cx="55" cy="60" r="3" fill={`${color}99`} />
        <circle cx="65" cy="67" r="3.5" fill={`${color}99`} />
        {/* Legs */}
        <rect x="40" y="85" width="8" height="18" rx="4" fill={color} />
        <rect x="60" y="85" width="8" height="18" rx="4" fill={color} />
        {/* Spikes */}
        <polygon points="50,48 55,35 60,48" fill="#FFD54F" />
        <polygon points="60,45 65,32 70,45" fill="#FFD54F" />
        <polygon points="70,47 75,34 78,47" fill="#FFD54F" />
      </g>
    </svg>
  );
};

const Fish: ActorComponent = ({ size, color = "#42A5F5", frame, fps }) => {
  const swim = Math.sin(frame / fps * 3) * 3;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g transform={`translate(${swim}, 0)`}>
        <ellipse cx="60" cy="60" rx="35" ry="20" fill={color} />
        <polygon points="20,60 5,45 5,75" fill={color} />
        <circle cx="80" cy="55" r="4" fill="white" />
        <circle cx="81" cy="54" r="2" fill="#333" />
        <path d="M88,62 Q92,65 88,68" fill="none" stroke="#333" strokeWidth="1.5" />
        <path d="M55,45 Q60,38 65,45" fill={`${color}cc`} />
        <path d="M45,50 L50,42 L55,50" fill={`${color}99`} />
      </g>
    </svg>
  );
};

const Bird: ActorComponent = ({ size, color = "#FF7043", frame, fps }) => {
  const wingFlap = Math.sin(frame / fps * 6) * 12;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <ellipse cx="60" cy="65" rx="20" ry="15" fill={color} />
      <circle cx="75" cy="52" r="12" fill={color} />
      <circle cx="80" cy="49" r="3" fill="white" />
      <circle cx="81" cy="48" r="1.5" fill="#333" />
      <polygon points="87,52 100,50 87,55" fill="#FFA726" />
      {/* Wings */}
      <path d={`M50,55 Q35,${45 + wingFlap} 25,${50 + wingFlap}`} fill={`${color}cc`} strokeWidth="0" />
      <path d={`M70,55 Q85,${45 + wingFlap} 95,${50 + wingFlap}`} fill={`${color}cc`} strokeWidth="0" />
      {/* Tail */}
      <polygon points="40,70 25,65 28,78" fill={`${color}bb`} />
      {/* Feet */}
      <line x1="55" y1="80" x2="52" y2="95" stroke="#FFA726" strokeWidth="2" />
      <line x1="65" y1="80" x2="68" y2="95" stroke="#FFA726" strokeWidth="2" />
    </svg>
  );
};

const Cat: ActorComponent = ({ size, color = "#FF8A65", frame, fps }) => {
  const tail = Math.sin(frame / fps * 2) * 10;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <ellipse cx="60" cy="75" rx="25" ry="20" fill={color} />
      <circle cx="60" cy="45" r="18" fill={color} />
      {/* Ears */}
      <polygon points="45,30 40,10 55,25" fill={color} />
      <polygon points="75,30 80,10 65,25" fill={color} />
      <polygon points="47,28 44,15 54,26" fill="#FFAB91" />
      <polygon points="73,28 76,15 66,26" fill="#FFAB91" />
      {/* Eyes */}
      <ellipse cx="52" cy="42" rx="4" ry="5" fill="#FFEB3B" />
      <ellipse cx="68" cy="42" rx="4" ry="5" fill="#FFEB3B" />
      <ellipse cx="52" cy="43" rx="2" ry="4" fill="#333" />
      <ellipse cx="68" cy="43" rx="2" ry="4" fill="#333" />
      {/* Nose + mouth */}
      <polygon points="58,50 62,50 60,53" fill="#E91E63" />
      <path d="M60,53 Q55,58 50,55" fill="none" stroke="#333" strokeWidth="1" />
      <path d="M60,53 Q65,58 70,55" fill="none" stroke="#333" strokeWidth="1" />
      {/* Whiskers */}
      <line x1="35" y1="48" x2="50" y2="50" stroke="#333" strokeWidth="0.8" />
      <line x1="35" y1="53" x2="50" y2="53" stroke="#333" strokeWidth="0.8" />
      <line x1="70" y1="50" x2="85" y2="48" stroke="#333" strokeWidth="0.8" />
      <line x1="70" y1="53" x2="85" y2="53" stroke="#333" strokeWidth="0.8" />
      {/* Tail */}
      <path d={`M35,80 Q20,${70 + tail} 15,${60 + tail}`} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Legs */}
      <rect x="45" y="90" width="8" height="14" rx="4" fill={color} />
      <rect x="65" y="90" width="8" height="14" rx="4" fill={color} />
    </svg>
  );
};

const Dog: ActorComponent = ({ size, color = "#8D6E63", frame, fps }) => {
  const tailWag = Math.sin(frame / fps * 6) * 15;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <ellipse cx="60" cy="72" rx="28" ry="22" fill={color} />
      <circle cx="65" cy="45" r="18" fill={color} />
      {/* Ears */}
      <ellipse cx="48" cy="30" rx="8" ry="16" fill={`${color}cc`} transform="rotate(-15 48 30)" />
      <ellipse cx="82" cy="30" rx="8" ry="16" fill={`${color}cc`} transform="rotate(15 82 30)" />
      {/* Eyes */}
      <circle cx="58" cy="42" r="4" fill="white" />
      <circle cx="72" cy="42" r="4" fill="white" />
      <circle cx="59" cy="41" r="2" fill="#333" />
      <circle cx="73" cy="41" r="2" fill="#333" />
      {/* Nose */}
      <ellipse cx="65" cy="50" rx="5" ry="4" fill="#333" />
      {/* Mouth */}
      <path d="M65,54 Q60,60 55,57" fill="none" stroke="#333" strokeWidth="1.2" />
      <path d="M65,54 Q70,60 75,57" fill="none" stroke="#333" strokeWidth="1.2" />
      {/* Tongue */}
      <ellipse cx="65" cy="58" rx="3" ry="5" fill="#E91E63" />
      {/* Tail */}
      <path d={`M32,68 Q20,${55 + tailWag} 18,${45 + tailWag}`} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
      {/* Legs */}
      <rect x="42" y="88" width="9" height="16" rx="4" fill={color} />
      <rect x="68" y="88" width="9" height="16" rx="4" fill={color} />
    </svg>
  );
};

const Butterfly: ActorComponent = ({ size, color = "#CE93D8", frame, fps }) => {
  const wingAngle = Math.sin(frame / fps * 4) * 15;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Wings */}
      <ellipse cx="40" cy="50" rx="22" ry="28" fill={color} opacity="0.85" transform={`rotate(${wingAngle} 60 60)`} />
      <ellipse cx="80" cy="50" rx="22" ry="28" fill={color} opacity="0.85" transform={`rotate(${-wingAngle} 60 60)`} />
      <ellipse cx="42" cy="72" rx="16" ry="20" fill={`${color}bb`} transform={`rotate(${wingAngle * 0.8} 60 60)`} />
      <ellipse cx="78" cy="72" rx="16" ry="20" fill={`${color}bb`} transform={`rotate(${-wingAngle * 0.8} 60 60)`} />
      {/* Wing spots */}
      <circle cx="38" cy="45" r="6" fill="white" opacity="0.4" />
      <circle cx="82" cy="45" r="6" fill="white" opacity="0.4" />
      {/* Body */}
      <ellipse cx="60" cy="60" rx="5" ry="22" fill="#5D4037" />
      {/* Head */}
      <circle cx="60" cy="35" r="6" fill="#5D4037" />
      <circle cx="57" cy="33" r="1.5" fill="white" />
      <circle cx="63" cy="33" r="1.5" fill="white" />
      {/* Antennae */}
      <path d="M58,30 Q52,18 48,15" fill="none" stroke="#5D4037" strokeWidth="1.5" />
      <path d="M62,30 Q68,18 72,15" fill="none" stroke="#5D4037" strokeWidth="1.5" />
      <circle cx="48" cy="15" r="2" fill="#5D4037" />
      <circle cx="72" cy="15" r="2" fill="#5D4037" />
    </svg>
  );
};

const Rabbit: ActorComponent = ({ size, color = "#EFEBE9", frame, fps }) => {
  const nose = Math.sin(frame / fps * 4) * 1;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Ears */}
      <ellipse cx="48" cy="25" rx="8" ry="22" fill={color} />
      <ellipse cx="72" cy="25" rx="8" ry="22" fill={color} />
      <ellipse cx="48" cy="25" rx="4" ry="16" fill="#FFCDD2" />
      <ellipse cx="72" cy="25" rx="4" ry="16" fill="#FFCDD2" />
      {/* Head */}
      <circle cx="60" cy="55" r="22" fill={color} />
      {/* Body */}
      <ellipse cx="60" cy="85" rx="20" ry="18" fill={color} />
      {/* Eyes */}
      <circle cx="52" cy="50" r="4" fill="#333" />
      <circle cx="68" cy="50" r="4" fill="#333" />
      <circle cx="53" cy="49" r="1.5" fill="white" />
      <circle cx="69" cy="49" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="60" cy={58 + nose} rx="3" ry="2.5" fill="#E91E63" />
      {/* Mouth */}
      <path d="M57,62 Q60,66 63,62" fill="none" stroke="#333" strokeWidth="1" />
      {/* Cheeks */}
      <circle cx="45" cy="58" r="5" fill="#FFCDD2" opacity="0.5" />
      <circle cx="75" cy="58" r="5" fill="#FFCDD2" opacity="0.5" />
      {/* Feet */}
      <ellipse cx="48" cy="102" rx="8" ry="5" fill={color} />
      <ellipse cx="72" cy="102" rx="8" ry="5" fill={color} />
    </svg>
  );
};

/* ===================== NATURE ===================== */

const Sun: ActorComponent = ({ size, color = "#FFD54F", frame, fps }) => {
  const rotate = (frame / fps) * 20;
  const pulse = Math.sin(frame / fps * 2) * 3;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g transform={`rotate(${rotate} 60 60)`}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="60" y1="15" x2="60" y2="28"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${angle} 60 60)`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r={28 + pulse} fill={color} />
      <circle cx="50" cy="52" r="3" fill="#FF8F00" />
      <circle cx="70" cy="52" r="3" fill="#FF8F00" />
      <path d="M48,65 Q60,75 72,65" fill="none" stroke="#FF8F00" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

const Moon: ActorComponent = ({ size, color = "#FFF9C4", frame, fps }) => {
  const glow = Math.sin(frame / fps * 1.5) * 0.15 + 0.85;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="35" fill={color} opacity={glow} />
      <circle cx="45" cy="60" r="28" fill="#1a1a2e" />
      {/* Craters on visible part */}
      <circle cx="72" cy="45" r="4" fill={`${color}88`} />
      <circle cx="80" cy="60" r="3" fill={`${color}88`} />
      <circle cx="68" cy="72" r="5" fill={`${color}88`} />
      {/* Stars */}
      <circle cx="15" cy="20" r="1.5" fill="white" opacity={glow} />
      <circle cx="100" cy="25" r="1" fill="white" opacity={glow} />
      <circle cx="25" cy="95" r="1.2" fill="white" opacity={glow} />
      <circle cx="95" cy="90" r="1.5" fill="white" opacity={glow} />
    </svg>
  );
};

const Cloud: ActorComponent = ({ size, color = "#ECEFF1", frame, fps }) => {
  const drift = Math.sin(frame / fps * 0.8) * 3;
  return (
    <svg width={size} height={size} viewBox="0 0 120 80">
      <g transform={`translate(${drift}, 0)`}>
        <ellipse cx="60" cy="50" rx="35" ry="18" fill={color} />
        <ellipse cx="40" cy="45" rx="22" ry="16" fill={color} />
        <ellipse cx="78" cy="46" rx="20" ry="14" fill={color} />
        <ellipse cx="52" cy="38" rx="18" ry="14" fill={color} />
        <ellipse cx="68" cy="36" rx="16" ry="12" fill={color} />
      </g>
    </svg>
  );
};

const Tree: ActorComponent = ({ size, color = "#66BB6A", frame, fps }) => {
  const sway = Math.sin(frame / fps * 1.5) * 2;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g transform={`rotate(${sway} 60 110)`}>
        {/* Trunk */}
        <rect x="52" y="70" width="16" height="40" rx="3" fill="#795548" />
        {/* Crown layers */}
        <ellipse cx="60" cy="55" rx="32" ry="25" fill={color} />
        <ellipse cx="50" cy="45" rx="22" ry="20" fill={`${color}dd`} />
        <ellipse cx="72" cy="48" rx="18" ry="18" fill={`${color}cc`} />
        <ellipse cx="60" cy="35" rx="20" ry="16" fill={`${color}ee`} />
        {/* Highlights */}
        <circle cx="48" cy="40" r="4" fill="white" opacity="0.15" />
        <circle cx="70" cy="50" r="3" fill="white" opacity="0.1" />
      </g>
    </svg>
  );
};

const Flower: ActorComponent = ({ size, color = "#E91E63", frame, fps }) => {
  const sway = Math.sin(frame / fps * 2) * 3;
  const petalColors = [color, "#FF5722", "#FF9800", "#E040FB", "#7C4DFF"];
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g transform={`rotate(${sway} 60 110)`}>
        {/* Stem */}
        <line x1="60" y1="60" x2="60" y2="110" stroke="#4CAF50" strokeWidth="4" />
        {/* Leaves */}
        <ellipse cx="48" cy="85" rx="10" ry="5" fill="#66BB6A" transform="rotate(-30 48 85)" />
        <ellipse cx="72" cy="90" rx="10" ry="5" fill="#66BB6A" transform="rotate(30 72 90)" />
        {/* Petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={angle}
            cx="60" cy="40"
            rx="10" ry="18"
            fill={petalColors[i % petalColors.length]}
            transform={`rotate(${angle} 60 55)`}
            opacity="0.85"
          />
        ))}
        {/* Center */}
        <circle cx="60" cy="55" r="8" fill="#FFC107" />
        <circle cx="58" cy="53" r="2" fill="#FF8F00" opacity="0.5" />
      </g>
    </svg>
  );
};

const Star: ActorComponent = ({ size, color = "#FFD54F", frame, fps }) => {
  const twinkle = Math.sin(frame / fps * 3) * 0.2 + 0.8;
  const rotate = Math.sin(frame / fps * 1) * 5;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g transform={`rotate(${rotate} 60 60)`} opacity={twinkle}>
        <polygon
          points="60,10 72,45 110,45 80,68 90,105 60,82 30,105 40,68 10,45 48,45"
          fill={color}
        />
        <polygon
          points="60,25 68,48 95,48 73,63 80,90 60,75 40,90 47,63 25,48 52,48"
          fill="white"
          opacity="0.25"
        />
      </g>
    </svg>
  );
};

const Mountain: ActorComponent = ({ size, color = "#78909C", frame }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 100">
      <polygon points="60,10 110,95 10,95" fill={color} />
      <polygon points="60,10 75,40 45,40" fill="white" opacity="0.7" />
      <polygon points="85,30 120,95 50,95" fill={`${color}bb`} />
      <polygon points="85,30 95,48 75,48" fill="white" opacity="0.5" />
    </svg>
  );
};

const Rain: ActorComponent = ({ size, color = "#42A5F5", frame, fps }) => {
  const fall = (frame * 3) % 40;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Cloud */}
      <ellipse cx="60" cy="30" rx="30" ry="15" fill="#B0BEC5" />
      <ellipse cx="42" cy="28" rx="18" ry="12" fill="#B0BEC5" />
      <ellipse cx="76" cy="28" rx="16" ry="11" fill="#B0BEC5" />
      {/* Drops */}
      {[25, 45, 60, 75, 90].map((x, i) => {
        const yOff = (fall + i * 10) % 40;
        return (
          <g key={i} opacity={0.7}>
            <path d={`M${x},${50 + yOff} Q${x - 2},${58 + yOff} ${x},${62 + yOff} Q${x + 2},${58 + yOff} ${x},${50 + yOff}`} fill={color} />
          </g>
        );
      })}
    </svg>
  );
};

/* ===================== OBJECTS ===================== */

const House: ActorComponent = ({ size, color = "#E57373", frame }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Main structure */}
      <rect x="25" y="55" width="70" height="50" rx="3" fill="#FFF3E0" />
      {/* Roof */}
      <polygon points="20,58 60,20 100,58" fill={color} />
      {/* Door */}
      <rect x="50" y="75" width="20" height="30" rx="2" fill="#795548" />
      <circle cx="66" cy="92" r="2" fill="#FFD54F" />
      {/* Windows */}
      <rect x="32" y="65" width="14" height="14" rx="2" fill="#BBDEFB" stroke="white" strokeWidth="2" />
      <rect x="74" y="65" width="14" height="14" rx="2" fill="#BBDEFB" stroke="white" strokeWidth="2" />
      <line x1="39" y1="65" x2="39" y2="79" stroke="white" strokeWidth="1" />
      <line x1="81" y1="65" x2="81" y2="79" stroke="white" strokeWidth="1" />
      {/* Chimney */}
      <rect x="78" y="28" width="10" height="22" fill="#8D6E63" />
    </svg>
  );
};

const Car: ActorComponent = ({ size, color = "#EF5350", frame, fps }) => {
  const wheelSpin = (frame / fps) * 360;
  return (
    <svg width={size} height={size} viewBox="0 0 140 80">
      {/* Body */}
      <rect x="15" y="30" width="110" height="30" rx="8" fill={color} />
      <path d="M40,30 L55,10 L95,10 L110,30" fill={color} />
      {/* Windows */}
      <path d="M58,12 L48,28 L75,28 L75,12 Z" fill="#BBDEFB" />
      <path d="M78,12 L78,28 L105,28 L95,12 Z" fill="#BBDEFB" />
      {/* Wheels */}
      <g transform={`rotate(${wheelSpin} 38 62)`}>
        <circle cx="38" cy="62" r="12" fill="#333" />
        <circle cx="38" cy="62" r="6" fill="#888" />
        <line x1="38" y1="50" x2="38" y2="54" stroke="#666" strokeWidth="1.5" />
        <line x1="38" y1="70" x2="38" y2="74" stroke="#666" strokeWidth="1.5" />
      </g>
      <g transform={`rotate(${wheelSpin} 100 62)`}>
        <circle cx="100" cy="62" r="12" fill="#333" />
        <circle cx="100" cy="62" r="6" fill="#888" />
        <line x1="100" y1="50" x2="100" y2="54" stroke="#666" strokeWidth="1.5" />
        <line x1="100" y1="70" x2="100" y2="74" stroke="#666" strokeWidth="1.5" />
      </g>
      {/* Headlights */}
      <circle cx="122" cy="42" r="4" fill="#FFEB3B" />
      <circle cx="20" cy="42" r="3" fill="#F44336" opacity="0.8" />
    </svg>
  );
};

const Rocket: ActorComponent = ({ size, color = "#E0E0E0", frame, fps }) => {
  const flame = Math.sin(frame / fps * 8) * 5;
  return (
    <svg width={size} height={size} viewBox="0 0 80 140">
      {/* Flame */}
      <path d={`M30,120 Q40,${135 + flame} 50,120 Q45,${128 + flame * 0.5} 40,130 Q35,${128 - flame * 0.3} 30,120`} fill="#FF6D00" />
      <path d={`M34,118 Q40,${128 + flame * 0.8} 46,118 Q43,${124 + flame * 0.3} 40,126 Q37,${124 - flame * 0.2} 34,118`} fill="#FFD54F" />
      {/* Body */}
      <path d="M30,50 L30,115 Q30,120 35,120 L45,120 Q50,120 50,115 L50,50 Q40,15 30,50" fill={color} />
      {/* Nose */}
      <path d="M30,50 Q40,15 50,50" fill={`${color === "#E0E0E0" ? "#F44336" : color}`} />
      {/* Window */}
      <circle cx="40" cy="70" r="8" fill="#BBDEFB" stroke="#90A4AE" strokeWidth="2" />
      <circle cx="37" cy="67" r="2" fill="white" opacity="0.5" />
      {/* Fins */}
      <polygon points="30,100 15,120 30,115" fill="#F44336" />
      <polygon points="50,100 65,120 50,115" fill="#F44336" />
    </svg>
  );
};

const Balloon: ActorComponent = ({ size, color = "#EF5350", frame, fps }) => {
  const sway = Math.sin(frame / fps * 2) * 5;
  return (
    <svg width={size} height={size} viewBox="0 0 80 130">
      <g transform={`rotate(${sway} 40 40)`}>
        <ellipse cx="40" cy="40" rx="25" ry="32" fill={color} />
        <ellipse cx="33" cy="30" rx="6" ry="10" fill="white" opacity="0.25" />
        <polygon points="36,72 44,72 42,78 38,78" fill={color} />
        {/* String */}
        <path d={`M40,78 Q${35 + sway},100 40,125`} fill="none" stroke="#999" strokeWidth="1.5" />
      </g>
    </svg>
  );
};

const Book: ActorComponent = ({ size, color = "#5C6BC0", frame }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 100">
      {/* Back cover */}
      <rect x="15" y="10" width="90" height="75" rx="3" fill={color} />
      {/* Pages */}
      <rect x="20" y="12" width="82" height="70" rx="2" fill="#FFF8E1" />
      {/* Front cover */}
      <rect x="18" y="8" width="44" height="78" rx="3" fill={color} />
      {/* Lines on pages */}
      <line x1="70" y1="25" x2="95" y2="25" stroke="#E0E0E0" strokeWidth="1.5" />
      <line x1="70" y1="35" x2="95" y2="35" stroke="#E0E0E0" strokeWidth="1.5" />
      <line x1="70" y1="45" x2="95" y2="45" stroke="#E0E0E0" strokeWidth="1.5" />
      <line x1="70" y1="55" x2="95" y2="55" stroke="#E0E0E0" strokeWidth="1.5" />
      {/* Title decoration on cover */}
      <rect x="28" y="30" width="24" height="3" rx="1" fill="white" opacity="0.6" />
      <rect x="28" y="38" width="18" height="3" rx="1" fill="white" opacity="0.4" />
      {/* Spine */}
      <line x1="62" y1="10" x2="62" y2="85" stroke={`${color}99`} strokeWidth="2" />
    </svg>
  );
};

const Pencil: ActorComponent = ({ size, color = "#FFC107", frame }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 30 130">
      <polygon points="15,120 8,100 22,100" fill="#FFE0B2" />
      <polygon points="15,120 12,108 18,108" fill="#333" />
      <rect x="8" y="15" width="14" height="85" fill={color} />
      <rect x="8" y="15" width="14" height="10" fill="#E0E0E0" />
      <ellipse cx="15" cy="13" rx="5" ry="3" fill="#F48FB1" />
    </svg>
  );
};

const Ball: ActorComponent = ({ size, color = "#FF7043", frame, fps }) => {
  const squash = Math.sin(frame / fps * 3) * 0.05;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="50" rx={40 * (1 + squash)} ry={40 * (1 - squash)} fill={color} />
      <path d="M20,40 Q50,30 80,40" fill="none" stroke="white" strokeWidth="3" opacity="0.4" />
      <path d="M25,60 Q50,70 75,60" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
      <ellipse cx="38" cy="38" rx="8" ry="6" fill="white" opacity="0.2" />
    </svg>
  );
};

/* ===================== FOOD ===================== */

const Apple: ActorComponent = ({ size, color = "#F44336", frame }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110">
      <path d="M50,15 Q45,5 40,10" fill="none" stroke="#795548" strokeWidth="3" />
      <ellipse cx="40" cy="60" rx="25" ry="32" fill={color} />
      <ellipse cx="60" cy="60" rx="25" ry="32" fill={color} />
      <ellipse cx="35" cy="45" rx="6" ry="8" fill="white" opacity="0.2" />
      <ellipse cx="55" cy="25" rx="8" ry="5" fill="#4CAF50" transform="rotate(-30 55 25)" />
    </svg>
  );
};

const Banana: ActorComponent = ({ size, color = "#FFEB3B", frame }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M30,80 Q10,40 40,15 Q50,8 55,15 Q20,45 35,80 Z" fill={color} />
      <path d="M40,15 Q42,12 45,13" fill="none" stroke="#795548" strokeWidth="2" />
      <path d="M32,70 Q18,42 42,20" fill="none" stroke="#F9A825" strokeWidth="2" opacity="0.4" />
    </svg>
  );
};

const Cake: ActorComponent = ({ size, color = "#F48FB1", frame, fps }) => {
  const flicker = Math.sin(frame / fps * 6) * 2;
  return (
    <svg width={size} height={size} viewBox="0 0 120 110">
      {/* Base */}
      <rect x="20" y="55" width="80" height="40" rx="5" fill={color} />
      <rect x="15" y="50" width="90" height="12" rx="4" fill="white" />
      {/* Frosting drips */}
      <circle cx="30" cy="62" r="4" fill="white" />
      <circle cx="50" cy="65" r="5" fill="white" />
      <circle cx="70" cy="63" r="4" fill="white" />
      <circle cx="90" cy="64" r="3" fill="white" />
      {/* Candle */}
      <rect x="57" y="30" width="6" height="22" rx="2" fill="#42A5F5" />
      {/* Flame */}
      <ellipse cx="60" cy={25 + flicker * 0.3} rx="4" ry={7 + flicker} fill="#FF9800" />
      <ellipse cx="60" cy={24 + flicker * 0.2} rx="2" ry={4 + flicker * 0.5} fill="#FFEB3B" />
      {/* Bottom layer */}
      <rect x="25" y="88" width="70" height="12" rx="4" fill={`${color}cc`} />
    </svg>
  );
};

/* ===================== PEOPLE ===================== */

const Child: ActorComponent = ({ size, color = "#FFB74D", frame, fps }) => {
  const wave = Math.sin(frame / fps * 3) * 10;
  return (
    <svg width={size} height={size} viewBox="0 0 100 130">
      {/* Body */}
      <rect x="35" y="55" width="30" height="35" rx="5" fill="#42A5F5" />
      {/* Head */}
      <circle cx="50" cy="38" r="20" fill={color} />
      {/* Hair */}
      <path d="M30,32 Q35,15 50,12 Q65,15 70,32" fill="#5D4037" />
      {/* Eyes */}
      <circle cx="43" cy="36" r="3" fill="#333" />
      <circle cx="57" cy="36" r="3" fill="#333" />
      <circle cx="44" cy="35" r="1" fill="white" />
      <circle cx="58" cy="35" r="1" fill="white" />
      {/* Smile */}
      <path d="M43,45 Q50,52 57,45" fill="none" stroke="#333" strokeWidth="1.5" />
      {/* Arms */}
      <line x1="35" y1="62" x2="20" y2="72" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
      <line x1="65" y1="62" x2={80 + wave} y2={60 - Math.abs(wave)} stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="20" cy="72" r="4" fill={color} />
      <circle cx={80 + wave} cy={60 - Math.abs(wave)} r="4" fill={color} />
      {/* Legs */}
      <rect x="38" y="88" width="10" height="22" rx="4" fill="#1565C0" />
      <rect x="52" y="88" width="10" height="22" rx="4" fill="#1565C0" />
      {/* Shoes */}
      <ellipse cx="43" cy="112" rx="8" ry="4" fill="#F44336" />
      <ellipse cx="57" cy="112" rx="8" ry="4" fill="#F44336" />
    </svg>
  );
};

const Teacher: ActorComponent = ({ size, color = "#FFCC80", frame, fps }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 130">
      {/* Body */}
      <rect x="32" y="55" width="36" height="40" rx="5" fill="#7B1FA2" />
      {/* Head */}
      <circle cx="50" cy="35" r="20" fill={color} />
      {/* Hair */}
      <path d="M28,30 Q30,8 50,5 Q70,8 72,30 L72,38 Q68,30 50,28 Q32,30 28,38 Z" fill="#3E2723" />
      {/* Glasses */}
      <circle cx="42" cy="34" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="58" cy="34" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="48" y1="34" x2="52" y2="34" stroke="#333" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="42" cy="34" r="2" fill="#333" />
      <circle cx="58" cy="34" r="2" fill="#333" />
      {/* Smile */}
      <path d="M44,44 Q50,50 56,44" fill="none" stroke="#333" strokeWidth="1.5" />
      {/* Arms */}
      <line x1="32" y1="62" x2="18" y2="78" stroke="#7B1FA2" strokeWidth="6" strokeLinecap="round" />
      <line x1="68" y1="62" x2="82" y2="78" stroke="#7B1FA2" strokeWidth="6" strokeLinecap="round" />
      <circle cx="18" cy="78" r="4" fill={color} />
      <circle cx="82" cy="78" r="4" fill={color} />
      {/* Legs */}
      <rect x="36" y="92" width="10" height="22" rx="4" fill="#4A148C" />
      <rect x="54" y="92" width="10" height="22" rx="4" fill="#4A148C" />
      <ellipse cx="41" cy="116" rx="8" ry="4" fill="#333" />
      <ellipse cx="59" cy="116" rx="8" ry="4" fill="#333" />
    </svg>
  );
};

/* ===================== MORE ===================== */

const Heart: ActorComponent = ({ size, color = "#E91E63", frame, fps }) => {
  const beat = 1 + Math.sin(frame / fps * 4) * 0.08;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`scale(${beat}) translate(${(1 - beat) * 50}, ${(1 - beat) * 50})`}>
        <path d="M50,85 Q10,55 10,35 Q10,15 30,15 Q45,15 50,30 Q55,15 70,15 Q90,15 90,35 Q90,55 50,85" fill={color} />
        <ellipse cx="35" cy="32" rx="8" ry="6" fill="white" opacity="0.25" />
      </g>
    </svg>
  );
};

const Globe: ActorComponent = ({ size, color = "#42A5F5", frame, fps }) => {
  const rotate = Math.sin(frame / fps * 0.5) * 8;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill={color} />
      <ellipse cx={50 + rotate} cy="50" rx="20" ry="40" fill="none" stroke="#29B6F6" strokeWidth="1.5" />
      <ellipse cx="50" cy="35" rx="35" ry="8" fill="none" stroke="#29B6F6" strokeWidth="1.5" />
      <ellipse cx="50" cy="65" rx="35" ry="8" fill="none" stroke="#29B6F6" strokeWidth="1.5" />
      {/* Continents (simplified) */}
      <path d={`M${35 + rotate},30 Q${45 + rotate},25 ${50 + rotate},32 Q${48 + rotate},40 ${38 + rotate},38 Z`} fill="#66BB6A" />
      <path d={`M${55 + rotate},50 Q${70 + rotate},45 ${72 + rotate},55 Q${65 + rotate},65 ${55 + rotate},60 Z`} fill="#66BB6A" />
      <path d={`M${28 + rotate},55 Q${35 + rotate},50 ${40 + rotate},58 Q${35 + rotate},68 ${28 + rotate},62 Z`} fill="#66BB6A" />
      <ellipse cx="38" cy="38" rx="10" ry="8" fill="white" opacity="0.12" />
    </svg>
  );
};

const MusicNote: ActorComponent = ({ size, color = "#AB47BC", frame, fps }) => {
  const bounce = Math.sin(frame / fps * 3) * 3;
  return (
    <svg width={size} height={size} viewBox="0 0 80 110">
      <g transform={`translate(0, ${bounce})`}>
        <rect x="55" y="10" width="4" height="70" fill={color} />
        <ellipse cx="40" cy="85" rx="18" ry="12" fill={color} transform="rotate(-15 40 85)" />
        <path d="M59,10 Q80,15 75,35 Q70,28 59,25" fill={color} />
      </g>
    </svg>
  );
};

const NumberBlock: ActorComponent = ({ size, color = "#5C6BC0", frame, fps }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect x="10" y="10" width="80" height="80" rx="12" fill={color} />
      <rect x="15" y="15" width="70" height="70" rx="10" fill="white" opacity="0.15" />
      <text x="50" y="68" textAnchor="middle" fontSize="48" fontWeight="900" fill="white" fontFamily="system-ui">
        123
      </text>
    </svg>
  );
};

const Abc: ActorComponent = ({ size, color = "#26A69A", frame, fps }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 120 80">
      <rect x="5" y="5" width="110" height="70" rx="12" fill={color} />
      <text x="60" y="55" textAnchor="middle" fontSize="40" fontWeight="800" fill="white" fontFamily="system-ui">
        ABC
      </text>
    </svg>
  );
};

/* ===================== REGISTRY ===================== */

const ACTOR_REGISTRY: Record<string, ActorComponent> = {
  dinosaur: Dinosaur,
  dinosauro: Dinosaur,
  dino: Dinosaur,
  fish: Fish,
  peixe: Fish,
  bird: Bird,
  pássaro: Bird,
  passaro: Bird,
  cat: Cat,
  gato: Cat,
  dog: Dog,
  cachorro: Dog,
  cão: Dog,
  cao: Dog,
  butterfly: Butterfly,
  borboleta: Butterfly,
  rabbit: Rabbit,
  coelho: Rabbit,
  sun: Sun,
  sol: Sun,
  moon: Moon,
  lua: Moon,
  cloud: Cloud,
  nuvem: Cloud,
  tree: Tree,
  árvore: Tree,
  arvore: Tree,
  flower: Flower,
  flor: Flower,
  star: Star,
  estrela: Star,
  mountain: Mountain,
  montanha: Mountain,
  rain: Rain,
  chuva: Rain,
  house: House,
  casa: House,
  car: Car,
  carro: Car,
  rocket: Rocket,
  foguete: Rocket,
  balloon: Balloon,
  balão: Balloon,
  balao: Balloon,
  book: Book,
  livro: Book,
  pencil: Pencil,
  lápis: Pencil,
  lapis: Pencil,
  ball: Ball,
  bola: Ball,
  apple: Apple,
  maçã: Apple,
  maca: Apple,
  banana: Banana,
  cake: Cake,
  bolo: Cake,
  child: Child,
  criança: Child,
  crianca: Child,
  menino: Child,
  menina: Child,
  teacher: Teacher,
  professora: Teacher,
  professor: Teacher,
  heart: Heart,
  coração: Heart,
  coracao: Heart,
  globe: Globe,
  globo: Globe,
  terra: Globe,
  planeta: Globe,
  music: MusicNote,
  música: MusicNote,
  musica: MusicNote,
  nota: MusicNote,
  number: NumberBlock,
  número: NumberBlock,
  numero: NumberBlock,
  abc: Abc,
  letra: Abc,
  letras: Abc,
  alfabeto: Abc,
};

export function getActorComponent(type: string): ActorComponent | null {
  const key = type.toLowerCase().trim();
  return ACTOR_REGISTRY[key] || null;
}

export function getAvailableActors(): string[] {
  // Return unique actor names (deduplicated from aliases)
  const seen = new Set<ActorComponent>();
  const names: string[] = [];
  for (const [name, component] of Object.entries(ACTOR_REGISTRY)) {
    if (!seen.has(component)) {
      seen.add(component);
      names.push(name);
    }
  }
  return names;
}

/** Fallback: renders the actor name as a labeled colored shape */
export const FallbackActor: ActorComponent = ({ size, color = "#78909C", frame, fps }) => {
  const pulse = Math.sin(frame / fps * 2) * 0.05 + 1;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`scale(${pulse}) translate(${(1 - pulse) * 50}, ${(1 - pulse) * 50})`}>
        <circle cx="50" cy="50" r="40" fill={color} opacity="0.3" />
        <circle cx="50" cy="50" r="30" fill={color} opacity="0.5" />
        <circle cx="50" cy="40" r="4" fill="white" />
        <circle cx="50" cy="40" r="4" fill="white" />
        <path d="M40,55 Q50,65 60,55" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};
