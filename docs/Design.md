# UI/UX Design System Specification

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.0.0  
**Author**: Lead UI/UX Designer & Frontend Architect  

---

## 1. Design Philosophy

The **Industrial Knowledge Intelligence (IKI)** design system is crafted for high-density, mission-critical industrial operational environments. 

### Core Pillars
1. **Industrial Command Center Aesthetic**: Clean, dark-mode prioritized interface reminiscent of modern SCADA, Distributed Control System (DCS), and aerospace control room dashboards.
2. **High Information Density & Clarity**: Designed to present complex machinery specs, vector search snippets, and multi-page citation documents without clutter.
3. **Safety & Hazard Visual Hierarchy**: Immediate visual demarcation of operational statuses, warning alerts, and safety compliance levels using universal industrial color codes.
4. **Fluid Responsiveness & Accessibility**: Fully functional across desktop workstations, plant floor rugged tablets, and mobile devices with high contrast ratio (WCAG 2.1 AA compliant).

---

## 2. Color Palette & Design Tokens

### 2.1 Color Palette Table

| Token Name | Hex Code | HSL Value | Usage Description |
| :--- | :--- | :--- | :--- |
| `--bg-dark-primary` | `#0B0F17` | `hsl(220, 35%, 6%)` | Dark mode main application background |
| `--bg-dark-secondary` | `#111827` | `hsl(220, 39%, 11%)` | Card, container, and sidebar background |
| `--bg-dark-tertiary` | `#1F2937` | `hsl(215, 28%, 17%)` | Modal backgrounds, input fields, hover states |
| `--border-dark` | `#374151` | `hsl(217, 19%, 27%)` | Subtle glassmorphic borders |
| `--text-primary` | `#F9FAFB` | `hsl(210, 40%, 98%)` | High-contrast headings and primary labels |
| `--text-secondary` | `#9CA3AF` | `hsl(215, 16%, 65%)` | Secondary body text and metadata labels |
| `--text-muted` | `#6B7280` | `hsl(220, 9%, 46%)` | Timestamps, disabled text, placeholder text |
| `--accent-cyan` | `#06B6D4` | `hsl(189, 94%, 43%)` | Primary active accent, vector highlights, links |
| `--accent-cyan-glow` | `#0891B2` | `hsl(189, 91%, 36%)` | Glowing borders, focus rings, active tab indicators |
| `--accent-emerald` | `#10B981` | `hsl(158, 64%, 52%)` | Operational status: Normal, Operational, High Confidence |
| `--hazard-amber` | `#F59E0B` | `hsl(38, 92%, 50%)` | Warning status: Caution, Medium Confidence, Maintenance Due |
| `--alert-crimson` | `#EF4444` | `hsl(0, 84%, 60%)` | Danger status: Trip, Critical Failure, Low Confidence Fallback |

---

### 2.2 CSS Variable Definitions

```css
:root {
  /* Dark Industrial Theme (Default) */
  --bg-primary: #0B0F17;
  --bg-secondary: #111827;
  --bg-tertiary: #1F2937;
  --bg-card: rgba(17, 24, 39, 0.75);
  --border-color: rgba(55, 65, 81, 0.6);
  --border-highlight: rgba(6, 182, 212, 0.4);

  --text-main: #F9FAFB;
  --text-sub: #9CA3AF;
  --text-dim: #6B7280;

  --color-primary: #06B6D4;
  --color-primary-hover: #0891B2;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;

  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --shadow-glow: 0 0 15px rgba(6, 182, 212, 0.15);
  --shadow-card: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
  --glass-backdrop: blur(12px);
}

[data-theme="light"] {
  /* Light Industrial Theme */
  --bg-primary: #F3F4F6;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #E5E7EB;
  --bg-card: rgba(255, 255, 255, 0.9);
  --border-color: #D1D5DB;
  --border-highlight: #06B6D4;

  --text-main: #111827;
  --text-sub: #4B5563;
  --text-dim: #9CA3AF;

  --shadow-card: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
}
```

---

## 3. Typography & Hierarchy

### Google Font Import
Primary: **Inter** (Weights: 400, 500, 600, 700)  
Monospace / Code / Citations: **JetBrains Mono** (Weights: 400, 500)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Type Scale Table

| Scale Identifier | Font Size | Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `Heading-XL` | 32px (2rem) | 38px | 700 (Bold) | Dashboard main titles, Page headers |
| `Heading-L` | 24px (1.5rem) | 30px | 600 (SemiBold)| Section titles, Modal headers |
| `Heading-M` | 18px (1.125rem)| 24px | 600 (SemiBold)| Card titles, Drawer section headers |
| `Body-Regular` | 14px (0.875rem)| 20px | 400 (Regular) | Primary table cells, chat response text |
| `Body-Small` | 12px (0.75rem) | 16px | 400 (Regular) | Metadata badges, tooltips, secondary tags |
| `Code-Citation`| 13px (0.8125rem)|18px | 500 (Medium) | Citation snippets, document code tags |

---

## 4. Component Visual Specifications

### 4.1 Buttons

```
[ Primary Action ]   -> Background: var(--color-primary), Text: Dark/White, Glow on Hover
[ Secondary Action ] -> Background: var(--bg-tertiary), Border: 1px var(--border-color)
[ Danger Action ]    -> Background: var(--color-danger), Text: White
[ Glass Icon Button] -> Background: rgba(255,255,255,0.05), Border: 1px var(--border-color)
```

- **Padding**: Medium (`10px 18px`), Small (`6px 12px`).
- **Border Radius**: `6px` (Industrial crisp rounded edges).
- **Hover Micro-interaction**: `transform: translateY(-1px)`, `transition: all 0.2s ease`.

---

### 4.2 Cards & Containers

- **Background**: `var(--bg-card)` with `backdrop-filter: var(--glass-backdrop)`.
- **Borders**: `1px solid var(--border-color)`.
- **Card Hover State**: Border shifts to `var(--border-highlight)` with subtle cyan shadow glow (`var(--shadow-glow)`).

---

### 4.3 Chat Interface & Citation Drawer

```
+-----------------------------------------------------------------------------------+
| AI Assistant  [Confidence: 94% High]                                              |
|                                                                                   |
| Based on SOP-BOILER-03 (Page 14), prior to engaging Boiler-3 burners:             |
| 1. Ensure natural gas supply pressure is stabilized at 4.5 bar.                   |
| 2. Verify draft fan dampers are set to 30% open position [Doc 12, Pg 14].          |
|                                                                                   |
| [SAFETY WARNING]: Flue gas vent must be purged for minimum 3 minutes.             |
|                                                                                   |
| Sources: [SOP-Boiler-03.pdf (Pg 14)] [RCA-Boiler-Trip-2025.pdf (Pg 3)]             |
+-----------------------------------------------------------------------------------+
```

- **User Messages**: Aligned Right, Dark Charcoal Glass bubble.
- **AI Messages**: Aligned Left, Slate Grey Card container with Cyan left border.
- **Citations Badge**: Clickable monospace pills (`[SOP-Boiler-03.pdf (Pg 14)]`) opening a sliding right-hand Citation Drawer displaying the exact highlighted snippet.

---

### 4.4 Status Indicators & Badges

- **Operational / Active**: Green pill with pulsating dot indicator.
- **Maintenance / Warning**: Amber pill with solid alert icon.
- **Trip / Critical**: Red pill with alert hazard border.
- **Confidence Meter**:
  - `High (>85%)`: Solid Emerald Badge (`#10B981`)
  - `Medium (65-85%)`: Amber Badge (`#F59E0B`)
  - `Low (<65%)`: Red Badge (`#EF4444`) with Warning Notice

---

## 5. Layout Architecture & Responsive Breakpoints

### Breakpoint Specs
- `sm`: 640px (Mobile portrait)
- `md`: 768px (Tablets / Rugged floor devices)
- `lg`: 1024px (Small laptops)
- `xl`: 1280px (Standard Desktop Workstations)
- `2xl`: 1536px (Multi-monitor Plant Control Room Displays)

### Screen Layout Structure
- **Sidebar**: Fixed 260px width on desktop (collapsible to 72px icon mode); slide-over drawer on mobile (`md`).
- **Header / Navbar**: Fixed 64px height featuring Global Search shortcut (`Ctrl + K`), Role Badge, Quick Upload, and Theme Toggle.
- **Main Viewport**: Scrollable fluid container with max-width constraints on wide screens (`max-w-7xl`).

---

## 6. Accessibility & Motion Guidelines

### Accessibility (WCAG 2.1 AA)
1. **Contrast Ratio**: Text to background contrast >= 4.5:1 across both dark and light modes.
2. **Keyboard Navigation**: Clear 2px cyan focus rings (`outline: 2px solid var(--accent-cyan)`) on all interactive elements.
3. **Screen Readers**: `aria-expanded` on accordion trees; `aria-live="polite"` on streaming AI chat messages.

### Animations & Transitions
- **Speed**: Snappy micro-interactions (150ms - 250ms).
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Skeleton Loaders**: Subtle pulse shimmer effect (`@keyframes shimmer`) on cards during React Query loading states.
