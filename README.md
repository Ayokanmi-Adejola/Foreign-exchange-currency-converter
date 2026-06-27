<div align="center">

# 💱 Foreign Exchange Currency Converter

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![styled-components](https://img.shields.io/badge/styled--components-6-db7093)
![SWR](https://img.shields.io/badge/SWR-2.4-000000)
![Recharts](https://img.shields.io/badge/Recharts-3.8-8884d1)

### Currency conversion • live rates • historical analytics

*A cinematic dark-mode currency toolkit built for traders, travelers, and teams, powered by Frankfurter.dev ECB data.*

<img width="1440" height="1037" alt="image" src="https://github.com/user-attachments/assets/fa7936eb-e479-4bf3-a812-f6e6e1149e86" />


## The Problem

Currency conversion tools today are either buried behind paywalls, force you through five clicks just to compare three currencies, or feel like they were designed in 2004. Travelers lose money on hidden spreads. Developers waste hours wiring together scattered APIs. Analysts need crisp historical context but get clunky spreadsheets.

## Features

<table>
<tr>
<td width="50%" valign="top">

### 🔄 Live Converter
- <strong>55+ fiat currencies</strong> with real-time rates
- Auto-refresh every 60 seconds
- Instant copy-to-clipboard result
- Curated <em>Popular</em> currency quick-access

</td>
<td width="50%" valign="top">

### 📊 Historical Charts
- <strong>Recharts AreaChart</strong> with gradient fills
- Timeframes: <code>1d</code> • <code>1w</code> • <code>1m</code> • <code>3m</code> • <code>1y</code> • <code>5y</code>
- <strong>OHLC stats:</strong> Open, Last, Change, % Change
- Color-coded market sentiment (green ↑ / red ↓)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🌍 Multi-Currency Compare
- <strong>15-currency snapshot</strong> in a single view
- Pinned conversion row preserved in favorites
- Tap any row to instantly load into the main converter

</td>
<td width="50%" valign="top">

### ⭐ Favorites & Log
- <strong>Pin any currency pair</strong> for one-tap reload
- Persistent <strong>conversion history log</strong> (localStorage)
- Relative timestamps: <em>"2 minutes ago"</em>
- 50-entry capped, zero-dependency storage

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📽️ Live Ticker
- Infinite-scrolling market marquee
- 8 major pair rates
- Pause-on-hover interaction
- Simulated live change percentages

</td>
<td width="50%" valign="top">

### 🌗 Theme & UX
- <strong>Dark / Light toggle</strong> with persistence
- Custom <strong>JetBrains Mono</strong> typeface
- CSS-custom-property design tokens
- Fully <strong>keyboard-accessible</strong> dialogs & tabs

</td>
</tr>
</table>

</div>

---

## 🏗️ Demo

| Screen | Description |
|--------|-------------|
| Converter | Real-time amount input with swap animation |
| History | 5-year rate trajectory with value markers |
| Compare | 15-currency grid with live ticker below |
| Favorites | Starred pairs with 24h simulated delta |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Framework** | Next.js 16 | App Router, SSR, edge-ready |
| **Library** | React 19 | Concurrent features, streaming |
| **Language** | TypeScript 5 | Type-safe API responses |
| **Styling** | styled-components 6 | CSS-in-JS, dynamic themes |
| **Data Fetching** | SWR 2.4 | Caching, revalidation, dedup |
| **Charting** | Recharts 3.8 | SVG-based, declarative |
| **Dates** | date-fns 4.4 | Tree-shakeable formatting |
| **Linting** | Biome 2.4 | Fast, unified linter/formatter |
| **API** | Frankfurter.dev v2 | ECB-backed, free, no auth |

---

## 🏛️ Architecture

```
src/
├── app/                  # Next.js App Router (layout + page)
├── constants/            # API endpoints & currency metadata
├── hooks/
│   ├── Context/          # Global React Context (favorites, theme, log)
│   ├── useCurrencies.ts  # SWR fetch for ISO code list
│   ├── useExchangeRate.ts      # Single-pair rate (60s refresh)
│   ├── useLatestRates.ts       # Bulk rates for base currency
│   ├── useRateHistory.ts       # Historical range for chart
│   └── useLocalStorage.ts      # SSR-safe hydration wrapper
├── layouts/              # Presentation components (one per feature)
│   ├── Converter/
│   ├── History/
│   ├── Compare/
│   ├── Favorites/
│   ├── Log/
│   ├── CurrencyPicker/
│   ├── Header/ + Ticker/
│   └── Tabs/
├── lib/
│   └── registry.tsx      # styled-components SSR registry
└── styles/
    ├── colors.ts         # Design tokens (dark/light palettes)
    ├── global.ts         # CSS variables, font-face, resets
    └── index.ts
```

### Data Flow

```
API (Frankfurter)
    ↓ SWR Hooks (cache + polling)
React Context (global state)
    ↓ props / hooks
Layout Components (UI)
    ↓ events / callbacks
Context Actions (update state → localStorage)
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Ayokanmi-Adejola/Foreign-exchange-currency-converter
cd Foreign-exchange-currency-converter

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build && npm start
```

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on `http://localhost:3000` |
| `npm run build` | Type-check + production build |
| `npm run start` | Serve production build |
| `npm run lint` | Biome lint check |
| `npm run format` | Biome format check |

### Environment Variables

No secrets required. The app uses the public Frankfurter.dev API — no token, no rate-limit headaches.

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#161618` | App background (dark) |
| `--surface` | `#232327` | Card backgrounds |
| `--elevated` | `#2f2f34` | Hover / input fields |
| `--accent` | `#c9f000` | Brand color, active states |
| `--positive` | `#22c55e` | Gain indicators |
| `--negative` | `#ef4444` | Loss indicators |
| `--text-primary` | `#ffffff` | Body text |
| `--text-muted` | `#a1a1aa` | Secondary text |

Full light theme palettes are available via the theme toggle.

---

## ♿ Accessibility

- **WAI-ARIA** roles: `tablist`, `tabpanel`, `dialog`, `listbox`, `option`
- **Keyboard navigation:** Arrow keys, Enter, Escape across all interactive elements
- **Focus management:** Visible focus rings using `--accent`
- **Screen reader announcements:** `aria-live` regions for rate updates
- **Semantic HTML:** Button elements, proper heading hierarchy

---

## 🔮 What Makes This Stand Out

**Not just another converter.** Judge this by the gaps it fills:

1. **Multi-Currency Snapshot** — Compare 15 currencies side-by-side. Traditional converters force sequential conversions; this gives portfolio-level context in one glance.

2. **Context-Rich Data** — Not just a number. Historical canvas + OHLC stats treat the app like a financial terminal, not a calculator.

3. **Full-Stack UX in a Frontend** — Favorites, logs, tabs, theme — all persisted client-side. Feels like a native app with zero backend dependency.

4. **Free Data, Zero Lock-In** — Frankfurter.dev is ECB-backed, free forever, and CORS-friendly. No API keys, no hidden costs, no uptime anxiety.

5. **Production Quality** — Biome linting, TypeScript strict mode, SSR-safe hooks, responsive CSS custom-property architecture. This is demo-ready code.

---

## 📝 Roadmap

- [ ] WebSocket live rate push (sub-second updates)
- [ ] Email / PDF export of conversion history
- [ ] Shareable conversion links (URL state)
- [ ] Currency news sentiment overlay
- [ ] PWA with offline caching (service worker)
- [ ] Multi-base graph comparison overlay
