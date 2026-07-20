# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [4.0.0] - 2026-07-20

### Completed Phase 4: User & Role Administration & Security Audit Logging
- **Database & Schemas**: Created Mongoose `AuditLog` collection schema (`auditLogModel.js`) capturing user ID, action event type, timestamp, IP address, and details.
- **Middleware**: Built `auditLogger.js` helper module to record authorization, role updates, and authentication events.
- **Backend Admin REST API**: Added `GET /api/v1/users`, `POST /api/v1/users`, `PUT /api/v1/users/:id/role`, `PUT /api/v1/users/:id/status`, and `GET /api/v1/audit-logs` endpoints in `userController.js` and `auditController.js`.
- **Frontend Services**: Built `userService.js` client wrapper.
- **Admin Control Panel**: Built `AdminUsersPage.jsx` featuring tabbed navigation for Personnel Directory and Security Audit Trail.
- **Admin Modals**: Built `UserModal.jsx` (create personnel) and `RoleModal.jsx` (re-assign RBAC role).
- **Audit Viewer**: Built `AuditLogViewer.jsx` rendering security compliance logs with action filtering.

---

## [3.0.0] - 2026-07-19

### Completed Phase 3: Main Layout & Dashboard Infrastructure
- Created `ThemeContext.jsx`, `MainLayout.jsx`, `Navbar.jsx`, `Sidebar.jsx`, and `DashboardPage.jsx` with KPI cards and Recharts curves.

---

## [2.0.0] - 2026-07-19

### Completed Phase 2: Authentication & RBAC System
- Created `User` schema, BCrypt hashing, JWT auth, and `LoginPage.jsx`.
