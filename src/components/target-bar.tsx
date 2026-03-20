"use client";

import { cn } from "@/lib/utils";

interface TargetBarProps {
  label: string;
  current: number;
  target: number;
  format?: "currency" | "percent" | "number";
  invertColor?: boolean; // for metrics where lower is better (e.g. TACOS)
}

function formatValue(value: number, format: "currency" | "percent" | "number") {
  if (format === "currency") return `$${value.toLocaleString()}`;
  if (format === "percent") return `${value}%`;
  return value.toLocaleString();
}

export function TargetBar({ label, current, target, format = "currency", invertColor = false }: TargetBarProps) {
  const pct = target > 0 ? (current / target) * 100 : 0;
  const cappedPct = Math.min(pct, 100);

  // Color rules: Green (>=95% or within -5%), Yellow (85-95%), Red (<85%)
  // For inverted (lower is better like TACOS): Green (<=105%), Yellow (105-115%), Red (>115%)
  let color: string;
  let bgColor: string;
  let textColor: string;

  if (invertColor) {
    if (pct <= 105) { color = "from-emerald-500 to-emerald-400"; bgColor = "bg-emerald-500/10"; textColor = "text-emerald-400"; }
    else if (pct <= 115) { color = "from-amber-500 to-amber-400"; bgColor = "bg-amber-500/10"; textColor = "text-amber-400"; }
    else { color = "from-red-500 to-red-400"; bgColor = "bg-red-500/10"; textColor = "text-red-400"; }
  } else {
    if (pct >= 95) { color = "from-emerald-500 to-emerald-400"; bgColor = "bg-emerald-500/10"; textColor = "text-emerald-400"; }
    else if (pct >= 85) { color = "from-amber-500 to-amber-400"; bgColor = "bg-amber-500/10"; textColor = "text-amber-400"; }
    else { color = "from-red-500 to-red-400"; bgColor = "bg-red-500/10"; textColor = "text-red-400"; }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-bold tabular-nums", textColor)}>
            {formatValue(current, format)}
          </span>
          <span className="text-xs text-slate-600">/</span>
          <span className="text-xs text-slate-500 tabular-nums">
            {formatValue(target, format)}
          </span>
        </div>
      </div>
      <div className="h-2.5 rounded-full bg-white/[0.04] overflow-hidden">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-700", color)}
          style={{ width: `${cappedPct}%` }}
        />
      </div>
      <div className="flex justify-between">
        <span className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded", bgColor, textColor)}>
          {Math.round(pct)}% of target
        </span>
      </div>
    </div>
  );
}
