# System Architecture Specification

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.0.0  
**Author**: Senior AI Solution Architect & Tech Lead  

---

## 1. High-Level Architecture Overview

The **Industrial Knowledge Intelligence (IKI)** platform utilizes a modular, microservice-inspired tier architecture comprising:
1. **Frontend Presentation Tier**: React 18 SPA built with Vite, Tailwind CSS, React Query, and Lucide Icons.
2. **API Gateway & Business Logic Tier**: Node.js + Express REST API managing user authorization (JWT + RBAC), Asset Hierarchy management, Metadata storage, Work Log CRUD, and AI orchestration RPCs.
3. **Operational Database Tier**: MongoDB with Mongoose ORM storing User profiles, Asset nodes, Document metadata, Maintenance logs, Incident reports, Audit logs, and Analytics logs.
4. **AI & Vector Intelligence Microservice**: Python 3.10+ FastAPI engine responsible for OCR (PyTesseract), text chunking, dense vector embeddings (`sentence-transformers`), Vector DB indexing (FAISS/ChromaDB), Hybrid Retrieval, Guardrails, and RAG answer generation.

---

## 2. Text Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 FRONTEND TIER                                     |
|                       React 18 + Vite SPA (Tailwind CSS)                          |
|  [ Dashboard ]  [ Asset Graph ]  [ AI Chatbot ]  [ Search ]  [ Ingestion ]        |
+------------------------------------------+----------------------------------------+
                                           | HTTP / REST (JWT Auth Header)
                                           v
+-----------------------------------------------------------------------------------+
|                             BUSINESS & API TIER                                   |
|                          Node.js / Express Gateway                                |
|  - Auth Middleware (JWT / RBAC)           - Asset Hierarchy Manager               |
|  - Document Metadata Service              - Maintenance & Incident Service        |
|  - Analytics & Audit Logger               - AI Microservice Proxy Client          |
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
| - chat_history  - analytics   |   |  - Vector Index Manager (FAISS / ChromaDB)     |
+-------------------------------+   |  - RAG Core (LangChain + Guardrails + LLM)    |
                                    +-----------------------------------------------+
```

---

## 3. Tier Deep-Dives

### 3.1 Frontend Architecture (React + Vite)
- **State Management**: React Query (TanStack Query v5) for server state caching, invalidation, and polling; React Context API for global Authentication (`AuthContext`) and Theme (`ThemeContext`).
- **Routing**: `react-router-dom` v6 with protected layout wrappers (`ProtectedRoute`, `RoleGuard`).
- **UI Components**: Atomic design structure (`components/ui` for primitives like Button, Card, Badge; `components/domain` for AssetTree, ChatWindow, CitationDrawer, AnalyticsCharts).
- **HTTP Client**: Axios instance configured with base URL, request interceptors (attaching JWT bearer token), and response interceptors (handling 401 token refresh/logout).

### 3.2 Backend API Architecture (Node.js + Express)
- **Controller-Service-Repository Pattern**: Clean separation of routes, request controllers, business services, and database data models.
- **Middleware Chain**:
  - `corsMiddleware`: Cross-origin request handling.
  - `helmet`: HTTP header security.
  - `jwtAuth`: Verification of JWT token in `Authorization` header.
  - `rbacGuard(roles)`: Enforcement of required user roles.
  - `errorHandler`: Standardized error envelope formatter.

### 3.3 AI Microservice Architecture (Python + FastAPI)
- **FastAPI Core**: Async non-blocking API endpoints for document ingestion, vector searching, RAG generation, and recommendation synthesis.
- **Ingestion & OCR Engine**:
  - `pdfplumber` / `PyPDF2` for native text PDFs.
  - `pytesseract` / `EasyOCR` with OpenCV preprocessing for scanned paper documents and drawings.
- **Vector Index Engine**:
  - Local persistent FAISS / ChromaDB index.
  - Vector similarity metric: Cosine Similarity / Inner Product (`IndexFlatIP` after L2 normalization).
- **LLM Integration Layer**:
  - Local inference via `Ollama` (Llama-3 8B / Mistral 7B) or fallback to `OpenAI API`.
  - Prompt Template with strict system guardrails enforcing document citations and zero external speculation.

---

## 4. Pipeline Data Flows

### 4.1 Document Processing & Vector Embedding Pipeline

```
  [ Upload Document ]
          │
          ▼
  [ Node.js API ] ──(Save File & Metadata)──► [ MongoDB ]
          │
          ├─────────────────────────────────────────────────┐
          │ Send Ingestion Task                             │
          ▼                                                 │
  [ FastAPI AI Service ]                                    │
          │                                                 │
          ├──► Is Scanned / Image? ──YES──► [ OCR Engine ] ─┤
          │         │                                       │
          │        NO                                       │
          │         ▼                                       │
          ├──► [ Text Extractor (PyPDF) ] ──────────────────┤
          │                                                 │
          ▼                                                 │
  [ Cleaning & Normalization ] ◄────────────────────────────┘
          │
          ▼
  [ Chunking Engine ] (Recursive Split: 500 tokens, 100 overlap)
          │
          ▼
  [ Embedding Engine ] (`all-mpnet-base-v2` -> 768-dim Vector)
          │
          ▼
  [ Vector DB (FAISS/Chroma) ] ◄── Store Vectors + Chunk Metadata
                                   (DocID, AssetID, Page, Text)
```

---

### 4.2 Retrieval-Augmented Generation (RAG) Flow

```
  [ Operator Query: "Why did Compressor-7 trip last month?" ]
                             │
                             ▼
                    [ Frontend Client ]
                             │
                             ▼
                    [ Node.js API Gateway ]
                             │
                             ▼
                    [ FastAPI AI Service ]
                             │
       ┌─────────────────────┴─────────────────────┐
       ▼                                           ▼
[ Dense Vector Search ]                  [ Sparse Keyword Search ]
(FAISS Cosine Similarity)                (Asset Code & Tag Match)
       │                                           │
       └─────────────────────┬─────────────────────┘
                             ▼
                 [ Hybrid Reciprocal Rank Fusion ]
                             │
                             ▼
                [ Top K Context Chunks (k=5) ]
                             │
                             ▼
                [ Confidence Score Evaluator ]
                             │
                 ┌───────────┴───────────┐
                 │                       │
      Score >= 0.60             Score < 0.60
                 │                       │
                 ▼                       ▼
   [ Strict RAG Prompt Builder ]  [ Polite Low-Confidence Fallback ]
   (Inject Context & Citations)   ("Insufficient data in plant docs")
                 │
                 ▼
     [ LLM Inference Engine ]
                 │
                 ▼
     [ Response Post-Processor ] (Extract inline citations & safety alerts)
                 │
                 ▼
    [ Return Answer + Citations + Confidence score to User ]
```

---

## 5. Sequence Diagrams

### 5.1 Authentication Flow
```
User             Frontend SPA            Node API Gateway           MongoDB
 │                   │                          │                      │
 ├── Enter Credentials─►                        │                      │
 │                   ├── POST /api/auth/login──►│                      │
 │                   │                          ├── Find User By Email─►│
 │                   │                          │◄── User Record───────┤
 │                   │                          ├── Verify Password    │
 │                   │                          ├── Sign JWT Token     │
 │                   │◄── 200 OK (Token, User)──┤                      │
 │                   ├── Store Token in Local   │                      │
 │                   │   Storage / Context      │                      │
```

### 5.2 Document Ingestion Flow
```
Admin            Frontend SPA            Node Gateway          FastAPI AI          FAISS Vector DB
 │                    │                       │                    │                      │
 ├── Select File &───►│                       │                    │                      │
 │   Asset Link       ├── POST /api/docs ────►│                    │                      │
 │                    │   (multipart/form)    ├── Save File & DB───►│                      │
 │                    │                       ├── POST /ingest ───►│                      │
 │                    │                       │   to AI Service    ├── Run OCR / PyPDF───┐│
 │                    │                       │                    │◄── Chunk Text ────┘│
 │                    │                       │                    ├── Embed Chunks ────┐│
 │                    │                       │                    │◄── 768-dim Vectors─┘│
 │                    │                       │                    ├── Add Vectors ──────►│
 │                    │                       │◄── Ingestion Done──┤                      │
 │◄── Status Updated ─┼◄── Upload Success ────┤                    │                      │
```

---

## 6. API Endpoint Design Specification

### 6.1 Authentication Endpoints (`/api/v1/auth`)
- `POST /login`: Authenticate user credentials & issue JWT token.
- `POST /register`: Admin registration of new plant personnel.
- `GET /me`: Fetch currently authenticated user profile & permissions.

### 6.2 Asset Management Endpoints (`/api/v1/assets`)
- `GET /`: Retrieve hierarchical tree of all plant assets.
- `POST /`: Create a new asset node.
- `GET /:id`: Fetch asset details, specifications, linked documents, and work log history.
- `PUT /:id`: Update asset metadata.
- `DELETE /:id`: Soft delete asset.

### 6.3 Document Management Endpoints (`/api/v1/documents`)
- `POST /upload`: Upload document file with metadata and asset associations.
- `GET /`: Query/filter list of documents (by asset, doc type, date).
- `GET /:id`: Fetch document details & file download stream.
- `DELETE /:id`: Remove document and purge associated vector chunks.

### 6.4 AI & Knowledge Intelligence Endpoints (`/api/v1/ai`)
- `POST /chat`: Execute natural language RAG query with conversation history.
- `POST /search`: Execute hybrid semantic/keyword search across vector index.
- `GET /recommendations/:assetId`: Generate AI preventive maintenance recommendations.
- `POST /ocr-reindex`: Trigger manual OCR extraction and re-embedding for a document.

---

## 7. Database Collection Schema Design (MongoDB)

```javascript
// Collection: users
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  role: String, // 'Plant Operator', 'Maintenance Engineer', 'Admin', etc.
  department: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Collection: assets
{
  _id: ObjectId,
  assetCode: String, // e.g., 'COMP-07'
  name: String, // e.g., 'Main Gas Compressor'
  category: String, // 'Compressor', 'Pump', 'Boiler', 'Turbine'
  parentAssetId: ObjectId, // Null if top-level plant unit
  location: String, // 'Building A - Sector 3'
  status: String, // 'Operational', 'Under Maintenance', 'Failed'
  specifications: Map,
  installedDate: Date,
  createdAt: Date
}

// Collection: documents
{
  _id: ObjectId,
  title: String,
  fileName: String,
  filePath: String,
  fileType: String, // 'pdf', 'docx', 'png'
  docCategory: String, // 'SOP', 'Manual', 'RCA', 'Safety', 'Maintenance Log'
  linkedAssetIds: [ObjectId],
  isScanned: Boolean,
  chunkCount: Number,
  ingestionStatus: String, // 'Pending', 'Processing', 'Completed', 'Failed'
  uploadedBy: ObjectId,
  createdAt: Date
}

// Collection: maintenance_logs
{
  _id: ObjectId,
  assetId: ObjectId,
  logType: String, // 'Preventive', 'Breakdown', 'Inspection'
  summary: String,
  description: String,
  technician: String,
  performedAt: Date,
  partsReplaced: [String],
  downtimeHours: Number,
  createdAt: Date
}

// Collection: chat_history
{
  _id: ObjectId,
  userId: ObjectId,
  sessionId: String,
  userQuery: String,
  aiAnswer: String,
  confidenceScore: Number,
  citations: [
    {
      docId: ObjectId,
      docTitle: String,
      pageNumber: Number,
      snippet: String
    }
  ],
  createdAt: Date
}
```

---

## 8. Deployment & Containerization Architecture

```
                       ┌──────────────────────────────────────┐
                       │          Nginx Reverse Proxy         │
                       │           (Port 80 / 443)            │
                       └──────────────────┬───────────────────┘
                                          │
                   ┌──────────────────────┴──────────────────────┐
                   │                                             │
                   ▼                                             ▼
        ┌─────────────────────┐                       ┌─────────────────────┐
        │  Frontend Container │                       │  Backend Container  │
        │   (Nginx static)    │                       │  (Node.js Gateway)  │
        └─────────────────────┘                       └──────────┬──────────┘
                                                                 │
                                          ┌──────────────────────┴──────────────────────┐
                                          ▼                                             ▼
                               ┌─────────────────────┐                       ┌─────────────────────┐
                               │    MongoDB Container│                       │ AI Service Container│
                               │   (Data Directory)  │                       │  (FastAPI + FAISS)  │
                               └─────────────────────┘                       └─────────────────────┘
```

---

## 9. Scalability & Resilience Strategy

1. **Stateless AI Processing**: The FastAPI AI microservice stores vector embeddings in a shared persistent volume or ChromaDB cluster, allowing API workers to scale horizontally behind a load balancer.
2. **Asynchronous Ingestion Queues**: Large PDF manual processing is handed off asynchronously so user API calls do not timeout.
3. **Database Indexing**: Compound indexes on MongoDB collections (`assetCode`, `linkedAssetIds`, `docCategory`) ensure sub-10ms metadata query execution.
