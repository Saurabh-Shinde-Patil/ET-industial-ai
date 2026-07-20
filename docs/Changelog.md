# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [6.0.0] - 2026-07-20

### Completed Phase 6: Document Management System & Asset Association Pipeline
- **Database & Schemas**: Created Mongoose `Document` collection schema (`documentModel.js`) with document type indices, file path, versioning, extraction status, and array of linked asset ObjectIds.
- **File Upload Middleware**: Built `uploadMiddleware.js` using Multer for handling multi-format uploads (PDF, DOCX, TXT, PNG, JPG) up to 50MB with mime-type safety.
- **Seeder Utility**: Built `seedDocuments.js` populating 5 ground-truth industrial plant documents (`SOP-PUMP-101`, `MAINT-BOILER-02`, `RCA-COMP-07`, `PM-TURBINE-04`, `MANUAL-REACTOR-05`).
- **Backend Document REST API**: Added `POST /api/v1/documents/upload`, `GET /api/v1/documents`, `GET /api/v1/documents/:id`, `PUT /api/v1/documents/:id/link-assets`, `DELETE /api/v1/documents/:id`, and `POST /api/v1/documents/seed` endpoints.
- **Frontend Services**: Built `documentService.js` client wrapper supporting multipart file uploads.
- **Upload Modal**: Built `UploadModal.jsx` drag-and-drop file uploader with asset selection grid responding to Navbar upload triggers.
- **Document Catalog Page**: Built `DocumentsPage.jsx` catalog repository table with document type filters, asset filters, extraction status pills (`Extracted`, `Pending`, `Failed`), and document deletion controls.

---

## [5.0.0] - 2026-07-20

### Completed Phase 5: Asset Hierarchy & Knowledge Graph
- Created `Asset` collection, 10-asset seeder, `AssetTree.jsx`, `AssetModal.jsx`, `AssetsPage.jsx`, and `AssetDetailPage.jsx`.

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
