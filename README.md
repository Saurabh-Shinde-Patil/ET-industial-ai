# Industrial Knowledge Intelligence – Unified Asset & Operations Brain

> **Economic Times AI Hackathon 2.0 – Problem Statement PS-8**  
> *Enterprise AI Platform for Unified Industrial Knowledge Management, Semantic Retrieval, Asset Insights, and Hallucination-Free Operations Assistance.*

---

## 🌟 Executive Overview

**Industrial Knowledge Intelligence (IKI)** is a next-generation enterprise AI platform designed to serve as the unified "knowledge brain" for modern manufacturing plants, process industries, and industrial facilities.

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
| **Routing** | **React Router v6** | Client-side routing with role-based route protection |
| **Icons** | **Lucide React** | Industrial vector icons |
| **Backend API** | **Node.js + Express** | High-throughput REST API gateway and business logic core |
| **Database** | **MongoDB + Mongoose** | Flexible document database for assets, users, logs, and metadata |
| **Auth** | **JWT + BCrypt** | Enterprise RBAC (Role-Based Access Control) authentication |
| **AI / ML Core** | **Python 3.12 + FastAPI** | Dedicated high-speed AI microservice engine |
| **Embeddings** | **Sentence-Transformers (`all-MiniLM-L6-v2`)** | 384-dim dense vector generation |
| **Vector DB** | **FAISS IndexFlatIP** | High-speed vector search index with metadata filtering |
| **OCR & Docs** | **Tesseract OCR + PyPDF2 / pdfplumber** | Extraction of text from scanned PDFs, images, and tables |
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
                                                   │ FAISS Vector  │ │ OCR &    │
                                                   │     DB        │ │ Pipeline │
                                                   └───────────────┘ └──────────┘
```

---

## 📁 Repository Directory Structure

```
ET_industrial_ai/
├── docs/                        # Complete System Architecture & Engineering Docs
│   ├── ET_Industrial_AI_Technical_Report.pdf   # Complete Prototype Submission Document (PDF)
│   ├── ET_Industrial_AI_Technical_Report.docx  # Complete Prototype Submission Document (Word)
│   ├── PRD.md                   # Product Requirements Document
│   ├── Architecture.md          # Technical Architecture & Data Flows
│   └── README.md                # Documentation Index
├── frontend/                    # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable UI components (Cards, Tables, Modals)
│   │   ├── pages/               # Views (Dashboard, Chat, Search, Assets, Docs, Analytics)
│   │   ├── context/             # Auth & Theme State
│   │   ├── services/            # Axios API Clients
│   │   └── styles/              # Global CSS & Tailwind custom tokens
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js + Express REST API Gateway
│   ├── src/
│   │   ├── controllers/         # Request handling & HTTP response logic
│   │   ├── models/              # Mongoose database schemas
│   │   ├── routes/              # Express API endpoints
│   │   ├── middleware/          # JWT auth, RBAC, error handling, validation
│   │   └── utils/               # Database connect & seeders
│   ├── package.json
│   └── server.js
├── ai_service/                  # Python FastAPI Vector & RAG Engine
│   ├── app/
│   │   ├── api/                 # FastAPI routers (chat, search, embed, rca, pm)
│   │   ├── services/            # OCR, Chunking, Embedding, RAG generation
│   │   └── data/                # FAISS vector index & metadata persistence
│   ├── requirements.txt
│   └── main.py
└── docker-compose.yml           # Unified orchestration for DB, Backend, AI, Frontend
```

---

## 🛠️ Quickstart Installation & Setup

### Prerequisites
- Node.js >= 18.x
- Python >= 3.10
- MongoDB Community Server >= 6.0 (or MongoDB Atlas)
- Docker & Docker Compose (optional)

### Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/Saurabh-Shinde-Patil/ET-industrial-ai.git
   cd ET-industrial-ai
   ```

2. **Start Python AI Microservice (Port 8000)**
   ```bash
   cd ai_service
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```

3. **Start Node.js API Gateway (Port 5000)**
   ```bash
   cd ../backend
   npm install
   npm run dev
   ```

4. **Start Frontend Client (Port 5173)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

5. **Docker Production Launch**
   ```bash
   docker-compose up --build -d
   ```

---

## 📜 License & Acknowledgments

Developed for the **Economic Times AI Hackathon 2.0 (Problem Statement 8)**.  
Built to empower industrial personnel with safe, accurate, and instant operational intelligence.
