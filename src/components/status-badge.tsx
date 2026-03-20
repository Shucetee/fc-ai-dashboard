import { cn } from "@/lib/utils";
import type { Status } from "@/lib/mock-data";

const config: Record<Status, { bg: string; text: string; dot: string; label: string }> = {
  "on-track": { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400", label: "On Track" },
  "at-risk": { bg: "bg-amber-500/10", text: "text-amber-400", dot: "bg-amber-400", label: "At Risk" },
  "off-track": { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400", label: "Off Track" },
};

export function StatusBadge({ status, compact }: { status: Status; compact?: boolean }) {
  const c = config[status];
  if (compact) {
    return (
      <span className={cn("inline-flex items-center justify-center w-2.5 h-2.5 rounded-full", c.dot)} title={c.label} />
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium", c.bg, c.text)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}

export function HealthScore({ score }: { score: number }) {
  const color =
    score >= 80 ? "text-emerald-400" : score >= 60 ? "text-amber-400" : "text-red-400";
  const bg =
    score >= 80 ? "bg-emerald-500/10" : score >= 60 ? "bg-amber-500/10" : "bg-red-500/10";
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums", bg, color)}>
      {score}
    </span>
  );
}
