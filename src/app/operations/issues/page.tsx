"use client";

import { issues } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Lightbulb, ArrowRight } from "lucide-react";

export default function IssuesPage() {
  const openIssues = issues.filter((i) => i.status === "open");
  const resolvedIssues = issues.filter((i) => i.status === "resolved");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Issues (IDS Process)</h2>
        <p className="text-xs text-slate-500 mt-1">
          Identify, Discuss, Solve — 3 ideas submitted, discussion, vote, 7-day to-dos
        </p>
      </div>

      {/* Open Issues */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-amber-400">Open Issues ({openIssues.length})</h3>
        </div>
        <div className="space-y-3">
          {openIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

      {/* Resolved */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-emerald-400">Resolved ({resolvedIssues.length})</h3>
        </div>
        <div className="space-y-3">
          {resolvedIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: typeof issues[number] }) {
  const priorityColors = {
    high: "bg-red-500/10 text-red-400 border-red-500/20",
    medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <div className={cn(
      "rounded-xl border bg-[#0f172a] p-5",
      issue.status === "resolved" ? "border-white/[0.04] opacity-70" : "border-white/[0.06]"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-slate-300">{issue.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-md border", priorityColors[issue.priority])}>
              {issue.priority.toUpperCase()}
            </span>
            {issue.rock && (
              <span className="text-[10px] text-slate-500">
                Rock: {issue.rock}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ideas */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <Lightbulb className="w-3 h-3" />
          Ideas Submitted
        </div>
        {issue.ideas.map((idea, i) => (
          <div key={i} className="flex items-start gap-2 pl-5">
            <span className="text-xs text-slate-600 font-medium">{i + 1}.</span>
            <span className="text-xs text-slate-400">{idea}</span>
          </div>
        ))}
      </div>

      {/* Resolution */}
      {issue.resolution && (
        <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/10">
          <ArrowRight className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
          <span className="text-xs text-emerald-300">{issue.resolution}</span>
        </div>
      )}
    </div>
  );
}
