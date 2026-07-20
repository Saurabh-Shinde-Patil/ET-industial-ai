# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [5.0.0] - 2026-07-20

### Completed Phase 5: Asset Hierarchy & Knowledge Graph
- **Database & Schemas**: Created Mongoose `Asset` collection schema (`assetModel.js`) supporting self-referencing `parentAssetId`, category indices, status flags, and key-value specifications maps.
- **Seeder Utility**: Built `seedAssets.js` populating 10 primary industrial machinery nodes (`PUMP-101`, `BOILER-02`, `TURBINE-04`, `COMP-07`, `HEX-12`, `VALVE-88`, etc.) into MongoDB.
- **Backend Asset REST API**: Added `GET /api/v1/assets/tree`, `GET /api/v1/assets`, `GET /api/v1/assets/:id`, `POST /api/v1/assets`, `PUT /api/v1/assets/:id`, `DELETE /api/v1/assets/:id`, and `POST /api/v1/assets/seed` endpoints.
- **Frontend Services**: Built `assetService.js` client wrapper.
- **Interactive Tree Component**: Built `AssetTree.jsx` enabling expandable/collapsible plant tree traversal with operational status badges.
- **Asset Registration Modal**: Built `AssetModal.jsx` featuring dynamic key-value specification fields.
- **Asset Pages**: Built `AssetsPage.jsx` split view and `AssetDetailPage.jsx` technical profile view.

---

## [4.0.0] - 2026-07-20

### Completed Phase 4: User & Role Administration & Security Audit Logging
- Created `AuditLog` collection, `auditLogger` middleware, Admin user management APIs, `AdminUsersPage.jsx`, and `AuditLogViewer.jsx`.

---

## [3.0.0] - 2026-07-19

### Completed Phase 3: Main Layout & Dashboard Infrastructure
- Created `ThemeContext.jsx`, `MainLayout.jsx`, `Navbar.jsx`, `Sidebar.jsx`, and `DashboardPage.jsx` with KPI cards and Recharts curves.

---

## [2.0.0] - 2026-07-19

### Completed Phase 2: Authentication & RBAC System
- Created `User` schema, BCrypt hashing, JWT auth, and `LoginPage.jsx`.
