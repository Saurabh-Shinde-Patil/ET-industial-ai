# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [9.0.0] - 2026-07-20

### Completed Phase 9: FAISS Vector Database Engine & Indexing Manager
- **Vector Database**: Created `vector_db.py` featuring `FAISSVectorManager` class using `faiss.IndexFlatIP` (384 dimensions) for sub-millisecond cosine similarity search.
- **Disk Persistence**: Implemented binary index saving/loading at `ai_service/data/faiss_index.bin` and metadata mapping at `faiss_metadata.json`.
- **AI Microservice API**: Added `POST /search/vector` and `POST /search/index` in `ai_service/app/api/search.py`.
- **Backend API Gateway**: Added `POST /api/v1/search/vector` in `vectorController.js` and updated document vectorization pipeline to automatically index vector chunks into FAISS.
- **Frontend Playground**: Built `VectorSearchPage.jsx` interactive vector search view with preset industrial queries, asset filtering, and percentage match scores.

---

## [8.0.0] - 2026-07-20

### Completed Phase 8: Text Chunking & SentenceTransformers Vector Embedding Pipeline
- Created `Chunk` collection, `chunker.py` sliding window text splitter, `embedder.py` SentenceTransformers `all-MiniLM-L6-v2` generator, `/embed` and `/embed/chunk` endpoints, and `VectorizeModal.jsx`.

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
