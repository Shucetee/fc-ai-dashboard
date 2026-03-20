# FC AI Operations Hub — Build Brief

## What to Build
A two-view web app for Full Circle Agency leadership. Left-hand sidebar navigation between two main views:

### View 1: CEO Portfolio View ("Portfolio Management")
The CEO's daily pulse on how the business portfolio is performing.

**Layout:**
- Left sidebar with nav: "Portfolio Management" | "Operations"
- Main content area with the portfolio dashboard

**Components:**
1. **Portfolio Summary Bar** (top)
   - Total MRR: $163,000
   - Active Brands: 33
   - Active KAMs: 6
   - Active CSMs: 9+
   - Portfolio Health (aggregate gauge)

2. **Brands Table** (main content)
   - Columns: Brand Name | KAM | CSM | Supply Chain Status | PPC Status | SC Ops Status | Health Score
   - Status indicators: 🟢 On Track | 🟡 At Risk | 🔴 Off Track (use colored dots/badges)
   - Click any brand to drill down to detail view
   - Sortable by any column

3. **Car Dashboard Gauges** (visual section above or beside table)
   - 3 department gauges: Supply Chain, PPC, Seller Central Ops
   - Each gauge shows needle position: green zone / yellow zone / red zone
   - These represent the aggregate Daily Leading Indicator (DLI) status across all brands

4. **Brand Detail Drill-Down** (when clicking a brand)
   - 4 Target Bars: Revenue vs Target, Spend vs Target, TACOS vs Target, Contribution $ vs Target
   - Color rules: Green (≥target or within -5%), Yellow (5-15% below), Red (>15% below)
   - KAM/CSM/POD assignment
   - Contract info (fee type, base MRR, rev share %)
   - Health Score breakdown (0-100)
   - Daily checklist status from AOC Agent

### View 2: COO Operations View ("Operations")
The COO/Integrator view for team and business operations management. This replaces Success.co.

**Sub-pages (tabs or sub-nav):**

1. **Accountability Chart**
   - Org chart visual showing roles
   - Each card: Role title, Person name, 3-7 bullet points of responsibilities
   - Include both humans AND AI agents
   - Key roles: CEO (Nick), AOO (Tai), Directors (Usman, Jake, Ameer), AOCs (Qasim, Carina, Uswa), KAMs, CSMs, AI Agents (Dominus, AOC Agent)

2. **Meetings**
   - Upcoming meetings list
   - Meeting history with minutes (from Google Gemini transcripts)
   - Each meeting record shows: Date, Attendees, Action Items, RACI assignments

3. **Scorecard**
   - EOS weekly scorecard
   - Key metrics tracked weekly with owner and goal
   - Green/yellow/red status per metric
   - 13-week trailing view

4. **Rocks**
   - Current quarter's Rocks
   - Each Rock: Title, Owner, Deadline, On-Track/Off-Track status
   - Projects tied to each Rock
   - Progress tracking

5. **Issues (IDS)**
   - Issues list with IDS process
   - Each issue: Description, Priority, Assigned Rock/Project
   - Resolution: 3 ideas submitted → discussion → vote → 7-day to-dos

6. **To-Dos**
   - 7-day action items from IDS process
   - Owner, due date, status (done/not done)
   - Tied to parent issue/rock

7. **VTO (Vision/Traction Organizer)**
   - Embed or display the business forecast data
   - Vision section: 10-year, 3-year, 1-year targets
   - Traction section: Current rocks, issues list, quarterly goals

## Design Requirements
- **Dark theme** — dark navy/charcoal background (#0a0e17 or similar), light text
- **Clean, modern** — think Linear, Vercel dashboard, or Orbit's UI
- **Color coding** — Green (#10b981), Yellow (#f59e0b), Red (#ef4444) for status
- **Left sidebar** — collapsible, with icons + labels
- **Responsive** — works on desktop and tablet
- **Use shadcn/ui components** — already installed in the project

## Mock Data
Use realistic mock data based on these REAL numbers:

**KAMs:**
| KAM | Brands |
|-----|--------|
| Diptak Das | theory11, Carina Organics, BK Beauty, MioTetto, City Beauty, Epic Gardening, Locsanity, MyImmunity, NeuroMD, Beardbrand, Coushy, Pelsbarn, Ravie Beauty, Zorali |
| Jim Miller | Bumpsuit, GET Supplements, The Plug Drink, Naturealm, Flux Footwear, In My Jammers, Alpha Lion, Legion Athletics, Allegiance Flag, Clutch, MioTetto, Oculus Publishers |
| Evan Swanson | Brush On Block, LEVL, TheraPet MD, Inspired Nutra, WellNature, Meat Artisan, Black Forest LLC, Headbanger Lures, Miles Lubricants, Lure Essentials |
| Fanindra Chaubey | City Beauty, Epic Gardening, Locsanity, MyImmunity, NeuroMD, Seat Cover Solutions |
| Rishi Phadke | GOAT Foods, Hally Hair, Lonely Planet, Game, Swimline, Clutch |
| Angie Raja | Portland Bee Balm, HiRelief, Omnilux |

**CSMs:** Amin Punjani, Anirudh Jain, Hassan Ahmad, Irfan Ullah, Pooja Nandal, Ahmed Galal Foad, Sumaya Wasim, Syed Salman Ali, Uswa Najam, Tayyab Shafiq

**Directors:** Usman Ali (SC Ops), Jake Rutar (Advertising/PPC), Ameer Hamza (Supply Chain), Taimoor "Tai" Akhtar (AOO — AI Operations Officer)

**AOCs (formerly CSAs):** Qasim Karim (Lead), Carina Dulay-Gregorio, Uswa Najam

**Financial:**
- Total MRR: $163,000
- Avg deal size: $4,939
- Target: 20% net profit by June 2026
- Current salary-to-income ratio: 64-86%

**Department status mock — vary these realistically:**
- Supply Chain: mostly green, some yellow (OOS risks)
- PPC: mix of green and yellow
- SC Ops: mostly green

**Rocks (Q2 2026):**
- Rock: AI Agency Transformation
  - Project 1: AOC Agent (Owner: Dominus, Deadline: Apr 30, Status: On Track)
  - Project 2: Agency Command Center (Owner: Dominus, Deadline: Apr 30, Status: On Track)  
  - Project 3: Monitoring Agents (Owner: Dominus, Deadline: May 30, Status: Not Started)

## File Structure
Use the existing Next.js app structure in `src/`. Create:
- `src/app/page.tsx` — redirect to portfolio
- `src/app/portfolio/page.tsx` — CEO Portfolio View
- `src/app/portfolio/[brand]/page.tsx` — Brand detail drill-down
- `src/app/operations/page.tsx` — COO Operations View (with tabs)
- `src/app/operations/accountability/page.tsx`
- `src/app/operations/meetings/page.tsx`
- `src/app/operations/scorecard/page.tsx`
- `src/app/operations/rocks/page.tsx`
- `src/app/operations/issues/page.tsx`
- `src/app/operations/todos/page.tsx`
- `src/app/operations/vto/page.tsx`
- `src/components/` — shared components (Sidebar, Gauge, StatusBadge, etc.)
- `src/lib/mock-data.ts` — all mock data in one file

## Tech Stack (already installed)
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- shadcn/ui components
- Lucide icons

## CRITICAL
- This is a PRESENTATION TOOL for leadership. It needs to look polished and professional.
- Use realistic data — not "Lorem ipsum" placeholder garbage.
- The gauges/needles should be CSS/SVG — no external charting libraries unless absolutely needed.
- Make it interactive — clicking brands drills down, tabs switch views, sidebar navigates.
- The app should be immediately impressive when Nick opens it.

When completely finished, run this command to notify me:
openclaw system event --text "Done: FC AI Operations Hub built — CEO Portfolio View + COO Operations View with all sub-pages, mock data, gauges, and drill-downs" --mode now
