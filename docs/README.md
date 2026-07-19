# Industrial Knowledge Intelligence – Unified Asset & Operations Brain

> **Economic Times AI Hackathon 2.0 – Problem Statement PS-8**  
> *Enterprise AI Platform for Unified Industrial Knowledge Management, Semantic Retrieval, Asset Insights, and Hallucination-Free Operations Assistance.*

---

## 🌟 Executive Overview

**Industrial Knowledge Intelligence (IKI)** is a next-generation enterprise AI platform designed to serve as the unified "knowledge brain" for modern manufacturing plants, process industries, and industrial plants. 

In enterprise industrial settings, critical operational knowledge is highly fragmented across disparate systems and formats—unstructured standard operating procedures (SOPs), equipment manuals, historical maintenance logs, root cause analysis (RCA) reports, engineering P&ID drawings, safety sheets, and shift handover notes. When equipment fails or critical operations occur, engineers and operators waste valuable hours searching through scattered manuals and databases.

**Unified Asset & Operations Brain** solves this by ingesting, digitizing, chunking, indexing, and linking all enterprise assets and documents into a high-performance vector-relational knowledge engine. Powered by Retrieval-Augmented Generation (RAG), high-accuracy OCR, semantic hybrid search, and strict citation-based AI guardrails, field personnel can query the plant's collective intelligence in natural language with **zero AI hallucinations**.

---

## 🎯 Key Objectives

1. **Unify Fragmented Industrial Knowledge**: Ingest SOPs, equipment manuals, maintenance histories, RCA reports, P&ID/engineering drawings, safety documents, and sensor metadata into a single searchable brain.
2. **Zero-Hallucination RAG Architecture**: Guarantee that every AI answer is strictly grounded in retrieved plant documentation, accompanied by exact source document name, page number, and paragraph citations.
3. **Hierarchy-Aware Asset Brain**: Model physical assets (Plants -> Units -> Systems -> Asset Equipment -> Subcomponents) and link maintenance logs, incidents, and documentation directly to specific equipment nodes.
4. **Prescriptive & Preventive Intelligence**: Intelligently analyze historical incident data and maintenance patterns to recommend proactive PM (Preventive Maintenance) schedules and troubleshooting workflows.
5. **Role-Tailored Enterprise UI/UX**: Provide sleek, high-density, accessible interfaces tailored for Operators, Reliability Engineers, Safety Officers, and Plant Managers.

---

## 🏗️ Technology Stack

| Domain | Technology / Library | Description |
| :--- | :--- | :--- |
| **Frontend UI** | **React 18 + Vite** | High-performance component-driven Single Page Application |
| **Styling** | **Tailwind CSS + Custom CSS Variables** | Custom dark/light industrial design system with micro-animations |
| **State & Fetching** | **React Query (TanStack Query v5)** | Client caching, optimistic updates, and API query management |
| **Routing** | **React Router v6** | Client-side routing with role-based route protection |
| **Icons & Charts** | **Lucide React + Recharts** | Industrial vector icons and interactive operational analytics charts |
| **Backend API** | **Node.js + Express** | High-throughput REST API gateway and business logic core |
| **Database** | **MongoDB + Mongoose** | Flexible document database for assets, users, logs, and metadata |
| **Auth** | **JWT + BCrypt** | Enterprise RBAC (Role-Based Access Control) authentication |
| **AI / ML Core** | **Python 3.10+ + FastAPI** | Dedicated high-speed AI microservice engine |
| **Orchestration** | **LangChain / LlamaIndex** | RAG pipeline, prompt templates, context retrieval guardrails |
| **Embeddings** | **Sentence-Transformers (`all-mpnet-base-v2` / `bge-large-en-v1.5`)** | 768/1024-dim dense vector generation |
| **Vector DB** | **FAISS / ChromaDB** | High-speed vector search index with metadata filtering |
| **LLM Inference** | **Ollama (Local Llama 3 / Mistral) / OpenAI API** | Contextual summary & answer generation |
| **OCR & Docs** | **PyTesseract / EasyOCR + PyPDF2 / pdfplumber** | Extraction of text from scanned PDFs, images, and tables |
| **DevOps** | **Docker + Docker Compose + Nginx** | Containerized microservice deployment and reverse proxying |

---

## 📐 Architecture Summary

```
                       ┌──────────────────────────────────────────────┐
                       │        React + Vite Frontend Client          │
                       │    (Operators, Engineers, Managers, Admin)   │
                       └──────────────────────┬───────────────────────┘
                                              │ REST / JSON (JWT)
                                              ▼
                       ┌──────────────────────────────────────────────┐
                       │           Node.js / Express API Gateway       │
                       │       (Business Logic, RBAC, Asset Graph)    │
                       └──────────────┬────────────────┬──────────────┘
                                      │                │
                        MongoDB Calls │                │ Microservice RPC
                                      ▼                ▼
                       ┌──────────────────────┐ ┌─────────────────────┐
                       │   MongoDB Database   │ │ Python FastAPI AI   │
                       │ (Assets, Docs, Logs, │ │    Microservice     │
                       │  Users, Analytics)   │ └──────────┬──────────┘
                       └──────────────────────┘            │
                                                           ├───────────────┐
                                                           ▼               ▼
                                                   ┌───────────────┐ ┌──────────┐
                                                   │ FAISS/Chroma  │ │ OCR &    │
                                                   │  Vector DB    │ │ Pipeline │
                                                   └───────────────┘ └──────────┘
```

---

## 📁 Repository Directory Structure

```
ET_industrial_ai/
├── docs/                        # Complete System Architecture & PRD Documentation
│   ├── README.md                # Project Overview & Quickstart
│   ├── PRD.md                   # Product Requirements Document
│   ├── Architecture.md          # Technical Architecture & Data Flows
│   ├── Rules.md                 # Strict Development Standards & Guardrails
│   ├── Phases.md                # 15-Phase Execution Plan & Checklists
│   ├── Design.md                # Design System & UI/UX Guidelines
│   └── Memory.md                # Living Project Log & Decision Registry
├── frontend/                    # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI components (Cards, Tables, Modals)
│   │   ├── pages/               # Views (Dashboard, Chat, Search, Assets, Docs, Analytics)
│   │   ├── context/             # Auth & Theme State
│   │   ├── hooks/               # Custom React Hooks & React Query integrations
│   │   ├── services/            # Axios API Clients
│   │   ├── styles/              # Global CSS & Tailwind custom tokens
│   │   └── utils/               # Formatting, constants & helpers
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js + Express REST API Gateway
│   ├── src/
│   │   ├── controllers/         # Request handling & HTTP response logic
│   │   ├── models/              # Mongoose database schemas
│   │   ├── routes/              # Express API endpoints
│   │   ├── middleware/          # JWT auth, RBAC, error handling, validation
│   │   ├── services/            # Business logic & AI service integration
│   │   └── utils/               # Database connect & logger
│   ├── package.json
│   └── server.js
├── ai_service/                  # Python FastAPI Vector & RAG Engine
│   ├── app/
│   │   ├── api/                 # FastAPI routers (chat, search, ingest, recommend)
│   │   ├── core/                # Config, vector store manager, model loaders
│   │   ├── services/            # OCR, Chunking, Embedding, RAG generation
│   │   └── models/              # Pydantic schemas
│   ├── requirements.txt
│   └── main.py
└── docker-compose.yml           # Unified orchestration for DB, Backend, AI, Frontend
```

---

## 🛠️ Setup Overview

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- MongoDB Community Server >= 6.0 (or MongoDB Atlas)
- Tesseract OCR engine (installed on host OS for scanned document processing)
- Docker & Docker Compose (optional for containerized deployment)

### Local Environment Setup

1. **Clone & Environment Setup**
   ```bash
   cd ET_industrial_ai
   ```

2. **Backend Setup (Node.js)**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **AI Service Setup (Python)**
   ```bash
   cd ../ai_service
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```

4. **Frontend Setup (React)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 🔄 Development Workflow

- **Branching Strategy**: `main` (stable production), `develop` (staging/integration), `feature/<phase-number>-<feature-name>`.
- **Commit Format**: Follow Conventional Commits (e.g., `feat(rag): add confidence score threshold filtering`, `fix(auth): update token expiration check`).
- **Memory Maintenance**: Update [`docs/Memory.md`](file:///p:/projects/hackathon_projects/ET_industrial_ai/docs/Memory.md) after completing every feature or architectural change.

---

## 📜 License & Acknowledgments

Developed for the **Economic Times AI Hackathon 2.0 (Problem Statement 8)**.  
Built to empower industrial personnel with safe, accurate, and instant operational intelligence.
