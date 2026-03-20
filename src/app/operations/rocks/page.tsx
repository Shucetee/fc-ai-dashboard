"use client";

import { rocks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Mountain, Calendar, User, ChevronRight } from "lucide-react";

export default function RocksPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-white">Q2 2026 Rocks</h2>
        <p className="text-xs text-slate-500 mt-1">Quarterly priorities and project tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {rocks.map((rock) => {
          const statusColors = {
            "on-track": { border: "border-emerald-500/20", badge: "bg-emerald-500/10 text-emerald-400", bar: "from-emerald-500 to-emerald-400" },
            "off-track": { border: "border-red-500/20", badge: "bg-red-500/10 text-red-400", bar: "from-red-500 to-red-400" },
            "complete": { border: "border-blue-500/20", badge: "bg-blue-500/10 text-blue-400", bar: "from-blue-500 to-blue-400" },
            "at-risk": { border: "border-amber-500/20", badge: "bg-amber-500/10 text-amber-400", bar: "from-amber-500 to-amber-400" },
          };
          const s = statusColors[rock.status] || statusColors["on-track"];

          return (
            <div
              key={rock.id}
              className={cn("rounded-xl border bg-[#0f172a] overflow-hidden", s.border)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                      <Mountain className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{rock.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <User className="w-3 h-3" />
                          {rock.owner}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="w-3 h-3" />
                          {rock.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={cn("text-[10px] font-medium px-2 py-1 rounded-md", s.badge)}>
                    {rock.status === "on-track" ? "On Track" : rock.status === "off-track" ? "Off Track" : rock.status === "at-risk" ? "At Risk" : "Complete"}
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-500">Progress</span>
                    <span className="text-xs font-medium text-slate-400">{rock.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                    <div
                      className={cn("h-full rounded-full bg-gradient-to-r transition-all", s.bar)}
                      style={{ width: `${rock.progress}%` }}
                    />
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects</div>
                  {rock.projects.map((p, i) => {
                    const pColors: Record<string, string> = {
                      "On Track": "text-emerald-400",
                      "In Progress": "text-amber-400",
                      "Not Started": "text-slate-500",
                      "Complete": "text-blue-400",
                    };
                    return (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02]">
                        <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-slate-300 truncate">{p.name}</div>
                          <div className="text-[10px] text-slate-500">
                            {p.owner} &middot; {p.deadline}
                          </div>
                        </div>
                        <span className={cn("text-[10px] font-medium", pColors[p.status] || "text-slate-500")}>
                          {p.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
