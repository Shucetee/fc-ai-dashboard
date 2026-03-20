"use client";

import { use } from "react";
import Link from "next/link";
import { brands } from "@/lib/mock-data";
import { TargetBar } from "@/components/target-bar";
import { StatusBadge, HealthScore } from "@/components/status-badge";
import { ArrowLeft, User, FileText, CheckCircle2, Circle, DollarSign } from "lucide-react";

export default function BrandDetailClient({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: brandSlug } = use(params);
  const brand = brands.find((b) => b.id === brandSlug);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Brand Not Found</h1>
          <Link href="/portfolio" className="text-violet-400 hover:underline text-sm">Back to Portfolio</Link>
        </div>
      </div>
    );
  }

  const checklistDone = brand.dailyChecklist.filter((c) => c.done).length;

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/[0.06] bg-[#0a0f1a]/50">
        <div className="px-8 py-6">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />Back to Portfolio
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{brand.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <StatusBadge status={brand.supplyChainStatus} />
                <StatusBadge status={brand.ppcStatus} />
                <StatusBadge status={brand.scOpsStatus} />
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500 mb-1">Health Score</div>
              <div className="text-4xl font-bold tabular-nums" style={{
                color: brand.healthScore >= 80 ? "#10b981" : brand.healthScore >= 60 ? "#f59e0b" : "#ef4444"
              }}>{brand.healthScore}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6 space-y-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Performance vs Targets</h2>
            <TargetBar label="Revenue" current={brand.revenue} target={brand.revenueTarget} format="currency" />
            <TargetBar label="Ad Spend" current={brand.spend} target={brand.spendTarget} format="currency" />
            <TargetBar label="TACOS" current={brand.tacos} target={brand.tacosTarget} format="percent" invertColor />
            <TargetBar label="Contribution $" current={brand.contributionDollar} target={brand.contributionTarget} format="currency" />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Team Assignment</h2>
              <div className="space-y-3">
                <InfoRow icon={User} label="KAM" value={brand.kam} />
                <InfoRow icon={User} label="CSM" value={brand.csm} />
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
              <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Contract Details</h2>
              <div className="space-y-3">
                <InfoRow icon={FileText} label="Fee Type" value={brand.feeType.charAt(0).toUpperCase() + brand.feeType.slice(1)} />
                <InfoRow icon={DollarSign} label="Base MRR" value={`$${brand.baseMRR.toLocaleString()}`} />
                {brand.revSharePct > 0 && <InfoRow icon={DollarSign} label="Rev Share" value={`${brand.revSharePct}%`} />}
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">AOC Daily Checklist</h2>
                <span className="text-xs font-medium text-slate-500">{checklistDone}/{brand.dailyChecklist.length} complete</span>
              </div>
              <div className="space-y-2">
                {brand.dailyChecklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <Circle className="w-4 h-4 text-slate-600 shrink-0" />}
                    <span className={`text-sm ${item.done ? "text-slate-400" : "text-slate-500"}`}>{item.task}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all" style={{ width: `${(checklistDone / brand.dailyChecklist.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Department Status</h2>
          <div className="grid grid-cols-3 gap-4">
            <DeptCard label="Supply Chain" status={brand.supplyChainStatus} />
            <DeptCard label="PPC / Advertising" status={brand.ppcStatus} />
            <DeptCard label="SC Ops" status={brand.scOpsStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-slate-500"><Icon className="w-4 h-4" />{label}</div>
      <span className="text-sm font-medium text-slate-300">{value}</span>
    </div>
  );
}

function DeptCard({ label, status }: { label: string; status: "on-track" | "at-risk" | "off-track" }) {
  const colors = { "on-track": "border-emerald-500/20 bg-emerald-500/5", "at-risk": "border-amber-500/20 bg-amber-500/5", "off-track": "border-red-500/20 bg-red-500/5" };
  return (
    <div className={`rounded-lg border p-4 ${colors[status]}`}>
      <div className="text-sm font-medium text-slate-300 mb-2">{label}</div>
      <StatusBadge status={status} />
    </div>
  );
}
