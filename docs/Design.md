# UI/UX Design System Specification

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.1.0 (Architecture Review & Screen Alignment Verified)  
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

---

## 4. Screen Layouts & Domain UI Components

### 4.1 Screen Blueprint Registry

| Screen ID | Page Name | Primary UI Components |
| :--- | :--- | :--- |
| **SCR-01** | `LoginPage.jsx` | Industrial Login Container, Role Indicator Pill, Auth Alert |
| **SCR-02** | `DashboardPage.jsx` | 4 KPI Cards, Query Volume Area Chart, Document Category Pie Chart, Low Confidence Review Table |
| **SCR-03** | `AssetsPage.jsx` | Expandable `AssetTree`, Search Bar, Asset Specs Key-Value Grid, Add Asset Modal |
| **SCR-04** | `AssetDetailPage.jsx` | Asset Header Banner, Specs Table, Linked Documents Tab, Work Log History Timeline, AI PM Recommendations Card |
| **SCR-05** | `DocumentsPage.jsx` | `UploadModal` (Drag & Drop), Filter Bar, OCR Status Badge (`Processing`, `Ready`), Document Table, Download Stream Drawer |
| **SCR-06** | `ChatPage.jsx` | Conversation Stream, `ConfidenceMeter` (High/Med/Low), Inline Citation Pills, `CitationDrawer` (Right Slide-over), Safety Warning Box |
| **SCR-07** | `SearchPage.jsx` | Global Search Input with Auto-complete, Category Filter Sidebar, `SearchResultCard` with RRF score indicator |
| **SCR-08** | `IncidentsPage.jsx` | Incident Table, Severity Pill (`Critical`, `Major`, `Minor`), `IncidentModal`, `RcaCard` |
| **SCR-09** | `AdminUsersPage.jsx` | User Management Table, Role Selection Modal, Deactivate Button, `AuditLogViewer` Tab |

---

### 4.2 Chat Interface & Citation Drawer Visual Spec

```
+-----------------------------------------------------------------------------------+
| AI Operations Brain  [Confidence: 94% High]                                       |
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

---

## 5. Accessibility & Motion Guidelines

### Accessibility (WCAG 2.1 AA)
1. **Contrast Ratio**: Text to background contrast >= 4.5:1 across both dark and light modes.
2. **Keyboard Navigation**: Clear 2px cyan focus rings (`outline: 2px solid var(--accent-cyan)`) on all interactive elements.
3. **Screen Readers**: `aria-expanded` on accordion trees; `aria-live="polite"` on streaming AI chat messages.

### Animations & Transitions
- **Speed**: Snappy micro-interactions (150ms - 250ms).
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Skeleton Loaders**: Subtle pulse shimmer effect (`@keyframes shimmer`) on cards during React Query loading states.
