# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [15.0.0] - 2026-07-20

### Completed Phase 15: Production Docker Containerization & Nginx Proxy Deployment (FINAL RELEASE)
- **Containerization**: Built multi-stage production Dockerfiles for React 18 Vite frontend (`frontend/Dockerfile`), Node Express REST Gateway (`backend/Dockerfile`), and Python FastAPI AI microservice (`ai_service/Dockerfile`).
- **Reverse Proxy**: Built central Nginx reverse proxy (`nginx/nginx.conf`) routing `/`, `/api/v1`, `/docs`, and `/ai/health`.
- **Production Orchestration**: Created `docker-compose.prod.yml` managing container health checks, volume persistence (`mongodb_prod_data`, `ai_vector_data`, `uploaded_documents`), and automatic container restart policies.
- **Verification Script**: Created PowerShell verification script `scripts/deploy-check.ps1` testing all 4 system health endpoints.

---

## [14.0.0] - 2026-07-20

### Completed Phase 14: Industrial Analytics & Audit Dashboard
- Created `analyticsController.js`, `analyticsRoutes.js`, `GET /api/v1/analytics/summary` endpoint, and `AnalyticsPage.jsx`.

---

## [13.0.0] - 2026-07-20

### Completed Phase 13: Incident & Root Cause Analysis (RCA) Module
- Created `IncidentRCA` schema, `seedIncidentRCAs.js`, `rca_engine.py`, `POST /rca/generate-5whys` endpoint, and `IncidentRCAPage.jsx`.

---

## [12.0.0] - 2026-07-20

### Completed Phase 12: AI Preventive Maintenance Recommendation Engine
- Created `PMRecommendation` model, `seedPMRecommendations.js`, `pm_engine.py`, `POST /pm/analyze` endpoint, and `PMRecommendationsPage.jsx`.

---

## [11.0.0] - 2026-07-20

### Completed Phase 11: Hybrid Reciprocal Rank Fusion Search Interface
- Created `hybrid_search.py` (RRF BM25 + FAISS algorithm), `POST /search/hybrid` endpoint, and `KnowledgeSearchPage.jsx`.

---

## [10.0.0] - 2026-07-20

### Completed Phase 10: Conversational RAG Engine with Citations & Confidence Meter
- Created `rag_chain.py` with zero-hallucination guardrails, `/chat` endpoint, `chatController.js` low-confidence audit logging, and `ChatPage.jsx`.

---

## [9.0.0] - 2026-07-20

### Completed Phase 9: FAISS Vector Database Engine & Indexing Manager
- Created `FAISSVectorManager` class (`vector_db.py`), disk persistence, `POST /search/vector` endpoint, and `VectorSearchPage.jsx`.

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
