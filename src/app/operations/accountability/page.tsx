"use client";

import { accountabilityChart } from "@/lib/mock-data";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccountabilityPage() {
  const departments = [
    { label: "Leadership", members: accountabilityChart.filter((m) => m.department === "Leadership") },
    { label: "Account Management", members: accountabilityChart.filter((m) => m.department === "Account Management") },
    { label: "AI Operations", members: accountabilityChart.filter((m) => m.department === "AI Operations") },
    { label: "AI Agents", members: accountabilityChart.filter((m) => m.department === "AI Agents") },
    { label: "Seller Central Operations", members: accountabilityChart.filter((m) => m.department === "Seller Central Operations") },
    { label: "PPC / Advertising", members: accountabilityChart.filter((m) => m.department === "PPC / Advertising") },
    { label: "Supply Chain", members: accountabilityChart.filter((m) => m.department === "Supply Chain") },
  ];

  return (
    <div className="space-y-8">
      {/* Org tree visual */}
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-white">Organizational Chart</h2>
        <p className="text-xs text-slate-500 mt-1">Humans + AI Agents working together</p>
      </div>

      {departments.map((dept) => (
        <div key={dept.label}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2">
              {dept.label}
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dept.members.map((member) => (
              <div
                key={member.name}
                className={cn(
                  "rounded-xl border p-5 transition-all hover:scale-[1.01]",
                  member.isAI
                    ? "border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] to-violet-500/[0.02]"
                    : "border-white/[0.06] bg-[#0f172a]"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      member.isAI
                        ? "bg-violet-500/20 text-violet-400"
                        : "bg-blue-500/15 text-blue-400"
                    )}
                  >
                    {member.isAI ? (
                      <Bot className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">
                        {member.name
                          .split(" ")
                          .map((w) => w[0])
                          .filter((_, i) => i < 2)
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white truncate">{member.name}</h3>
                      {member.isAI && (
                        <span className="text-[10px] font-medium text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {member.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="w-1 h-1 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
