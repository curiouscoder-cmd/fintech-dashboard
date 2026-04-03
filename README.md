# 💎 FinSight — Personal Finance Dashboard

A clean, interactive finance dashboard built with React to help users track spending, income, and financial patterns. Built as a frontend internship assignment showcasing UI design, component architecture, and state management.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)

## Features

### Dashboard Overview
- Summary cards with **animated counters** showing total balance, income, and expenses
- **Balance trend** area chart tracking weekly financial trajectory
- **Spending breakdown** donut chart with category percentages
- **Recent activity** feed with relative timestamps

### Transactions
- Full transaction list with date, description, category, and amount
- **Search** with text highlighting
- **Filters** by type (income/expense), category, and date range
- **Sortable** columns (date, amount) with ascending/descending toggle
- **Export** to CSV or JSON
- Category-colored badges with dot indicators

### Role-Based UI
- **Admin** role: add, edit, and delete transactions
- **Viewer** role: read-only access (action buttons hidden)
- Role switcher in the header, persisted across sessions

### Insights
- Key metrics: highest/lowest spending, savings rate, average expense
- **Monthly comparison** bar chart (income vs expenses)
- **Financial health score** with animated progress ring
- Category breakdown with percentage bars

### Additional Features
- 🌗 **Dark mode** with smooth transitions
- 💾 **Data persistence** via localStorage
- 📤 **Export** transactions as CSV or JSON
- ⌨️ **Keyboard shortcuts** (1/2/3 for tabs, D for dark mode)
- 🎯 **Animated transitions** between pages
- 📱 **Fully responsive** — mobile bottom nav, adaptive layouts
- 🗑️ **Delete confirmation** dialog
- 🔔 **Toast notifications** for user feedback
- 🫙 **Empty states** with actionable CTAs

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI library |
| Vite 8 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Recharts | Data visualization |
| Framer Motion | Animations & transitions |
| Lucide React | Icon system |
| Context + useReducer | State management |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/fintech-dashboard.git
cd fintech-dashboard
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI primitives
│   │   ├── FrostCard.jsx      # Glassmorphism card wrapper
│   │   ├── StatPill.jsx       # Percentage change indicator
│   │   ├── NavItem.jsx        # Sidebar navigation button
│   │   ├── EmptyState.jsx     # No-data placeholder
│   │   ├── ConfirmDialog.jsx  # Destructive action confirmation
│   │   ├── Skeleton.jsx       # Loading state placeholders
│   │   └── AnimatedCurrency.jsx # Smooth number transitions
│   ├── Dashboard.jsx          # Main layout shell
│   ├── Header.jsx             # Top bar with role/theme controls
│   ├── Sidebar.jsx            # Desktop navigation
│   ├── MobileNav.jsx          # Mobile bottom navigation
│   ├── Overview.jsx           # Summary cards + charts
│   ├── BalanceTrendChart.jsx   # Weekly balance area chart
│   ├── SpendingBreakdown.jsx   # Category donut chart
│   ├── RecentTransactions.jsx  # Latest activity feed
│   ├── Transactions.jsx       # Transaction table with filters
│   ├── TransactionModal.jsx   # Add/edit transaction form
│   ├── Insights.jsx           # Analytics page
│   └── HealthScore.jsx        # Financial health ring
├── context/
│   ├── AppContext.jsx         # Global state (useReducer)
│   └── ToastContext.jsx       # Notification system
├── hooks/
│   ├── useLocalStorage.js     # Persistent state hook
│   ├── useChartTheme.js       # Dark mode chart colors
│   ├── useAnimatedNumber.js   # Smooth number transitions
│   └── useKeyboardShortcuts.js # Keyboard navigation
├── data/
│   └── mockData.js            # 40 transactions + chart data
├── lib/
│   ├── utils.js               # Class name utilities
│   └── export.js              # CSV/JSON export helpers
├── App.jsx                    # Root component
├── main.jsx                   # Entry point
└── index.css                  # Global styles + Tailwind
```

## Design Decisions

**Glassmorphism (Frost Design)**
Built a custom frost/glass design system with translucent cards, backdrop blur, and mesh gradient backgrounds. The three animated blobs create a living, breathing feel that elevates the dashboard beyond typical flat designs.

**State Architecture**
Used Context + useReducer over Redux/Zustand because the app state is simple enough that it doesn't warrant external dependencies. The reducer pattern still gives Redux-like action dispatching and immutable updates. All action creators are memoized with useCallback.

**Dark Mode Strategy**
Controlled via Tailwind's `dark:` class variant with a toggle on the HTML root element. Chart colors adapt through a custom `useChartTheme` hook that provides theme-aware values to Recharts components.

**Data Persistence**
Only the essential state (transactions, preferences, role) is persisted to localStorage. Transient UI state like filters and active tab resets on refresh — this is intentional for a clean UX.

**Animation Philosophy**
Framer Motion handles page transitions, modal entrances, and list staggering. The animated currency counters use requestAnimationFrame for smooth 60fps number rolling. Animations are subtle and purposeful — they guide attention, not distract.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1` | Switch to Overview |
| `2` | Switch to Transactions |
| `3` | Switch to Insights |
| `D` | Toggle dark mode |

## License

MIT
