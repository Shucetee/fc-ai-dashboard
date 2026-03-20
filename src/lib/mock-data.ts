// ============================================================
// FC AI Operations Hub — Mock Data
// ============================================================

export type Status = "on-track" | "at-risk" | "off-track";

export interface Brand {
  id: string;
  name: string;
  kam: string;
  csm: string;
  supplyChainStatus: Status;
  ppcStatus: Status;
  scOpsStatus: Status;
  healthScore: number;
  mrr: number;
  revenue: number;
  revenueTarget: number;
  spend: number;
  spendTarget: number;
  tacos: number;
  tacosTarget: number;
  contributionDollar: number;
  contributionTarget: number;
  feeType: "flat" | "rev-share" | "hybrid";
  baseMRR: number;
  revSharePct: number;
  dailyChecklist: { task: string; done: boolean }[];
}

export interface KAM {
  name: string;
  brands: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  responsibilities: string[];
  isAI?: boolean;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  actionItems: { task: string; owner: string; status: "done" | "pending" }[];
  minutes: string;
}

export interface ScorecardMetric {
  metric: string;
  owner: string;
  goal: string;
  weeks: { value: string; status: Status }[];
}

export interface Rock {
  id: string;
  title: string;
  owner: string;
  deadline: string;
  status: "on-track" | "off-track" | "complete" | "at-risk";
  projects: { name: string; owner: string; deadline: string; status: string }[];
  progress: number;
}

export interface Issue {
  id: string;
  description: string;
  priority: "high" | "medium" | "low";
  rock?: string;
  ideas: string[];
  resolution?: string;
  status: "open" | "resolved";
}

export interface Todo {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: "done" | "not-done";
  issueId?: string;
}

// ---------- KAMs ----------
export const kams: KAM[] = [
  { name: "Diptak Das", brands: ["theory11", "Carina Organics", "BK Beauty", "MioTetto", "City Beauty", "Epic Gardening", "Locsanity", "MyImmunity", "NeuroMD", "Beardbrand", "Coushy", "Pelsbarn", "Ravie Beauty", "Zorali"] },
  { name: "Jim Miller", brands: ["Bumpsuit", "GET Supplements", "The Plug Drink", "Naturealm", "Flux Footwear", "In My Jammers", "Alpha Lion", "Legion Athletics", "Allegiance Flag", "Clutch", "Oculus Publishers"] },
  { name: "Evan Swanson", brands: ["Brush On Block", "LEVL", "TheraPet MD", "Inspired Nutra", "WellNature", "Meat Artisan", "Black Forest LLC", "Headbanger Lures", "Miles Lubricants", "Lure Essentials"] },
  { name: "Fanindra Chaubey", brands: ["Seat Cover Solutions"] },
  { name: "Rishi Phadke", brands: ["GOAT Foods", "Hally Hair", "Lonely Planet", "Game", "Swimline"] },
  { name: "Angie Raja", brands: ["Portland Bee Balm", "HiRelief", "Omnilux"] },
];

// ---------- CSMs ----------
export const csms = [
  "Amin Punjani", "Anirudh Jain", "Hassan Ahmad", "Irfan Ullah",
  "Pooja Nandal", "Ahmed Galal Foad", "Sumaya Wasim",
  "Syed Salman Ali", "Uswa Najam", "Tayyab Shafiq",
];

// ---------- Helper to generate a brand ----------
function pickStatus(weights: [number, number, number]): Status {
  const r = Math.random() * 100;
  if (r < weights[0]) return "on-track";
  if (r < weights[0] + weights[1]) return "at-risk";
  return "off-track";
}

function slug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function makeBrand(name: string, kam: string, csmIndex: number, seed: number): Brand {
  const healthBase = 55 + (seed * 7) % 40;
  const mrr = 2500 + (seed * 1337) % 8500;
  const revenueTarget = 30000 + (seed * 2719) % 120000;
  const revenue = revenueTarget * (0.78 + (seed * 31 % 30) / 100);
  const spendTarget = 8000 + (seed * 1123) % 25000;
  const spend = spendTarget * (0.85 + (seed * 17 % 20) / 100);
  const tacosTarget = 15 + (seed * 3) % 15;
  const tacos = tacosTarget * (0.9 + (seed * 13 % 25) / 100);
  const contributionTarget = 10000 + (seed * 1847) % 40000;
  const contributionDollar = contributionTarget * (0.80 + (seed * 23 % 25) / 100);

  return {
    id: slug(name),
    name,
    kam,
    csm: csms[csmIndex % csms.length],
    supplyChainStatus: pickStatus([65, 25, 10]),
    ppcStatus: pickStatus([50, 35, 15]),
    scOpsStatus: pickStatus([70, 22, 8]),
    healthScore: Math.min(100, Math.max(20, healthBase)),
    mrr,
    revenue: Math.round(revenue),
    revenueTarget,
    spend: Math.round(spend),
    spendTarget,
    tacos: Math.round(tacos * 10) / 10,
    tacosTarget,
    contributionDollar: Math.round(contributionDollar),
    contributionTarget,
    feeType: seed % 3 === 0 ? "flat" : seed % 3 === 1 ? "rev-share" : "hybrid",
    baseMRR: mrr,
    revSharePct: seed % 3 === 1 ? 3 + (seed % 5) : seed % 3 === 2 ? 2 + (seed % 3) : 0,
    dailyChecklist: [
      { task: "Check listing health", done: seed % 2 === 0 },
      { task: "Review ad performance", done: seed % 3 !== 0 },
      { task: "Monitor inventory levels", done: seed % 4 !== 3 },
      { task: "Respond to customer cases", done: true },
      { task: "Update pricing strategy", done: seed % 5 < 3 },
    ],
  };
}

// ---------- Build all brands ----------
let brandSeed = 0;
const allBrandNames: { name: string; kam: string }[] = [];
kams.forEach((k) => {
  k.brands.forEach((b) => {
    allBrandNames.push({ name: b, kam: k.name });
  });
});

// Deterministic seeded statuses for consistent demo
const staticStatuses: Record<string, Partial<Brand>> = {
  "theory11": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 92 },
  "BK Beauty": { supplyChainStatus: "on-track", ppcStatus: "at-risk", scOpsStatus: "on-track", healthScore: 78 },
  "Epic Gardening": { supplyChainStatus: "at-risk", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 81 },
  "Alpha Lion": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 95 },
  "Legion Athletics": { supplyChainStatus: "on-track", ppcStatus: "at-risk", scOpsStatus: "on-track", healthScore: 84 },
  "NeuroMD": { supplyChainStatus: "off-track", ppcStatus: "at-risk", scOpsStatus: "on-track", healthScore: 52 },
  "Locsanity": { supplyChainStatus: "on-track", ppcStatus: "off-track", scOpsStatus: "at-risk", healthScore: 45 },
  "Beardbrand": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 88 },
  "Flux Footwear": { supplyChainStatus: "at-risk", ppcStatus: "at-risk", scOpsStatus: "on-track", healthScore: 61 },
  "Omnilux": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 90 },
  "GOAT Foods": { supplyChainStatus: "at-risk", ppcStatus: "on-track", scOpsStatus: "at-risk", healthScore: 58 },
  "Pelsbarn": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 87 },
  "Portland Bee Balm": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 91 },
  "City Beauty": { supplyChainStatus: "on-track", ppcStatus: "at-risk", scOpsStatus: "on-track", healthScore: 74 },
  "Bumpsuit": { supplyChainStatus: "on-track", ppcStatus: "on-track", scOpsStatus: "on-track", healthScore: 86 },
  "Hally Hair": { supplyChainStatus: "at-risk", ppcStatus: "off-track", scOpsStatus: "on-track", healthScore: 42 },
};

export const brands: Brand[] = allBrandNames.map(({ name, kam }, i) => {
  const brand = makeBrand(name, kam, i, ++brandSeed);
  const overrides = staticStatuses[name];
  if (overrides) Object.assign(brand, overrides);
  return brand;
});

// ---------- Financial ----------
export const financials = {
  totalMRR: 163000,
  activeBrands: brands.length,
  activeKAMs: kams.length,
  activeCSMs: csms.length,
  avgDealSize: 4939,
  targetNetProfit: 20,
  salaryToIncomeRatio: 72,
};

// ---------- Department DLI Aggregates ----------
export const departmentDLI = {
  supplyChain: { score: 78, label: "Supply Chain" },
  ppc: { score: 64, label: "PPC / Advertising" },
  scOps: { score: 82, label: "SC Ops" },
};

// ---------- Accountability Chart ----------
export const accountabilityChart: TeamMember[] = [
  { name: "Nick", role: "CEO / Visionary", department: "Leadership", responsibilities: ["Set vision and direction", "Key client relationships", "Strategic partnerships", "Final hiring decisions", "Culture and values"] },
  { name: "Taimoor \"Tai\" Akhtar", role: "AOO — AI Operations Officer", department: "Leadership", responsibilities: ["Operational execution", "AI transformation strategy", "Team accountability", "Process optimization", "Cross-department coordination", "EOS implementation"] },
  { name: "Usman Ali", role: "Director of SC Ops", department: "Seller Central Operations", responsibilities: ["Listing optimization", "Account health monitoring", "Case management", "Catalog management", "A+ Content & Brand Store"] },
  { name: "Jake Rutar", role: "Director of Advertising", department: "PPC / Advertising", responsibilities: ["PPC strategy & execution", "Campaign optimization", "Budget allocation", "TACOS management", "New product launches"] },
  { name: "Ameer Hamza", role: "Director of Supply Chain", department: "Supply Chain", responsibilities: ["Inventory management", "FBA shipment planning", "Demand forecasting", "OOS prevention", "Freight & logistics"] },
  { name: "Diptak Das", role: "KAM", department: "Account Management", responsibilities: ["Client strategy & growth", "Revenue target ownership", "Brand health oversight", "QBR presentations", "Upsell identification"] },
  { name: "Jim Miller", role: "KAM", department: "Account Management", responsibilities: ["Client strategy & growth", "Revenue target ownership", "Brand health oversight", "QBR presentations", "Upsell identification"] },
  { name: "Evan Swanson", role: "KAM", department: "Account Management", responsibilities: ["Client strategy & growth", "Revenue target ownership", "Brand health oversight", "QBR presentations", "Upsell identification"] },
  { name: "Fanindra Chaubey", role: "KAM", department: "Account Management", responsibilities: ["Client strategy & growth", "Revenue target ownership", "Brand health oversight"] },
  { name: "Rishi Phadke", role: "KAM", department: "Account Management", responsibilities: ["Client strategy & growth", "Revenue target ownership", "Brand health oversight"] },
  { name: "Angie Raja", role: "KAM", department: "Account Management", responsibilities: ["Client strategy & growth", "Revenue target ownership", "Brand health oversight"] },
  { name: "Qasim Karim", role: "Lead AOC", department: "AI Operations", responsibilities: ["AI agent oversight", "Quality assurance", "Process documentation", "Training & onboarding", "Escalation handling"] },
  { name: "Carina Dulay-Gregorio", role: "AOC", department: "AI Operations", responsibilities: ["AI agent monitoring", "Client communication QA", "Process improvement", "Data validation"] },
  { name: "Uswa Najam", role: "AOC / CSM", department: "AI Operations", responsibilities: ["AI agent monitoring", "Client success management", "Cross-functional support"] },
  { name: "Dominus", role: "AI Architect Agent", department: "AI Agents", responsibilities: ["System architecture", "Agent development", "Dashboard & tooling", "Automation pipelines", "Technical strategy"], isAI: true },
  { name: "AOC Agent", role: "AI Operations Agent", department: "AI Agents", responsibilities: ["Daily checklist execution", "Meeting transcription", "Data aggregation", "Alert generation", "Report automation"], isAI: true },
];

// ---------- Meetings ----------
export const meetings: Meeting[] = [
  {
    id: "m1",
    title: "L10 Weekly Meeting",
    date: "2026-03-20",
    attendees: ["Nick", "Tai", "Usman Ali", "Jake Rutar", "Ameer Hamza"],
    actionItems: [
      { task: "Review Q2 Rock progress", owner: "Tai", status: "done" },
      { task: "Update hiring pipeline for PPC", owner: "Jake Rutar", status: "pending" },
      { task: "Finalize AOC Agent rollout timeline", owner: "Tai", status: "done" },
    ],
    minutes: "Reviewed weekly scorecard — all metrics on track except PPC spend efficiency (yellow). Discussed AI transformation timeline. Nick approved Phase 1 go-live for April 1. Jake to present PPC hiring plan next week. Ameer flagged 3 brands with OOS risk — action items assigned.",
  },
  {
    id: "m2",
    title: "KAM Sync",
    date: "2026-03-19",
    attendees: ["Tai", "Diptak Das", "Jim Miller", "Evan Swanson", "Rishi Phadke", "Angie Raja"],
    actionItems: [
      { task: "Prepare QBR for Alpha Lion", owner: "Jim Miller", status: "pending" },
      { task: "Escalate NeuroMD supply issue", owner: "Diptak Das", status: "done" },
      { task: "Update brand health scores", owner: "Tai", status: "done" },
    ],
    minutes: "KAMs reported on weekly brand health. Diptak flagged NeuroMD supply chain issues — Ameer looped in. Jim preparing QBR for Alpha Lion (top performer). Rishi noted Hally Hair PPC underperformance — Jake to investigate.",
  },
  {
    id: "m3",
    title: "AI Transformation Standup",
    date: "2026-03-18",
    attendees: ["Tai", "Qasim Karim", "Carina Dulay-Gregorio", "Dominus"],
    actionItems: [
      { task: "Complete dashboard MVP", owner: "Dominus", status: "pending" },
      { task: "Test AOC Agent on 5 pilot brands", owner: "Qasim Karim", status: "pending" },
      { task: "Document escalation workflows", owner: "Carina Dulay-Gregorio", status: "done" },
    ],
    minutes: "Dashboard MVP on track for March 20. AOC Agent pilot expanding to 5 brands next week. Carina completed escalation workflow documentation. Qasim to lead QA on pilot brands.",
  },
  {
    id: "m4",
    title: "Quarterly Planning",
    date: "2026-03-14",
    attendees: ["Nick", "Tai", "Usman Ali", "Jake Rutar", "Ameer Hamza"],
    actionItems: [
      { task: "Set Q2 revenue targets", owner: "Nick", status: "done" },
      { task: "Define monitoring agent specs", owner: "Tai", status: "pending" },
      { task: "Plan SC Ops automation roadmap", owner: "Usman Ali", status: "pending" },
    ],
    minutes: "Set Q2 2026 targets: 20% net profit by June. Identified 3 Rocks for the quarter. AI Agency Transformation remains top priority. Nick wants dashboard ready for investor presentation.",
  },
];

// ---------- Scorecard ----------
function genWeeks(base: number, goal: number, variance: number): { value: string; status: Status }[] {
  return Array.from({ length: 13 }, (_, i) => {
    const val = base + (Math.sin(i * 0.8) * variance);
    const rounded = Math.round(val * 10) / 10;
    const pct = rounded / goal;
    return {
      value: String(rounded),
      status: (pct >= 0.95 ? "on-track" : pct >= 0.85 ? "at-risk" : "off-track") as Status,
    };
  });
}

export const scorecard: ScorecardMetric[] = [
  { metric: "Total MRR ($K)", owner: "Nick", goal: "$165K", weeks: genWeeks(160, 165, 5) },
  { metric: "New Deals Closed", owner: "Tai", goal: "4", weeks: genWeeks(3.5, 4, 1.5) },
  { metric: "Client NPS", owner: "Tai", goal: "75", weeks: genWeeks(72, 75, 8) },
  { metric: "Avg Health Score", owner: "Tai", goal: "80", weeks: genWeeks(76, 80, 5) },
  { metric: "PPC ROAS", owner: "Jake Rutar", goal: "4.5x", weeks: genWeeks(4.2, 4.5, 0.6) },
  { metric: "OOS Rate (%)", owner: "Ameer Hamza", goal: "<3%", weeks: genWeeks(2.8, 3, 1.2) },
  { metric: "Listing Score", owner: "Usman Ali", goal: "92", weeks: genWeeks(89, 92, 4) },
  { metric: "AI Tasks Completed", owner: "Qasim Karim", goal: "500", weeks: genWeeks(460, 500, 60) },
  { metric: "Revenue per Brand ($K)", owner: "Nick", goal: "$45K", weeks: genWeeks(42, 45, 5) },
  { metric: "Salary-to-Income (%)", owner: "Tai", goal: "<65%", weeks: genWeeks(68, 65, 6) },
];

// ---------- Rocks ----------
export const rocks: Rock[] = [
  {
    id: "r1",
    title: "AI Agency Transformation",
    owner: "Taimoor \"Tai\" Akhtar",
    deadline: "2026-06-30",
    status: "on-track",
    progress: 45,
    projects: [
      { name: "AOC Agent", owner: "Dominus", deadline: "2026-04-30", status: "On Track" },
      { name: "Agency Command Center", owner: "Dominus", deadline: "2026-04-30", status: "On Track" },
      { name: "Monitoring Agents", owner: "Dominus", deadline: "2026-05-30", status: "Not Started" },
    ],
  },
  {
    id: "r2",
    title: "Hit 20% Net Profit",
    owner: "Nick",
    deadline: "2026-06-30",
    status: "on-track",
    progress: 30,
    projects: [
      { name: "Reduce salary-to-income ratio to 60%", owner: "Tai", deadline: "2026-06-30", status: "In Progress" },
      { name: "Increase avg deal size to $5.5K", owner: "Nick", deadline: "2026-06-30", status: "In Progress" },
      { name: "Automate CSA function", owner: "Dominus", deadline: "2026-04-30", status: "On Track" },
    ],
  },
  {
    id: "r3",
    title: "Scale to 50 Active Brands",
    owner: "Nick",
    deadline: "2026-06-30",
    status: "at-risk",
    progress: 66,
    projects: [
      { name: "Hire 2 additional KAMs", owner: "Tai", deadline: "2026-05-15", status: "In Progress" },
      { name: "Onboarding automation", owner: "Dominus", deadline: "2026-05-30", status: "Not Started" },
      { name: "Sales pipeline optimization", owner: "Nick", deadline: "2026-04-30", status: "On Track" },
    ],
  },
  {
    id: "r4",
    title: "Implement EOS Fully",
    owner: "Taimoor \"Tai\" Akhtar",
    deadline: "2026-06-30",
    status: "on-track",
    progress: 55,
    projects: [
      { name: "Weekly L10 cadence", owner: "Tai", deadline: "2026-03-31", status: "Complete" },
      { name: "Accountability chart finalized", owner: "Tai", deadline: "2026-04-15", status: "In Progress" },
      { name: "VTO documented", owner: "Nick", deadline: "2026-04-30", status: "In Progress" },
    ],
  },
];

// ---------- Issues ----------
export const issues: Issue[] = [
  { id: "i1", description: "PPC spend efficiency declining across 8 brands — TACOS creeping above targets", priority: "high", rock: "Hit 20% Net Profit", ideas: ["Audit bottom 5 campaigns", "Implement automated bid rules", "Weekly PPC review cadence"], status: "open" },
  { id: "i2", description: "CSM workload imbalanced — some managing 6+ brands, others only 2", priority: "medium", rock: "Scale to 50 Active Brands", ideas: ["Redistribute brands by complexity", "Hire 2 additional CSMs", "AI-assisted task offloading"], resolution: "Redistribute by brand complexity score", status: "resolved" },
  { id: "i3", description: "OOS events increasing for supply-chain-heavy brands (3 incidents this month)", priority: "high", rock: "Hit 20% Net Profit", ideas: ["Implement 60-day inventory alerts", "Create reorder automation", "Ameer to audit all FBA inventory"], status: "open" },
  { id: "i4", description: "Meeting notes and action items not being tracked consistently", priority: "medium", rock: "Implement EOS Fully", ideas: ["AOC Agent auto-transcription", "Standardize meeting template", "Weekly accountability check"], resolution: "AOC Agent handles transcription + action item extraction", status: "resolved" },
  { id: "i5", description: "Client onboarding taking 3+ weeks — target is 5 business days", priority: "high", rock: "Scale to 50 Active Brands", ideas: ["Create onboarding checklist automation", "Pre-populate brand data from SP-API", "Assign dedicated onboarding CSM"], status: "open" },
  { id: "i6", description: "No single source of truth for brand health — data scattered across sheets", priority: "high", rock: "AI Agency Transformation", ideas: ["Build unified dashboard (this project)", "Integrate SP-API data feeds", "Daily automated health scoring"], resolution: "Agency Command Center dashboard — in progress", status: "resolved" },
];

// ---------- To-Dos ----------
export const todos: Todo[] = [
  { id: "t1", task: "Audit bottom 5 PPC campaigns and report findings", owner: "Jake Rutar", dueDate: "2026-03-27", status: "not-done", issueId: "i1" },
  { id: "t2", task: "Implement 60-day OOS alert for all brands", owner: "Ameer Hamza", dueDate: "2026-03-27", status: "not-done", issueId: "i3" },
  { id: "t3", task: "Finalize onboarding checklist template", owner: "Tai", dueDate: "2026-03-27", status: "done", issueId: "i5" },
  { id: "t4", task: "Complete AOC Agent pilot on 5 brands", owner: "Qasim Karim", dueDate: "2026-03-27", status: "not-done" },
  { id: "t5", task: "Review and approve dashboard MVP", owner: "Nick", dueDate: "2026-03-21", status: "not-done" },
  { id: "t6", task: "Prepare Q1 financial review deck", owner: "Tai", dueDate: "2026-03-25", status: "not-done" },
  { id: "t7", task: "Update accountability chart with AI roles", owner: "Tai", dueDate: "2026-03-24", status: "done" },
  { id: "t8", task: "Set up automated bid rules for top 10 brands", owner: "Jake Rutar", dueDate: "2026-03-27", status: "not-done", issueId: "i1" },
  { id: "t9", task: "Document supply chain escalation process", owner: "Ameer Hamza", dueDate: "2026-03-26", status: "done" },
  { id: "t10", task: "Review new KAM candidates", owner: "Tai", dueDate: "2026-03-27", status: "not-done" },
];

// ---------- VTO ----------
export const vto = {
  coreValues: ["Client-First Excellence", "Relentless Innovation", "Data-Driven Decisions", "Radical Transparency", "AI-Augmented Operations"],
  coreFocus: { purpose: "Empowering brands to dominate Amazon through AI-augmented full-service management", niche: "Full-service Amazon brand management for $1M-$50M brands" },
  tenYearTarget: "500 active brands managed by AI-augmented pods, $25M ARR, industry-defining AI agency model",
  threeYearPicture: {
    revenue: "$8M ARR",
    profit: "25% net margin",
    brands: "150 active brands",
    team: "80% AI-augmented operations",
    measurables: ["Industry-leading client NPS (80+)", "Fully automated daily operations", "3 AI agent types deployed", "Featured in industry publications"],
  },
  oneYearPlan: {
    revenue: "$2.5M ARR",
    profit: "20% net margin",
    brands: "50 active brands",
    measurables: ["Launch AOC Agent to production", "Reduce salary-to-income to 60%", "Hit avg deal size $5.5K", "Full EOS implementation"],
  },
  quarterlyRocks: rocks.map((r) => r.title),
  issuesList: issues.filter((i) => i.status === "open").map((i) => i.description),
};
