"use client";

interface GaugeProps {
  label: string;
  score: number; // 0-100
  size?: number;
}

export function Gauge({ label, score, size = 160 }: GaugeProps) {
  // Gauge arc from -135deg to +135deg (270deg sweep)
  const radius = 60;
  const center = 80;
  const strokeWidth = 10;

  // Convert score (0-100) to angle (-135 to 135)
  const needleAngle = -135 + (score / 100) * 270;

  // Color zones: green (60-100), yellow (30-60), red (0-30) mapped to the arc
  const getScoreColor = () => {
    if (score >= 70) return "#10b981";
    if (score >= 40) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreGlow = () => {
    if (score >= 70) return "rgba(16, 185, 129, 0.3)";
    if (score >= 40) return "rgba(245, 158, 11, 0.3)";
    return "rgba(239, 68, 68, 0.3)";
  };

  // Arc path helper
  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  // Needle endpoint
  const needleLength = 45;
  const needleRad = ((needleAngle - 90) * Math.PI) / 180;
  const needleX = center + needleLength * Math.cos(needleRad);
  const needleY = center + needleLength * Math.sin(needleRad);

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size * 0.7}
        viewBox="0 0 160 112"
        className="overflow-visible"
      >
        <defs>
          <filter id={`glow-${label}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path
          d={describeArc(center, center, radius, -135, 135)}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Red zone: -135 to -45 */}
        <path
          d={describeArc(center, center, radius, -135, -45)}
          fill="none"
          stroke="rgba(239, 68, 68, 0.25)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Yellow zone: -45 to 45 */}
        <path
          d={describeArc(center, center, radius, -45, 45)}
          fill="none"
          stroke="rgba(245, 158, 11, 0.25)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Green zone: 45 to 135 */}
        <path
          d={describeArc(center, center, radius, 45, 135)}
          fill="none"
          stroke="rgba(16, 185, 129, 0.25)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Active arc up to score */}
        <path
          d={describeArc(center, center, radius, -135, needleAngle)}
          fill="none"
          stroke={getScoreColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter={`url(#glow-${label})`}
          style={{ transition: "all 0.8s ease-out" }}
        />

        {/* Needle */}
        <line
          x1={center}
          y1={center}
          x2={needleX}
          y2={needleY}
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transition: "all 0.8s ease-out" }}
        />

        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r="5"
          fill={getScoreColor()}
          style={{ filter: `drop-shadow(0 0 6px ${getScoreGlow()})` }}
        />

        {/* Score text */}
        <text
          x={center}
          y={center + 28}
          textAnchor="middle"
          fill={getScoreColor()}
          fontSize="22"
          fontWeight="bold"
          fontFamily="var(--font-geist-mono), monospace"
        >
          {score}
        </text>
      </svg>
      <div className="text-xs font-medium text-slate-400 mt-1">{label}</div>
    </div>
  );
}
