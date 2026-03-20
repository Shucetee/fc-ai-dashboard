"use client";

import { scorecard } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function ScorecardPage() {
  // Week labels (13 weeks trailing)
  const weekLabels = Array.from({ length: 13 }, (_, i) => {
    const d = new Date(2026, 2, 20); // March 20, 2026
    d.setDate(d.getDate() - (12 - i) * 7);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Weekly Scorecard</h2>
          <p className="text-xs text-slate-500 mt-1">13-week trailing view — EOS weekly scorecard</p>
        </div>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-48 sticky left-0 bg-[#0f172a] z-10">
                  Metric
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">
                  Owner
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider w-20">
                  Goal
                </th>
                {weekLabels.map((w, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-2 py-3 text-center text-[10px] font-medium text-slate-600 w-16",
                      i === weekLabels.length - 1 && "text-violet-400 font-semibold"
                    )}
                  >
                    {w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scorecard.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-slate-300 sticky left-0 bg-[#0f172a] z-10">
                    {row.metric}
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-500">{row.owner}</td>
                  <td className="px-3 py-3 text-center text-xs font-medium text-slate-400">
                    {row.goal}
                  </td>
                  {row.weeks.map((week, wi) => {
                    const colors = {
                      "on-track": "bg-emerald-500/15 text-emerald-400",
                      "at-risk": "bg-amber-500/15 text-amber-400",
                      "off-track": "bg-red-500/15 text-red-400",
                    };
                    return (
                      <td key={wi} className="px-1 py-3 text-center">
                        <span
                          className={cn(
                            "inline-block px-2 py-1 rounded text-[11px] font-medium tabular-nums min-w-[40px]",
                            colors[week.status],
                            wi === row.weeks.length - 1 && "ring-1 ring-white/10"
                          )}
                        >
                          {week.value}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
