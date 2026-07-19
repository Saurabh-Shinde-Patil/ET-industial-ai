# System Architecture Specification

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.1.0 (Architecture Review & Database Alignment Verified)  
**Author**: Senior AI Solution Architect & Tech Lead  

---

## 1. High-Level Architecture Overview

The **Industrial Knowledge Intelligence (IKI)** platform utilizes a modular microservice-inspired tier architecture comprising:
1. **Frontend Presentation Tier**: React 18 SPA built with Vite, Tailwind CSS, React Query, and Lucide Icons.
2. **API Gateway & Business Logic Tier**: Node.js + Express REST API managing user authorization (JWT + RBAC), Asset Hierarchy management, Metadata storage, Work Log CRUD, Incident/RCA tracking, Audit logging, and AI orchestration RPCs.
3. **Operational Database Tier**: MongoDB with Mongoose ORM storing User profiles, Asset nodes, Document metadata, Maintenance logs, Incident RCA reports, AI PM recommendations, Chat history, and Security audit logs.
4. **AI & Vector Intelligence Microservice**: Python 3.10+ FastAPI engine responsible for OCR (PyTesseract), text chunking, dense vector embeddings (`sentence-transformers`), Vector DB indexing (FAISS/ChromaDB), Hybrid Retrieval (RRF), Guardrails, and RAG answer generation.

---

## 2. Text Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 FRONTEND TIER                                     |
|                       React 18 + Vite SPA (Tailwind CSS)                          |
| [ Dashboard ] [ Asset Graph ] [ AI Chatbot ] [ Search ] [ Ingestion ] [ Incidents ]|
+------------------------------------------+----------------------------------------+
                                           | HTTP / REST (JWT Auth Header)
                                           v
+-----------------------------------------------------------------------------------+
|                             BUSINESS & API TIER                                   |
|                          Node.js / Express Gateway                                |
|  - Auth Middleware (JWT / RBAC)           - Asset Hierarchy Manager               |
|  - Document Metadata Service              - Maintenance & Incident Service        |
|  - Audit & Security Logger                - AI Microservice Proxy Client          |
+----------------------+-----------------------------------+------------------------+
                       |                                   |
        Mongoose Driver|                                   | HTTP / JSON (Internal RPC)
                       v                                   v
+-------------------------------+   +-----------------------------------------------+
|         DATA TIER             |   |                  AI TIER                      |
|         MongoDB               |   |        Python FastAPI Microservice            |
| - users         - assets      |   |  - Document Ingestion Pipeline (OCR/PyPDF)    |
| - documents     - worklogs    |   |  - Chunking & Tokenizer Engine                |
| - incidents     - audit_logs  |   |  - Embedding Engine (Sentence-Transformers)   |
| - chat_history  - recommendations |  - Vector Index Manager (FAISS / ChromaDB)     |
+-------------------------------+   |  - RAG Core (LangChain + Guardrails + LLM)    |
                                    +-----------------------------------------------+
```

---

## 3. Tier Deep-Dives & File Structure Alignment

### 3.1 Directory & File Layout
```
ET_industrial_ai/
├── docs/                        # Project Specifications & Living Documentation
├── frontend/                    # React 18 + Vite Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/              # Button, Card, Input, Modal, Badge, Dropdown
│   │   │   ├── layout/          # MainLayout, Navbar, Sidebar
│   │   │   ├── assets/          # AssetTree, AssetCard, AssetModal
│   │   │   ├── documents/       # UploadModal, DocumentTable, CitationDrawer
│   │   │   ├── chat/            # ChatWindow, ChatMessage, ConfidenceMeter
│   │   │   ├── search/          # SearchBar, SearchResultCard, SearchFilter
│   │   │   ├── analytics/       # KpiCard, QueryVolumeChart, LowConfidenceTable
│   │   │   ├── incidents/       # IncidentModal, IncidentTable, RcaCard
│   │   │   └── admin/           # UserTable, RoleModal, AuditLogViewer
│   │   ├── pages/               # Views (DashboardPage, AssetsPage, AssetDetailPage, etc.)
│   │   ├── context/             # AuthContext, ThemeContext
│   │   ├── hooks/               # useAuth, useAssets, useChat, useDocuments, useAnalytics
│   │   ├── services/            # apiClient, authService, assetService, aiService, etc.
│   │   ├── styles/              # index.css, theme.css
│   │   └── utils/               # formatters, constants, helpers
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js + Express REST API Gateway
│   ├── src/
│   │   ├── controllers/         # auth, user, asset, document, worklog, incident, ai, analytics, audit
│   │   ├── models/              # user, asset, document, maintenanceLog, incident, chatHistory, auditLog, recommendation
│   │   ├── routes/              # auth, user, asset, document, worklog, incident, ai, analytics, audit
│   │   ├── middleware/          # auth, rbac, upload, errorHandler, auditLogger
│   │   ├── services/            # aiServiceProxy, documentService
│   │   └── config/              # db.js, logger.js
│   ├── package.json
│   └── server.js
├── ai_service/                  # Python FastAPI AI Engine
│   ├── app/
│   │   ├── api/                 # chat, search, ingest, recommend, health
│   │   ├── core/                # config, prompts, vector_store, logger
│   │   ├── services/            # ocr_service, pdf_service, chunking_service, embedding_service, rag_service, recommendation_service
│   │   └── models/              # schemas.py
│   ├── requirements.txt
│   └── main.py
└── docker-compose.yml           # Multi-container orchestration
```

---

## 4. RAG Pipeline & Mathematical Formulation

### 4.1 Hybrid Retrieval Algorithm: Reciprocal Rank Fusion (RRF)
To prevent keyword-only or vector-only retrieval failure, candidate document chunks are retrieved via both dense vector similarity and sparse BM25 keyword matching, then combined using RRF:

$$RRF\_Score(d) = \sum_{m \in M} \frac{1}{k + r_m(d)}$$

Where:
- $M$ represents retrieval methods (Dense Vector Similarity and Sparse BM25 / Equipment Tag match).
- $r_m(d)$ is the rank position of document chunk $d$ in retrieval method $m$.
- $k$ is a constant smoothing hyperparameter set to $60$.

---

### 4.2 Confidence Score & Fallback Thresholds

Vector distance $d_{cos}$ is computed as:

$$d_{cos}(q, c) = 1 - \frac{\vec{q} \cdot \vec{c}}{\|\vec{q}\| \|\vec{c}\|}$$

Confidence Score Percentage ($CS$) is defined as:

$$CS = \max(0, 1 - d_{cos}(q, c)) \times 100\%$$

| Match Tier | Score Threshold | System Behavior |
| :--- | :--- | :--- |
| **High Confidence** | $CS \ge 85\%$ | LLM generates grounded answer with green badge citation pills. |
| **Medium Confidence** | $65\% \le CS < 85\%$ | LLM generates answer with amber caution badge and verification prompt. |
| **Low Confidence** | $CS < 65\%$ | System suppresses LLM generation and returns polite fallback: *"Information not found in plant knowledge base."* |

---

## 5. Sequence Diagrams

### 5.1 Authentication & RBAC Flow
```
User             Frontend SPA            Node API Gateway           MongoDB
 │                   │                          │                      │
 ├── Enter Credentials─►                        │                      │
 │                   ├── POST /api/v1/auth/login►│                     │
 │                   │                          ├── Find User By Email─►│
 │                   │                          │◄── User Record───────┤
 │                   │                          ├── Verify Password    │
 │                   │                          ├── Sign JWT Token     │
 │                   │◄── 200 OK (Token, User)──┤                      │
 │                   ├── Store Token in Local   │                      │
 │                   │   Storage / Context      │                      │
```

---

## 6. Complete API Endpoint Design Specification

### 6.1 Authentication & User Routes (`/api/v1/auth`, `/api/v1/users`)
- `POST /api/v1/auth/login`: Authenticate user & return JWT token.
- `POST /api/v1/auth/register`: Register new user (Admin only).
- `GET /api/v1/auth/me`: Get current user session profile.
- `GET /api/v1/users`: List all users with pagination and search (Admin only).
- `PUT /api/v1/users/:id/role`: Update user role assignment (Admin only).
- `DELETE /api/v1/users/:id`: Deactivate user account (Admin only).
- `PUT /api/v1/users/preferences`: Update user UI theme/preferences.

### 6.2 Asset Hierarchy Routes (`/api/v1/assets`)
- `GET /api/v1/assets/tree`: Fetch hierarchical plant tree.
- `GET /api/v1/assets`: Query asset list with filter parameters.
- `POST /api/v1/assets`: Create asset node.
- `GET /api/v1/assets/:id`: Fetch asset profile, specs, and linked docs.
- `PUT /api/v1/assets/:id`: Update asset details.
- `DELETE /api/v1/assets/:id`: Soft delete asset node.

### 6.3 Document Routes (`/api/v1/documents`)
- `POST /api/v1/documents/upload`: Upload file, metadata, and link asset IDs.
- `GET /api/v1/documents`: List documents with category and asset filters.
- `GET /api/v1/documents/:id`: Download / view document metadata.
- `DELETE /api/v1/documents/:id`: Remove document metadata and vector chunks.

### 6.4 Work Log & Incident Routes (`/api/v1/worklogs`, `/api/v1/incidents`)
- `GET /api/v1/worklogs`: Fetch maintenance work orders for an asset.
- `POST /api/v1/worklogs`: Create new maintenance log entry.
- `GET /api/v1/incidents`: Fetch RCA incident reports.
- `POST /api/v1/incidents`: Log new RCA incident post-mortem.

### 6.5 AI & RAG Routes (`/api/v1/ai`)
- `POST /api/v1/ai/chat`: Process natural language query via RAG engine.
- `POST /api/v1/ai/search`: Execute hybrid RRF search.
- `GET /api/v1/ai/recommendations/:assetId`: Synthesize AI preventive maintenance recommendations.
- `POST /api/v1/ai/ocr-reindex`: Trigger document re-ocr and vector indexing.

### 6.6 Analytics & Audit Routes (`/api/v1/analytics`, `/api/v1/audit-logs`)
- `GET /api/v1/analytics/kpis`: Fetch system-wide KPI metrics.
- `GET /api/v1/analytics/query-volume`: Fetch query activity over time.
- `GET /api/v1/analytics/low-confidence-logs`: Fetch low confidence queries for review.
- `GET /api/v1/audit-logs`: Fetch system security audit trail.

---

## 7. Complete Database Collections Registry (MongoDB Schemas)

```javascript
// Collection 1: users
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Plant Operator', 'Maintenance Engineer', 'Reliability Engineer', 'Safety Officer', 'Production Engineer', 'Plant Manager', 'Knowledge Admin', 'Admin'],
    required: true 
  },
  department: { type: String },
  isActive: { type: Boolean, default: true },
  preferences: { theme: { type: String, default: 'dark' } }
}, { timestamps: true });

// Collection 2: assets
const assetSchema = new Schema({
  assetCode: { type: String, required: true, unique: true, index: true }, // e.g. COMP-07
  name: { type: String, required: true },
  category: { type: String, required: true }, // Boiler, Pump, Compressor, Turbine
  parentAssetId: { type: Schema.Types.ObjectId, ref: 'Asset', default: null },
  location: { type: String },
  status: { type: String, enum: ['Operational', 'Under Maintenance', 'Failed', 'Decommissioned'], default: 'Operational' },
  specifications: { type: Map, of: String },
  installedDate: { type: Date }
}, { timestamps: true });

// Collection 3: documents
const documentSchema = new Schema({
  title: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'docx', 'txt', 'png', 'jpg'], required: true },
  docCategory: { type: String, enum: ['SOP', 'Manual', 'RCA', 'Safety', 'Maintenance Log', 'P&ID Drawing'], required: true },
  linkedAssetIds: [{ type: Schema.Types.ObjectId, ref: 'Asset' }],
  isScanned: { type: Boolean, default: false },
  chunkCount: { type: Number, default: 0 },
  ingestionStatus: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Failed'], default: 'Pending' },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Collection 4: maintenance_logs
const maintenanceLogSchema = new Schema({
  assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true, index: true },
  logType: { type: String, enum: ['Preventive', 'Breakdown', 'Inspection'], required: true },
  summary: { type: String, required: true },
  description: { type: String },
  technician: { type: String, required: true },
  performedAt: { type: Date, default: Date.now },
  partsReplaced: [{ type: String }],
  downtimeHours: { type: Number, default: 0 }
}, { timestamps: true });

// Collection 5: incidents
const incidentSchema = new Schema({
  assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
  title: { type: String, required: true },
  severity: { type: String, enum: ['Critical', 'Major', 'Minor'], required: true },
  eventDate: { type: Date, required: true },
  rootCause: { type: String, required: true },
  correctiveActions: [{ type: String }],
  reportedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Collection 6: recommendations
const recommendationSchema = new Schema({
  assetId: { type: Schema.Types.ObjectId, ref: 'Asset', required: true },
  recommendedActions: [{
    action: String,
    priority: { type: String, enum: ['High', 'Medium', 'Low'] },
    reasoning: String,
    suggestedIntervalDays: Number
  }],
  generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Collection 7: chat_history
const chatHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  sessionId: { type: String, required: true },
  userQuery: { type: String, required: true },
  aiAnswer: { type: String, required: true },
  confidenceScore: { type: Number, required: true },
  citations: [{
    docId: { type: Schema.Types.ObjectId, ref: 'Document' },
    docTitle: String,
    pageNumber: Number,
    snippet: String
  }]
}, { timestamps: true });

// Collection 8: audit_logs
const auditLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // AUTH_LOGIN, DOC_UPLOAD, DOC_DELETE, ROLE_CHANGE
  details: { type: String },
  ipAddress: { type: String },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });
```

---

## 8. Deployment & Scalability Strategy

1. **Docker Container Stack**:
   - `nginx`: Port 80/443 reverse proxy routing `/api` to Backend and static files to Frontend.
   - `frontend`: React SPA built with Vite PostCSS bundle.
   - `backend`: Node.js API Gateway cluster.
   - `ai_service`: Python FastAPI worker container with PyTesseract dependencies.
   - `mongo`: Persistent volume mapped database container.
2. **Indexing Strategy**: MongoDB compound indexes on `assetCode`, `linkedAssetIds`, `docCategory`, and `userId` guarantee sub-10ms query execution.
