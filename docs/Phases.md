# Implementation Roadmap & Phase Execution Plan

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.0.0  
**Author**: Senior Tech Lead & Project Manager  

---

## Roadmap Summary (15 Execution Phases)

| Phase | Title | Description | Est. Duration |
| :---: | :--- | :--- | :---: |
| **Phase 1** | **Project Setup & Environment Bootstrap** | Workspace init, boilerplate, folder structure, Docker Compose setup. | 4 Hours |
| **Phase 2** | **Authentication & RBAC System** | JWT Auth, user schemas, login/register views, role route guards. | 6 Hours |
| **Phase 3** | **Main Layout & Dashboard Infrastructure** | Industrial sidebar, header, global state, dark/light theme engine. | 5 Hours |
| **Phase 4** | **User & Role Administration** | Admin user table, permission editor, profile management. | 4 Hours |
| **Phase 5** | **Asset Hierarchy & Knowledge Graph** | Asset tree modeling, asset CRUD, detail pages, technical specs. | 8 Hours |
| **Phase 6** | **Document Management System** | Doc upload UI, multi-format file parser, doc-to-asset linking. | 7 Hours |
| **Phase 7** | **OCR & Document Ingestion Engine** | PyTesseract/EasyOCR integration, image PDF processing, table extractor. | 8 Hours |
| **Phase 8** | **Text Chunking & Embedding Pipeline** | Recursive chunker, sentence-transformer model loading, 768-dim vector gen. | 6 Hours |
| **Phase 9** | **Vector Database & Search Indexing** | FAISS / ChromaDB storage manager, index persistence, metadata filter. | 6 Hours |
| **Phase 10** | **RAG Core Engine & AI Chat System** | Conversational UI, LangChain RAG pipeline, prompt guardrails, citations. | 10 Hours |
| **Phase 11** | **Unified Knowledge & Hybrid Search** | Semantic + BM25 keyword search, search filters, document viewer drawer. | 7 Hours |
| **Phase 12** | **Preventive Maintenance Recommendations** | Historical log pattern analyzer, proactive PM checklist generator. | 6 Hours |
| **Phase 13** | **Industrial Analytics & Insights** | KPI cards, Recharts visualization, query volume, low-confidence audit log. | 6 Hours |
| **Phase 14** | **End-to-End System Testing & Guardrail Audit**| Hallucination testing, security audit, RBAC check, load test. | 5 Hours |
| **Phase 15** | **Containerization & Deployment** | Multi-stage Dockerfiles, Docker Compose stack, Nginx reverse proxy. | 4 Hours |

---

## Detailed Phase Breakdown

---

### Phase 1: Project Setup & Environment Bootstrap
- **Objective**: Establish clean, containerized workspace structures for Frontend, Backend, AI Microservice, and Documentation.
- **Deliverables**: Verified root folder layout, `package.json` configurations, Python virtual environments, and `.env.example` templates.
- **Files Created/Modified**:
  - `frontend/package.json`, `frontend/vite.config.js`, `frontend/src/App.jsx`
  - `backend/package.json`, `backend/server.js`, `backend/src/config/db.js`
  - `ai_service/requirements.txt`, `ai_service/main.py`
  - `docker-compose.yml`
- **Frontend Tasks**: Scaffold Vite React app, install Tailwind CSS, Axios, React Router, React Query.
- **Backend Tasks**: Initialize Express app, set up CORS, Helmet, Mongoose connection logic.
- **AI Tasks**: Scaffold FastAPI app, create Python `venv`, install dependencies (`fastapi`, `langchain`, `sentence-transformers`).
- **Database Tasks**: Validate local MongoDB connection string and database creation.
- **Acceptance Criteria**: All 3 servers (Vite: 5173, Express: 5000, FastAPI: 8000) run simultaneously without errors.
- **Estimated Time**: 4 Hours
- **Dependencies**: Node.js, Python, MongoDB installed locally.
- **Progress Checklist**:
  - [ ] React Vite frontend bootstrapped
  - [ ] Node Express backend initialized
  - [ ] Python FastAPI microservice running
  - [ ] MongoDB connection verified

---

### Phase 2: Authentication & RBAC System
- **Objective**: Implement secure authentication and Role-Based Access Control across all 8 user roles.
- **Deliverables**: JWT authentication middleware, seed user scripts, Login/Register UI pages, and protected frontend routes.
- **Files Created/Modified**:
  - `backend/src/models/userModel.js`
  - `backend/src/controllers/authController.js`
  - `backend/src/middleware/authMiddleware.js`
  - `frontend/src/context/AuthContext.jsx`
  - `frontend/src/pages/LoginPage.jsx`
- **Frontend Tasks**: Build responsive Login form, wire JWT local storage logic, create `ProtectedRoute` wrapper.
- **Backend Tasks**: Implement `/login`, `/register`, `/me` endpoints; hash passwords with `bcryptjs`; sign JWT tokens.
- **AI Tasks**: Secure AI internal microservice calls using API token headers.
- **Database Tasks**: Design `users` MongoDB schema with role enum (`Plant Operator`, `Maintenance Engineer`, etc.).
- **Acceptance Criteria**: Users can log in, receive a valid JWT, and are redirected to role-appropriate views.
- **Estimated Time**: 6 Hours
- **Dependencies**: Phase 1
- **Progress Checklist**:
  - [ ] User Mongoose schema created
  - [ ] JWT authentication endpoints active
  - [ ] Frontend Login view connected
  - [ ] Role-based route guard enforced

---

### Phase 3: Main Layout & Dashboard Infrastructure
- **Objective**: Create the core industrial application shell, responsive navigation sidebar, header, and dark/light theme switcher.
- **Deliverables**: Reusable `MainLayout`, top navigation bar, collapsible sidebar, and active user banner.
- **Files Created/Modified**:
  - `frontend/src/components/layout/MainLayout.jsx`
  - `frontend/src/components/layout/Sidebar.jsx`
  - `frontend/src/components/layout/Navbar.jsx`
  - `frontend/src/context/ThemeContext.jsx`
- **Frontend Tasks**: Design industrial dark/light layout, active link indicators, role display badge, and dark mode toggle.
- **Backend Tasks**: Implement user preference persistence endpoint (`PUT /api/v1/users/preferences`).
- **AI Tasks**: None.
- **Database Tasks**: Add UI preferences field to User schema.
- **Acceptance Criteria**: Layout renders cleanly on desktop and tablet screens; theme toggles seamlessly.
- **Estimated Time**: 5 Hours
- **Dependencies**: Phase 2
- **Progress Checklist**:
  - [ ] MainLayout component built
  - [ ] Collapsible Sidebar with icons
  - [ ] Theme switcher toggling CSS variables

---

### Phase 4: User & Role Administration
- **Objective**: Build an Admin panel to manage users, assign plant roles, and view user activity.
- **Deliverables**: Admin User Management table view, user creation modal, role update modal.
- **Files Created/Modified**:
  - `frontend/src/pages/AdminUsersPage.jsx`
  - `frontend/src/components/users/UserModal.jsx`
  - `backend/src/routes/userRoutes.js`
- **Frontend Tasks**: Build user table with search, role filtering, role change modal, and deactivate action.
- **Backend Tasks**: Create CRUD endpoints for user management (`GET /users`, `PUT /users/:id/role`, `DELETE /users/:id`).
- **AI Tasks**: None.
- **Database Tasks**: Add index on `role` and `email` fields.
- **Acceptance Criteria**: Admin can view, filter, assign roles to users, and deactivate accounts.
- **Estimated Time**: 4 Hours
- **Dependencies**: Phase 2, Phase 3
- **Progress Checklist**:
  - [ ] User list table view with search
  - [ ] Role modification modal built
  - [ ] Admin RBAC middleware verified

---

### Phase 5: Asset Hierarchy & Knowledge Graph
- **Objective**: Model the physical plant asset tree and provide detailed asset profile pages linked to documents and logs.
- **Deliverables**: Asset Tree browser, Asset Detail view, Asset CRUD modals, and technical spec editor.
- **Files Created/Modified**:
  - `backend/src/models/assetModel.js`
  - `backend/src/controllers/assetController.js`
  - `frontend/src/pages/AssetsPage.jsx`
  - `frontend/src/pages/AssetDetailPage.jsx`
  - `frontend/src/components/assets/AssetTree.jsx`
- **Frontend Tasks**: Build expandable tree view component, asset creation wizard, specifications key-value table.
- **Backend Tasks**: Build recursive hierarchy query (`GET /assets/tree`), single asset details with populates (`GET /assets/:id`).
- **AI Tasks**: None.
- **Database Tasks**: `assets` collection with `parentAssetId` self-referencing ObjectId field.
- **Acceptance Criteria**: Users can expand/collapse plant units and click any asset to view its specs and documents.
- **Estimated Time**: 8 Hours
- **Dependencies**: Phase 3
- **Progress Checklist**:
  - [ ] Asset Mongoose schema with hierarchy
  - [ ] Interactive AssetTree component
  - [ ] Asset Detail view with linked docs tab

---

### Phase 6: Document Management System
- **Objective**: Enable uploading, tagging, metadata cataloging, and asset-linking of plant documents.
- **Deliverables**: Multi-file upload interface, document filterable grid/table, document viewer drawer.
- **Files Created/Modified**:
  - `backend/src/models/documentModel.js`
  - `backend/src/controllers/documentController.js`
  - `backend/src/middleware/uploadMiddleware.js`
  - `frontend/src/pages/DocumentsPage.jsx`
  - `frontend/src/components/documents/UploadModal.jsx`
- **Frontend Tasks**: Drag-and-drop file uploader, category selector (SOP, Manual, RCA, Safety), asset selector.
- **Backend Tasks**: Multer file storage middleware, document metadata save, file download streaming.
- **AI Tasks**: Trigger FastAPI ingestion endpoint asynchronously upon successful upload.
- **Database Tasks**: `documents` schema with array of `linkedAssetIds`.
- **Acceptance Criteria**: Documents can be uploaded, linked to assets, filtered by category, and downloaded.
- **Estimated Time**: 7 Hours
- **Dependencies**: Phase 5
- **Progress Checklist**:
  - [ ] Document schema and file storage configured
  - [ ] Drag-and-drop file upload UI built
  - [ ] Document list with category filtering

---

### Phase 7: OCR & Document Ingestion Engine
- **Objective**: Digitate scanned paper PDFs, images, and tables into clean markdown text for vector processing.
- **Deliverables**: PyTesseract OCR processing module, PDF page extractor, image preprocessing pipeline.
- **Files Created/Modified**:
  - `ai_service/app/services/ocr_service.py`
  - `ai_service/app/services/pdf_service.py`
  - `ai_service/app/api/ingest.py`
- **Frontend Tasks**: Display OCR extraction status badge on document list (`Processing`, `OCR In Progress`, `Ready`).
- **Backend Tasks**: Proxy upload payloads to Python ingestion API.
- **AI Tasks**: Build OpenCV image enhancement pipeline (grayscale, contrast thresholding), run PyTesseract/PyPDF2 page loop.
- **Database Tasks**: Store `isScanned` boolean and extracted text character length in `documents` collection.
- **Acceptance Criteria**: Scanned image PDFs are accurately converted into plain text strings containing page numbers.
- **Estimated Time**: 8 Hours
- **Dependencies**: Phase 6
- **Progress Checklist**:
  - [ ] PyTesseract engine integrated
  - [ ] PDF parser routing scanned vs native pages
  - [ ] Text cleaning and normalization verified

---

### Phase 8: Text Chunking & Embedding Pipeline
- **Objective**: Convert raw document text into context-aware chunks and generate dense vector embeddings.
- **Deliverables**: Sentence-Transformers model wrapper (`all-mpnet-base-v2`), Recursive Character Splitter service.
- **Files Created/Modified**:
  - `ai_service/app/services/chunking_service.py`
  - `ai_service/app/services/embedding_service.py`
  - `ai_service/app/core/config.py`
- **Frontend Tasks**: None.
- **Backend Tasks**: Store vector chunk counts in document metadata.
- **AI Tasks**: Implement 500-token chunker with 100-token overlap, generate 768-dim numpy float32 vector arrays.
- **Database Tasks**: None.
- **Acceptance Criteria**: Documents are cleanly split into logical chunks; vector embeddings are generated without memory leaks.
- **Estimated Time**: 6 Hours
- **Dependencies**: Phase 7
- **Progress Checklist**:
  - [ ] Recursive chunking algorithm operational
  - [ ] SentenceTransformers model initialized on app startup
  - [ ] Vector array generation benchmarked

---

### Phase 9: Vector Database & Search Indexing
- **Objective**: Store, persist, and index vector embeddings with rich metadata filtering capabilities.
- **Deliverables**: FAISS / ChromaDB Index Manager, index save/load disk persistence, similarity search query method.
- **Files Created/Modified**:
  - `ai_service/app/services/vector_store.py`
  - `ai_service/app/api/search.py`
- **Frontend Tasks**: None.
- **Backend Tasks**: Forward vector search queries from client to AI microservice.
- **AI Tasks**: Manage FAISS `IndexFlatIP` (Inner Product after normalization), implement metadata filtering by `assetId` and `docCategory`.
- **Database Tasks**: Store chunk metadata references.
- **Acceptance Criteria**: Vector search returns top-K nearest neighbors in under 300 ms.
- **Estimated Time**: 6 Hours
- **Dependencies**: Phase 8
- **Progress Checklist**:
  - [ ] FAISS index manager implemented
  - [ ] Index persistence to disk verified
  - [ ] Cosine similarity search returning top-K chunks

---

### Phase 10: RAG Core Engine & AI Chat System
- **Objective**: Build the core zero-hallucination natural language RAG interface with citation tracking and confidence scores.
- **Deliverables**: Interactive AI Chat UI, LangChain RAG pipeline, strict prompt template guardrails, citation parser.
- **Files Created/Modified**:
  - `ai_service/app/services/rag_service.py`
  - `ai_service/app/core/prompts.py`
  - `frontend/src/pages/ChatPage.jsx`
  - `frontend/src/components/chat/ChatMessage.jsx`
  - `frontend/src/components/chat/CitationDrawer.jsx`
- **Frontend Tasks**: Conversational chat interface, streaming answer animation, confidence meter, expandable citation drawer.
- **Backend Tasks**: Log chat interactions to `chat_history` MongoDB collection (`POST /api/v1/ai/chat`).
- **AI Tasks**: Construct strict system prompt forcing document-grounded answers, compute score, return answer JSON with citations.
- **Database Tasks**: `chat_history` collection schema with query, response, confidence, and array of citations.
- **Acceptance Criteria**: AI answers questions accurately, displays exact document page citations, and declines unknown queries.
- **Estimated Time**: 10 Hours
- **Dependencies**: Phase 9
- **Progress Checklist**:
  - [ ] LangChain RAG pipeline configured
  - [ ] Strict zero-hallucination prompt enforced
  - [ ] Frontend Chat UI displaying citations & confidence meter

---

### Phase 11: Unified Knowledge & Hybrid Search
- **Objective**: Provide a unified search interface combining dense vector semantic search with BM25 keyword matching.
- **Deliverables**: Global Knowledge Search page, query filter bar (by asset, doc type, date), result highlighting.
- **Files Created/Modified**:
  - `frontend/src/pages/SearchPage.jsx`
  - `frontend/src/components/search/SearchResultCard.jsx`
  - `ai_service/app/services/hybrid_search.py`
- **Frontend Tasks**: Search input with debounced auto-complete, filter sidebar, result cards with match score badges.
- **Backend Tasks**: Combine text index results from MongoDB with vector results from AI service.
- **AI Tasks**: Implement Reciprocal Rank Fusion (RRF) algorithm to rank vector and keyword results.
- **Database Tasks**: Text indexes on MongoDB `assets` (`name`, `assetCode`) and `documents` (`title`, `docCategory`).
- **Acceptance Criteria**: Search returns relevant results regardless of whether query uses exact keywords or descriptive phrases.
- **Estimated Time**: 7 Hours
- **Dependencies**: Phase 10
- **Progress Checklist**:
  - [ ] Hybrid Search endpoint active
  - [ ] Reciprocal Rank Fusion ranking verified
  - [ ] Search UI rendering highlighted snippet matches

---

### Phase 12: AI Preventive Maintenance Recommendations
- **Objective**: Analyze historical work logs and RCA documents linked to an asset to generate proactive preventive recommendations.
- **Deliverables**: AI Recommendation card component on Asset detail page, background recommendation synthesis service.
- **Files Created/Modified**:
  - `backend/src/models/maintenanceLogModel.js`
  - `ai_service/app/services/recommendation_service.py`
  - `frontend/src/components/assets/AssetRecommendations.jsx`
- **Frontend Tasks**: Recommendation list UI with severity indicators (`Critical`, `Warning`, `Info`), action checklists.
- **Backend Tasks**: CRUD for maintenance logs (`GET/POST /api/v1/worklogs`).
- **AI Tasks**: Summarize failure patterns across past logs, generate structured PM checklists and inspection intervals.
- **Database Tasks**: `maintenance_logs` collection schema.
- **Acceptance Criteria**: Clicking "Generate AI PM Analysis" on an asset displays actionable preventive maintenance steps.
- **Estimated Time**: 6 Hours
- **Dependencies**: Phase 5, Phase 10
- **Progress Checklist**:
  - [ ] Work log Mongoose collection built
  - [ ] AI recommendation prompt constructed
  - [ ] PM checklist rendering on Asset Detail view

---

### Phase 13: Industrial Analytics & Knowledge Dashboard
- **Objective**: Render plant-wide operational intelligence KPIs, query metrics, document coverage, and audit logs.
- **Deliverables**: Analytics Dashboard page with Recharts visual components.
- **Files Created/Modified**:
  - `frontend/src/pages/DashboardPage.jsx`
  - `frontend/src/components/analytics/KpiCard.jsx`
  - `frontend/src/components/analytics/QueryVolumeChart.jsx`
  - `frontend/src/components/analytics/LowConfidenceLogTable.jsx`
  - `backend/src/controllers/analyticsController.js`
- **Frontend Tasks**: 4 Top KPI cards, Area chart for query volume over time, Bar chart for top queried assets, low-confidence query review table.
- **Backend Tasks**: MongoDB aggregation pipelines (`$group`, `$count`, `$match`) for real-time metrics generation.
- **AI Tasks**: None.
- **Database Tasks**: MongoDB indexes optimized for aggregation performance.
- **Acceptance Criteria**: Dashboard loads quickly with accurate KPI numbers and interactive analytical charts.
- **Estimated Time**: 6 Hours
- **Dependencies**: Phase 10, Phase 11
- **Progress Checklist**:
  - [ ] MongoDB aggregation endpoints live
  - [ ] KPI cards and Recharts integrated
  - [ ] Low-confidence query log visible to Admins

---

### Phase 14: End-to-End System Testing & Guardrail Audit
- **Objective**: Systematically audit system performance, RBAC security, zero-hallucination enforcement, and API reliability.
- **Deliverables**: Comprehensive test report, fixed edge-case bugs, validated prompt guardrails.
- **Files Created/Modified**:
  - `backend/tests/`
  - `ai_service/tests/`
- **Frontend Tasks**: Audit UI responsiveness, cross-browser compatibility, and form error handling.
- **Backend Tasks**: Run API endpoint integration tests, test JWT expiration handling.
- **AI Tasks**: Run 50+ adversarial domain questions to test zero-hallucination compliance and citation accuracy.
- **Database Tasks**: Validate indexing and database cleanup scripts.
- **Acceptance Criteria**: 100% pass rate on RAG guardrail tests; zero security loopholes in RBAC endpoints.
- **Estimated Time**: 5 Hours
- **Dependencies**: Phases 1-13
- **Progress Checklist**:
  - [ ] RBAC security audit completed
  - [ ] Adversarial RAG hallucination benchmark passed
  - [ ] API error handling validated

---

### Phase 15: Containerization & Production Deployment
- **Objective**: Package the entire application stack using Docker Compose and Nginx for single-command production deployment.
- **Deliverables**: Multi-stage Dockerfiles for Frontend, Backend, and AI Service; `docker-compose.yml`; Nginx config.
- **Files Created/Modified**:
  - `frontend/Dockerfile`
  - `backend/Dockerfile`
  - `ai_service/Dockerfile`
  - `nginx/nginx.conf`
  - `docker-compose.yml`
- **Frontend Tasks**: Multi-stage Docker build producing static Nginx bundle.
- **Backend Tasks**: Node production container image creation.
- **AI Tasks**: Python FastAPI container with PyTesseract dependencies installed.
- **Database Tasks**: MongoDB container volume persistence mapping.
- **Acceptance Criteria**: Running `docker-compose up --build` launches the complete multi-tier solution successfully.
- **Estimated Time**: 4 Hours
- **Dependencies**: Phase 14
- **Progress Checklist**:
  - [ ] Multi-stage Dockerfiles written
  - [ ] Docker Compose service orchestration verified
  - [ ] Production build validated end-to-end
