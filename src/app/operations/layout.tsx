"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  Calendar,
  BarChart3,
  Mountain,
  AlertCircle,
  CheckSquare,
  Eye,
} from "lucide-react";

const tabs = [
  { label: "Accountability", href: "/operations/accountability", icon: Users },
  { label: "Meetings", href: "/operations/meetings", icon: Calendar },
  { label: "Scorecard", href: "/operations/scorecard", icon: BarChart3 },
  { label: "Rocks", href: "/operations/rocks", icon: Mountain },
  { label: "Issues", href: "/operations/issues", icon: AlertCircle },
  { label: "To-Dos", href: "/operations/todos", icon: CheckSquare },
  { label: "VTO", href: "/operations/vto", icon: Eye },
];

export default function OperationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0a0f1a]/50">
        <div className="px-8 pt-6 pb-0">
          <h1 className="text-2xl font-bold text-white">Operations</h1>
          <p className="text-sm text-slate-500 mt-1 mb-4">
            COO Operations View — Team management, accountability, and traction
          </p>

          {/* Tab Navigation */}
          <div className="flex gap-1 overflow-x-auto pb-px">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap",
                    isActive
                      ? "bg-[#0f172a] text-white border-t border-x border-white/[0.06]"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">{children}</div>
    </div>
  );
}
