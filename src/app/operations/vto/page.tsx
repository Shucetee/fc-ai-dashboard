"use client";

import { vto, rocks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Eye, Target, Rocket, Mountain, AlertCircle, Star, Crosshair } from "lucide-react";

export default function VTOPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Vision/Traction Organizer</h2>
        <p className="text-xs text-slate-500 mt-1">Full Circle Agency — Strategic roadmap and traction</p>
      </div>

      {/* Core Values & Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Core Values</h3>
          </div>
          <div className="space-y-2">
            {vto.coreValues.map((v, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02]">
                <span className="w-6 h-6 rounded-md bg-violet-500/10 text-violet-400 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-300">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Crosshair className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Core Focus</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Purpose / Cause / Passion</div>
              <p className="text-sm text-slate-300">{vto.coreFocus.purpose}</p>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Our Niche</div>
              <p className="text-sm text-slate-300">{vto.coreFocus.niche}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {/* 10 Year */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-violet-400">10-Year Target</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{vto.tenYearTarget}</p>
          </div>

          {/* 3 Year */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-blue-400">3-Year Picture</h3>
            </div>
            <div className="space-y-3">
              <MetricPill label="Revenue" value={vto.threeYearPicture.revenue} />
              <MetricPill label="Profit" value={vto.threeYearPicture.profit} />
              <MetricPill label="Brands" value={vto.threeYearPicture.brands} />
              <MetricPill label="Operations" value={vto.threeYearPicture.team} />
              <div className="mt-3 space-y-1.5">
                {vto.threeYearPicture.measurables.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 1 Year */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-semibold text-emerald-400">1-Year Plan</h3>
            </div>
            <div className="space-y-3">
              <MetricPill label="Revenue" value={vto.oneYearPlan.revenue} />
              <MetricPill label="Profit" value={vto.oneYearPlan.profit} />
              <MetricPill label="Brands" value={vto.oneYearPlan.brands} />
              <div className="mt-3 space-y-1.5">
                {vto.oneYearPlan.measurables.map((m, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Rocks & Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mountain className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white">Q2 2026 Rocks</h3>
          </div>
          <div className="space-y-2">
            {rocks.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02]">
                <span className="text-sm text-slate-300">{r.title}</span>
                <span className={cn(
                  "text-[10px] font-medium px-2 py-0.5 rounded-md",
                  r.status === "on-track" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                )}>
                  {r.status === "on-track" ? "On Track" : "At Risk"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Open Issues</h3>
          </div>
          <div className="space-y-2">
            {vto.issuesList.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-white/[0.02]">
                <span className="w-5 h-5 rounded bg-red-500/10 text-red-400 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-xs text-slate-400">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
