# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [8.0.0] - 2026-07-20

### Completed Phase 8: Text Chunking & SentenceTransformers Vector Embedding Pipeline
- **Database & Schemas**: Created Mongoose `Chunk` collection schema (`chunkModel.js`) storing 384-dimensional vector embeddings, chunk indices, token counts, asset references, and metadata.
- **Text Chunker**: Created `chunker.py` sliding-window recursive text splitter (target size 500 chars, overlap 100 chars) preserving section headings and safety alerts (`DANGER`, `WARNING`, `NOTE`).
- **Vector Embeddings**: Created `embedder.py` SentenceTransformers `all-MiniLM-L6-v2` dense vector model generating 384-dim normalized float vectors.
- **AI Microservice API**: Added `POST /embed` and `POST /embed/chunk` endpoints in `ai_service/app/api/embed.py`.
- **Backend Vector Controller**: Created `vectorController.js` and `vectorRoutes.js` exposing `POST /api/v1/documents/:id/vectorize` and `GET /api/v1/documents/:id/chunks`.
- **Pipeline Viewer**: Built `VectorizeModal.jsx` displaying vector chunk counts, dimension status, and text chunk list preview.
- **Document Catalog**: Integrated interactive `Vectorize` button into `DocumentsPage.jsx`.

---

## [7.0.0] - 2026-07-20

### Completed Phase 7: PyTesseract OCR & Scanned PDF Extraction Engine
- Created `extractor.py`, `cleaner.py`, `POST /extract` endpoint, `aiServiceProxy`, and `ExtractionModal.jsx`.

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
