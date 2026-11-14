"use client";

import { useState } from "react";

export interface Series { name: string; color: string; values: number[] }

export default function LineChart({ series, labels, height = 240, unit = "", area = false }: { series: Series[]; labels: string[]; height?: number; unit?: string; area?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 720, H = height, L = 44, R = 16, T = 16, B = 30;
  const all = series.flatMap((s) => s.values);
  const rawMax = Math.max(...all, 1), rawMin = Math.min(...all, 0);
  const mag = Math.pow(10, Math.floor(Math.log10(rawMax / 4 || 1)));
  const step = mag * (rawMax / 4 > 5 * mag ? 2 : rawMax / 4 > 2 * mag ? 1 : 0.5);
  const top = Math.ceil(rawMax / step / 4) * step * 4;
  const bottom = rawMin < 0 ? Math.floor(rawMin / step) * step : 0;
  const ticks = [0, 1, 2, 3, 4].map((i) => bottom + ((top - bottom) / 4) * i);
  const n = labels.length;
  const x = (i: number) => L + (i / (n - 1)) * (W - L - R);
  const y = (v: number) => T + (1 - (v - bottom) / (top - bottom)) * (H - T - B);
  const every = n > 8 ? 2 : 1;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    setHover(Math.max(0, Math.min(n - 1, Math.round(((px - L) / (W - L - R)) * (n - 1)))));
  };

  const tipW = 150, tipH = 22 + series.length * 18;
  const tipX = hover === null ? 0 : x(hover) > W / 2 ? x(hover) - tipW - 12 : x(hover) + 12;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`${series.map((s) => s.name).join(", ")} over ${n} days`}
      style={{ width: "100%", height: "auto", display: "block", touchAction: "pan-y" }}
      onPointerMove={onMove}
      onPointerLeave={() => setHover(null)}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="var(--rule)" />
          <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="12" fill="var(--muted)">{Math.round(t).toLocaleString("en-US")}{unit}</text>
        </g>
      ))}
      {bottom < 0 && <line x1={L} x2={W - R} y1={y(0)} y2={y(0)} stroke="var(--border)" />}
      {labels.map((l, i) => i % every === 0 && (
        <text key={l} x={x(i)} y={H - 8} textAnchor="middle" fontSize="12" fill="var(--muted)">{l}</text>
      ))}
      {area && series.length === 1 && (
        <polygon
          fill="var(--accent-soft)"
          opacity="0.7"
          points={`${x(0)},${y(0)} ${series[0].values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} ${x(n - 1)},${y(0)}`}
        />
      )}
      {series.map((s) => (
        <polyline key={s.name} fill="none" stroke={s.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")} />
      ))}
      {series.map((s) => (
        <circle key={s.name} cx={x(n - 1)} cy={y(s.values[n - 1])} r="3.5" fill={s.color} />
      ))}
      {hover !== null && (
        <g pointerEvents="none">
          <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} stroke="var(--border)" />
          {series.map((s) => (
            <circle key={s.name} cx={x(hover)} cy={y(s.values[hover])} r="4.5" fill="var(--surface)" stroke={s.color} strokeWidth="2" />
          ))}
          <g transform={`translate(${tipX}, ${T + 4})`}>
            <rect width={tipW} height={tipH} rx="6" fill="var(--surface)" stroke="var(--border)" />
            <text x="10" y="16" fontSize="12" fill="var(--muted)">{labels[hover]}</text>
            {series.map((s, k) => (
              <g key={s.name}>
                <circle cx="14" cy={32 + k * 18 - 4} r="3.5" fill={s.color} />
                <text x="24" y={32 + k * 18} fontSize="12.5" fill="var(--text)">{s.name.replace(/^Followers gained, /, "")}</text>
                <text x={tipW - 10} y={32 + k * 18} fontSize="12.5" fontWeight="600" textAnchor="end" fill="var(--text)">{s.values[hover] > 0 ? "+" : s.values[hover] < 0 ? "−" : ""}{Math.abs(s.values[hover]).toLocaleString("en-US")}</text>
              </g>
            ))}
          </g>
        </g>
      )}
    </svg>
  );
}
