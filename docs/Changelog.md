# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [7.0.0] - 2026-07-20

### Completed Phase 7: PyTesseract OCR & Scanned PDF Extraction Engine
- **Text Extraction Engine**: Created `extractor.py` in Python FastAPI microservice supporting PDF (pdfplumber), Word (`python-docx`), plain text, and PyTesseract OCR fallback for scanned diagrams & low-density PDFs.
- **Industrial Text Cleaner**: Created `cleaner.py` normalizing whitespace, removing OCR artifacts, and standardizing technical units (`m³/h`, `°C`, `bar`, `RPM`).
- **AI Microservice API**: Added `POST /extract` endpoint in `ai_service/app/api/extract.py`.
- **Backend Integration**: Updated `aiServiceProxy.js` and added `POST /api/v1/documents/:id/extract` in Express backend `documentController.js`.
- **Extraction Modal**: Built `ExtractionModal.jsx` displaying extracted text preview, word counts, and PyTesseract status.
- **Document Catalog**: Integrated interactive `OCR` button into `DocumentsPage.jsx`.

---

## [6.0.0] - 2026-07-20

### Completed Phase 6: Document Management System & Asset Association Pipeline
- Created `Document` collection, Multer `uploadMiddleware.js`, 5-document seeder, `UploadModal.jsx`, and `DocumentsPage.jsx`.

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
