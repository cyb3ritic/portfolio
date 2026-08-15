import React, { useEffect, useRef, useState } from "react";

/**
 * SkillRadar
 * -------------------------------------------------------------------------
 * A pure-SVG radar/spider chart, zero dependencies. Draws itself in
 * (scale + fade) the first time it scrolls into view, and highlights
 * the nearest axis on hover with a live readout.
 *
 * Reuses your existing theme tokens (text-cyber-blue / -green / -purple,
 * cyber-card, card-purple) via `currentColor`, so it inherits your
 * palette instead of introducing a new one.
 *
 * Tune the numbers in DEFAULT_SKILLS below to match your actual
 * strengths — they're the only thing you should need to touch.
 */

export interface SkillRadarPoint {
  label: string;
  value: number; // 0-100
}

const DEFAULT_SKILLS: SkillRadarPoint[] = [
  { label: "Web AppSec", value: 90 },
  { label: "Network Sec", value: 80 },
  { label: "Scripting", value: 85 },
  { label: "Cloud/Infra", value: 65 },
  { label: "Reversing", value: 70 },
  { label: "OSINT", value: 75 },
];

interface SkillRadarProps {
  skills?: SkillRadarPoint[];
  size?: number; // svg viewBox size in px
  className?: string;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SkillRadar({ skills = DEFAULT_SKILLS, size = 380, className }: SkillRadarProps) {
  const n = skills.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.29;
  const labelR = maxR * 1.22;
  const rings = [0.2, 0.4, 0.6, 0.8, 1];
  const angleStep = 360 / n;

  // Auto-fit the label font so the longest label always fits inside the
  // viewBox at any rendered size (SVG coordinates scale with the box).
  const longestLabel = Math.max(...skills.map((s) => s.label.length));
  const rightLabelX = cx + labelR * Math.cos((30 * Math.PI) / 180);
  const labelAllowance = Math.max(28, size - 8 - rightLabelX);
  const labelFontSize = Math.max(8, Math.min(11, labelAllowance / (Math.max(1, longestLabel) * 0.58)));

  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dataPoints = skills.map((s, i) => {
    const angle = i * angleStep;
    const r = (Math.max(0, Math.min(100, s.value)) / 100) * maxR;
    return { ...s, angle, point: polarToCartesian(cx, cy, r, angle) };
  });
  const dataPolygon = dataPoints.map((d) => `${d.point.x},${d.point.y}`).join(" ");

  return (
    <div
      ref={rootRef}
      className={["cyber-card card-purple p-6 border-cyber-purple/30 overflow-visible", className].filter(Boolean).join(" ")}
    >
      <h3 className="text-xl font-bold mb-3 text-cyber-purple">Cybersecurity Strength</h3>
      <p className="text-sm text-white/50 mb-4">A snapshot of where my offensive-security skills are strongest.</p>

      <div className="flex flex-col items-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width="100%"
          height="auto"
          style={{ maxWidth: "100%", overflow: "visible" }}
          role="img"
          aria-label={`Radar chart of cybersecurity skill strength across ${n} categories`}
        >
          <defs>
            <linearGradient id="skillRadarFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-cyber-blue" style={{ stopColor: "currentColor" }} stopOpacity={0.55} />
              <stop offset="50%" className="text-cyber-green" style={{ stopColor: "currentColor" }} stopOpacity={0.4} />
              <stop offset="100%" className="text-cyber-purple" style={{ stopColor: "currentColor" }} stopOpacity={0.55} />
            </linearGradient>
            <linearGradient id="skillRadarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className="text-cyber-blue" style={{ stopColor: "currentColor" }} />
              <stop offset="50%" className="text-cyber-green" style={{ stopColor: "currentColor" }} />
              <stop offset="100%" className="text-cyber-purple" style={{ stopColor: "currentColor" }} />
            </linearGradient>
            <filter id="skillRadarGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid rings */}
          {rings.map((ringFraction) => {
            const pts = skills
              .map((_, i) => {
                const p = polarToCartesian(cx, cy, maxR * ringFraction, i * angleStep);
                return `${p.x},${p.y}`;
              })
              .join(" ");
            return (
              <polygon
                key={ringFraction}
                points={pts}
                fill="none"
                className="stroke-white/10"
                strokeWidth={1}
              />
            );
          })}

          {/* axis lines */}
          {skills.map((_, i) => {
            const p = polarToCartesian(cx, cy, maxR, i * angleStep);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                className={hovered === i ? "stroke-cyber-green/70" : "stroke-white/10"}
                strokeWidth={hovered === i ? 1.5 : 1}
              />
            );
          })}

          {/* data polygon */}
          <polygon
            points={dataPolygon}
            fill="url(#skillRadarFill)"
            stroke="url(#skillRadarStroke)"
            strokeWidth={2}
            strokeLinejoin="round"
            filter="url(#skillRadarGlow)"
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transform: visible ? "scale(1)" : "scale(0)",
              opacity: visible ? 1 : 0,
              transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease-out",
            }}
          />

          {/* vertices + hit targets */}
          {dataPoints.map((d, i) => (
            <g key={d.label}>
              <circle
                cx={d.point.x}
                cy={d.point.y}
                r={hovered === i ? 5 : 3.5}
                className="fill-cyber-green"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 700ms ease-out, r 150ms ease-out",
                  transitionDelay: visible ? "600ms" : "0ms",
                }}
              />
              <circle
                cx={d.point.x}
                cy={d.point.y}
                r={14}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                style={{ cursor: "pointer" }}
              />
            </g>
          ))}

          {/* labels */}
          {skills.map((s, i) => {
            const p = polarToCartesian(cx, cy, labelR, i * angleStep);
            const cos = Math.cos(((i * angleStep - 90) * Math.PI) / 180);
            const anchor = cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
            return (
              <text
                key={s.label}
                x={p.x}
                y={p.y}
                textAnchor={anchor}
                dominantBaseline="middle"
                className={hovered === i ? "fill-cyber-green" : "fill-white/70"}
                style={{ fontSize: labelFontSize, fontWeight: hovered === i ? 700 : 500, transition: "fill 150ms ease-out" }}
              >
                {s.label}
              </text>
            );
          })}
        </svg>

        {/* legend / numeric readout */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-4 w-full max-w-xs">
          {skills.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center justify-between text-xs cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
            >
              <span className={hovered === i ? "text-cyber-green" : "text-white/60"}>{s.label}</span>
              <span className={hovered === i ? "text-cyber-green font-bold" : "text-white/40"}>{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}