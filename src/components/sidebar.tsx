"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings2,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const navSections = [
  {
    label: "Portfolio Management",
    href: "/portfolio",
    icon: Briefcase,
    description: "CEO Portfolio View",
  },
  {
    label: "Operations",
    href: "/operations",
    icon: Settings2,
    description: "COO Operations View",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-white/[0.06] bg-[#0a0f1a] flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-violet-500/20 shrink-0">
          FC
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-semibold text-white text-sm tracking-tight">Full Circle</div>
            <div className="text-[11px] text-slate-500 font-medium">AI Operations Hub</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {!collapsed && (
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
            Navigation
          </div>
        )}
        {navSections.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-violet-500/10 text-violet-400 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
              )}
            >
              <span
                className={cn(
                  "shrink-0",
                  isActive ? "text-violet-400" : "text-slate-500"
                )}
              >
                <Icon className="w-5 h-5" />
              </span>
              {!collapsed && (
                <>
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className="text-[10px] text-slate-600 font-normal">
                      {item.description}
                    </span>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.04] transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="px-3 py-2 rounded-lg bg-white/[0.02]">
            <div className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
              Q2 2026 — Phase 1
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              AI Agency Transformation
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
