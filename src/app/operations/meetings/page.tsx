"use client";

import { meetings } from "@/lib/mock-data";
import { Calendar, Users, CheckCircle2, Circle, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MeetingsPage() {
  const [selected, setSelected] = useState(meetings[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
      {/* Meeting List */}
      <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white">Recent Meetings</h2>
        </div>
        <div className="divide-y divide-white/[0.03]">
          {meetings.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m)}
              className={cn(
                "w-full text-left px-4 py-3 transition-colors",
                selected.id === m.id
                  ? "bg-violet-500/10 border-l-2 border-violet-500"
                  : "hover:bg-white/[0.02] border-l-2 border-transparent"
              )}
            >
              <div className="text-sm font-medium text-white">{m.title}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3 h-3" />
                  {m.date}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Users className="w-3 h-3" />
                  {m.attendees.length}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Meeting Detail */}
      <div className="space-y-4">
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <h2 className="text-lg font-semibold text-white">{selected.title}</h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {selected.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              {selected.attendees.join(", ")}
            </span>
          </div>
        </div>

        {/* Minutes */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Meeting Notes</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{selected.minutes}</p>
        </div>

        {/* Action Items */}
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Action Items</h3>
          <div className="space-y-3">
            {selected.actionItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02]">
                {item.status === "done" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <span className="text-sm text-slate-300">{item.task}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500">Owner: {item.owner}</span>
                    <span
                      className={cn(
                        "text-[10px] font-medium px-1.5 py-0.5 rounded",
                        item.status === "done"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      )}
                    >
                      {item.status === "done" ? "Done" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
