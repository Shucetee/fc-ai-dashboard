"use client";

import { todos } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Calendar, User, Link as LinkIcon } from "lucide-react";

export default function TodosPage() {
  const done = todos.filter((t) => t.status === "done");
  const notDone = todos.filter((t) => t.status === "not-done");
  const completionRate = Math.round((done.length / todos.length) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">7-Day To-Dos</h2>
          <p className="text-xs text-slate-500 mt-1">Action items from IDS process and weekly meetings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-2xl font-bold text-white tabular-nums">{completionRate}%</div>
            <div className="text-[10px] text-slate-500">Completion Rate</div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white/[0.06] flex items-center justify-center relative">
            <svg className="absolute inset-0 w-12 h-12 -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="3" strokeDasharray={`${completionRate * 1.256} 125.6`} />
            </svg>
            <span className="text-xs font-bold text-emerald-400">{done.length}/{todos.length}</span>
          </div>
        </div>
      </div>

      {/* Not Done */}
      <div>
        <h3 className="text-sm font-semibold text-amber-400 mb-3">Pending ({notDone.length})</h3>
        <div className="space-y-2">
          {notDone.map((todo) => (
            <TodoRow key={todo.id} todo={todo} />
          ))}
        </div>
      </div>

      {/* Done */}
      <div>
        <h3 className="text-sm font-semibold text-emerald-400 mb-3">Completed ({done.length})</h3>
        <div className="space-y-2">
          {done.map((todo) => (
            <TodoRow key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TodoRow({ todo }: { todo: typeof todos[number] }) {
  const isDone = todo.status === "done";
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-xl border bg-[#0f172a] transition-all",
      isDone ? "border-white/[0.04] opacity-60" : "border-white/[0.06]"
    )}>
      {isDone ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      ) : (
        <Circle className="w-5 h-5 text-slate-600 shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm", isDone ? "text-slate-500 line-through" : "text-slate-300")}>
          {todo.task}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <User className="w-3 h-3" />
            {todo.owner}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-500">
            <Calendar className="w-3 h-3" />
            {todo.dueDate}
          </span>
          {todo.issueId && (
            <span className="flex items-center gap-1 text-[10px] text-violet-400">
              <LinkIcon className="w-3 h-3" />
              Issue #{todo.issueId.replace("i", "")}
            </span>
          )}
        </div>
      </div>
      <span className={cn(
        "text-[10px] font-medium px-2 py-1 rounded-md",
        isDone ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
      )}>
        {isDone ? "Done" : "Not Done"}
      </span>
    </div>
  );
}
