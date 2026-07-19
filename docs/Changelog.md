# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.0.0] - 2026-07-19

### Completed Phase 3: Main Layout & Dashboard Infrastructure
- **Theme Engine**: Created `ThemeContext.jsx` managing dark/light industrial theme state and local storage persistence.
- **Application Shell**: Created `MainLayout.jsx` container.
- **Top Navigation Bar**: Built `Navbar.jsx` with global search shortcut (`Ctrl + K`), quick upload button, theme toggle, and user role display.
- **Collapsible Sidebar**: Built `Sidebar.jsx` with active route highlighting, role-restricted admin links, and live microservice status pills.
- **Command Dashboard**: Built `DashboardPage.jsx` featuring 4 KPI cards, Recharts AreaChart (monthly query volume & accuracy), BarChart (document catalog breakdown), and Low-Confidence Query Audit Log table.
- **Backend API**: Added `PUT /api/v1/users/preferences` endpoint in `userController.js` and `userRoutes.js`.

---

## [2.0.0] - 2026-07-19

### Completed Phase 2: Authentication & RBAC System
- Created Mongoose `User` collection schema (`userModel.js`) with BCrypt password hashing.
- Built `/api/v1/auth/login`, `/api/v1/auth/register`, `/api/v1/auth/me`, and `/api/v1/auth/seed` endpoints.
- Built JWT verification middleware (`authMiddleware.js`) and role guard (`rbacMiddleware.js`).
- Created `seedUsers.js` utility seeding 8 demo plant accounts.
- Built `AuthContext.jsx`, `authService.js`, `ProtectedRoute.jsx`, `RoleGuard.jsx`, and `LoginPage.jsx`.

---

## [1.5.0] - 2026-07-19

### Added
- Husky pre-commit hooks, ESLint + Prettier rules, GitHub Actions CI workflow, OpenAPI (Swagger UI) at `/docs`, and Docker Health Checks.
