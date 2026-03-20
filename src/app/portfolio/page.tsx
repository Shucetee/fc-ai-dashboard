"use client";

import Link from "next/link";
import { brands, financials, departmentDLI } from "@/lib/mock-data";
import { Gauge } from "@/components/gauge";
import { StatusBadge, HealthScore } from "@/components/status-badge";
import { DollarSign, Building2, Users, UserCheck, Activity, ArrowUpDown, Search } from "lucide-react";
import { useState, useMemo } from "react";

type SortKey = "name" | "kam" | "csm" | "supplyChainStatus" | "ppcStatus" | "scOpsStatus" | "healthScore";
type SortDir = "asc" | "desc";

const statusOrder = { "on-track": 0, "at-risk": 1, "off-track": 2 };

export default function PortfolioPage() {
  const [sortKey, setSortKey] = useState<SortKey>("healthScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    let filtered = brands;
    if (search) {
      const q = search.toLowerCase();
      filtered = brands.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.kam.toLowerCase().includes(q) ||
          b.csm.toLowerCase().includes(q)
      );
    }
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "kam") cmp = a.kam.localeCompare(b.kam);
      else if (sortKey === "csm") cmp = a.csm.localeCompare(b.csm);
      else if (sortKey === "healthScore") cmp = a.healthScore - b.healthScore;
      else if (sortKey === "supplyChainStatus") cmp = statusOrder[a.supplyChainStatus] - statusOrder[b.supplyChainStatus];
      else if (sortKey === "ppcStatus") cmp = statusOrder[a.ppcStatus] - statusOrder[b.ppcStatus];
      else if (sortKey === "scOpsStatus") cmp = statusOrder[a.scOpsStatus] - statusOrder[b.scOpsStatus];
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir, search]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "healthScore" ? "desc" : "asc"); }
  };

  // Aggregate health
  const avgHealth = Math.round(brands.reduce((s, b) => s + b.healthScore, 0) / brands.length);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0a0f1a]/50">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Portfolio Management</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time portfolio health across all active brands</p>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <SummaryCard icon={DollarSign} label="Total MRR" value={`$${(financials.totalMRR / 1000).toFixed(0)}K`} accent="violet" />
          <SummaryCard icon={Building2} label="Active Brands" value={String(financials.activeBrands)} accent="blue" />
          <SummaryCard icon={Users} label="Active KAMs" value={String(financials.activeKAMs)} accent="cyan" />
          <SummaryCard icon={UserCheck} label="Active CSMs" value={`${financials.activeCSMs}+`} accent="green" />
          <SummaryCard icon={Activity} label="Portfolio Health" value={String(avgHealth)} accent={avgHealth >= 70 ? "green" : avgHealth >= 50 ? "amber" : "red"} />
        </div>
      </div>

      {/* Department Gauges */}
      <div className="px-8 pb-6">
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Daily Leading Indicators (DLI)
          </h2>
          <div className="flex items-center justify-around">
            <Gauge label={departmentDLI.supplyChain.label} score={departmentDLI.supplyChain.score} />
            <Gauge label={departmentDLI.ppc.label} score={departmentDLI.ppc.score} />
            <Gauge label={departmentDLI.scOps.label} score={departmentDLI.scOps.score} />
          </div>
        </div>
      </div>

      {/* Brands Table */}
      <div className="px-8 pb-8">
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] overflow-hidden">
          {/* Table header */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">All Brands</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search brands, KAMs, CSMs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 w-72"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <SortHeader label="Brand Name" sortKey="name" current={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHeader label="KAM" sortKey="kam" current={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHeader label="CSM" sortKey="csm" current={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHeader label="Supply Chain" sortKey="supplyChainStatus" current={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHeader label="PPC" sortKey="ppcStatus" current={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHeader label="SC Ops" sortKey="scOpsStatus" current={sortKey} dir={sortDir} onSort={toggleSort} />
                  <SortHeader label="Health" sortKey="healthScore" current={sortKey} dir={sortDir} onSort={toggleSort} />
                </tr>
              </thead>
              <tbody>
                {sorted.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-3">
                      <Link
                        href={`/portfolio/${brand.id}`}
                        className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors"
                      >
                        {brand.name}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-400">{brand.kam}</td>
                    <td className="px-6 py-3 text-sm text-slate-400">{brand.csm}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={brand.supplyChainStatus} />
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={brand.ppcStatus} />
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={brand.scOpsStatus} />
                    </td>
                    <td className="px-6 py-3">
                      <HealthScore score={brand.healthScore} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/[0.06] text-xs text-slate-500">
            Showing {sorted.length} of {brands.length} brands
          </div>
        </div>
      </div>
    </div>
  );
}

// -- Summary Card --
function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent: string;
}) {
  const colors: Record<string, string> = {
    violet: "from-violet-500/15 to-violet-500/5 text-violet-400 border-violet-500/20",
    blue: "from-blue-500/15 to-blue-500/5 text-blue-400 border-blue-500/20",
    cyan: "from-cyan-500/15 to-cyan-500/5 text-cyan-400 border-cyan-500/20",
    green: "from-emerald-500/15 to-emerald-500/5 text-emerald-400 border-emerald-500/20",
    amber: "from-amber-500/15 to-amber-500/5 text-amber-400 border-amber-500/20",
    red: "from-red-500/15 to-red-500/5 text-red-400 border-red-500/20",
  };
  const c = colors[accent] || colors.violet;
  return (
    <div className={`rounded-xl border bg-gradient-to-br p-4 ${c}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 opacity-60" />
        <span className="text-xs font-medium opacity-70">{label}</span>
      </div>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

// -- Sort Header --
function SortHeader({
  label,
  sortKey: key,
  current,
  dir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (k: SortKey) => void;
}) {
  const isActive = current === key;
  return (
    <th className="px-6 py-3 text-left">
      <button
        onClick={() => onSort(key)}
        className="flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-300 transition-colors"
      >
        {label}
        <ArrowUpDown className={`w-3 h-3 ${isActive ? "text-violet-400" : "opacity-30"}`} />
      </button>
    </th>
  );
}
