# Product Requirement Document (PRD)

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence: Unified Asset & Operations Brain  
**Document Version**: 1.1.0 (Architecture Review & Cross-Alignment Verified)  
**Author**: Senior Product Manager & AI Solution Architect  
**Status**: Approved for Execution  

---

## 1. Executive Summary & Problem Statement

### 1.1 Context & Background
Modern manufacturing facilities, power generation plants, petrochemical refineries, and heavy industrial sites generate vast amounts of unstructured and semi-structured knowledge daily. This includes:
- Equipment Operation & Maintenance Manuals
- Standard Operating Procedures (SOPs)
- Historical Work Orders & Maintenance Logs
- Root Cause Analysis (RCA) Reports & Incident Post-Mortems
- Piping & Instrumentation Diagrams (P&IDs) and Engineering Drawings
- Safety Data Sheets (SDS) & Regulatory Compliance Records
- Shift Handover Logs & Operator Shift Notes

### 1.2 The Problem
Currently, this knowledge is locked in fragmented silos: physical paper binders, scattered network shared drives, legacy enterprise asset management (EAM) databases, or simply inside the heads of senior technicians near retirement. 

When a critical operational event happens—such as **Boiler-3 tripping**, **Pump-102 overheating**, or **Compressor-7 throwing a vibration alert**:
1. Operators and engineers lose crucial minutes or hours hunting through thousands of manual pages.
2. Junior personnel lack instant access to past RCA reports detailing how similar failures were previously solved.
3. Traditional keyword search fails because it cannot handle industrial domain semantics, equipment code synonyms, or unstructured PDF tables.
4. Generative AI tools without strict grounding produce dangerous "hallucinations" that compromise plant safety and cause costly equipment downtime.

### 1.3 The Solution: Unified Asset & Operations Brain
An enterprise-grade, zero-hallucination Industrial AI platform that ingests, digitizes, vectorizes, and correlates all plant documentation with the physical asset hierarchy. Users query the system using natural language (e.g., *"Why did Compressor-7 fail last year and what SOP is required before restarting it?"*) and receive precise, verified answers with inline source document citations, page references, confidence scores, and safety warnings.

---

## 2. Business Goals & Strategic Objectives

| Goal ID | Objective | Key Metric / Target |
| :--- | :--- | :--- |
| **BG-1** | **Reduce Mean Time To Repair (MTTR)** | Decrease technician troubleshooting time by **40%** by instantly retrieving exact repair procedures and RCA history. |
| **BG-2** | **Eliminate AI Hallucinations** | Achieve **100% strict context grounding**; zero unverified responses generated. |
| **BG-3** | **Digitize Legacy Industrial Knowledge** | Convert 100% of scanned PDFs, paper manuals, and tables into searchable vector structures via OCR. |
| **BG-4** | **Prevent Unplanned Equipment Downtime** | Provide proactive AI recommendations based on historical RCA and maintenance frequency analysis. |
| **BG-5** | **Enhance Plant Safety & Compliance** | Automatically surface Safety Warnings and pre-start checklist requirements prior to operational actions. |
| **BG-6** | **Security & Auditability** | 100% immutable audit logging for all document updates, role changes, and AI query interactions. |

---

## 3. Target Users & Detailed User Personas

### 3.1 User Roles Overview (8 Predefined RBAC Roles)
1. **Plant Operator**: Frontline staff monitoring real-time plant state; needs quick SOPs and pre-start checklists.
2. **Maintenance Engineer**: Mechanical/Electrical engineers fixing equipment failures; needs manual diagrams, specs, and work order history.
3. **Reliability Engineer**: Long-term asset health analysis; needs RCA patterns, vibration trends, and failure frequency.
4. **Safety Officer**: Audits regulatory compliance, hazard containment, and lockdown procedure validation.
5. **Production Engineer**: Optimizes operational parameters and shift handovers.
6. **Plant Manager**: High-level overview of asset health, knowledge coverage, incident analytics, and team efficiency.
7. **Knowledge Administrator**: Uploads documents, triggers OCR re-indexing, validates embeddings, and configures vector stores.
8. **System Admin**: Manages user roles, access rights, system security, and API keys.

---

### 3.2 User Personas

#### Persona 1: Rajesh Sharma – Senior Maintenance Engineer
- **Age**: 44 | **Experience**: 18 Years in Heavy Machinery
- **Pain Point**: Spends 30+ minutes digging through dusty binders or 500-page vendor PDF manuals whenever an old centrifugal pump exhibits seal failure.
- **Goal**: Type a quick query on a rugged mobile tablet or laptop while standing near the asset, get the exact bolt torque specs, gasket replacement steps, and relevant past work log notes in under 5 seconds.

#### Persona 2: Ananya Roy – Reliability Engineer
- **Age**: 31 | **Experience**: 7 Years in Industrial Automation
- **Pain Point**: Identifying recurring failure patterns across 50+ electric motors requires tedious cross-referencing of manual Excel work logs and paper shift notes.
- **Goal**: Ask the system *"Which compressors failed more than twice in the past 12 months due to bearing overheating?"* and receive a structured failure analysis breakdown with recommendations.

#### Persona 3: Vikram Patel – Plant Operator
- **Age**: 28 | **Experience**: 3 Years in Operations
- **Pain Point**: Fear of missing critical safety checklist steps when performing emergency warm-up of Boiler-3.
- **Goal**: Immediate access to the step-by-step verified pre-start SOP with mandatory safety warnings highlighted before turning valve controls.

---

## 4. Complete User Stories Matrix

| Story ID | Persona | Story Statement | Feature Module | Acceptance Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **US-01** | Maintenance Engineer | As a Maintenance Engineer, I want to search for an asset's maintenance history using its equipment code (e.g., `PUMP-102`), so that I can see past repairs and part replacements. | Asset Management / History | System returns chronological list of work logs, RCA reports, and exact document source links. |
| **US-02** | Plant Operator | As a Plant Operator, I want to ask for the exact starting SOP for Boiler-3 in natural language, so that I follow safe startup procedures. | AI Chat / RAG | System displays step-by-step SOP text, safety warnings, and PDF page citation. |
| **US-03** | Reliability Engineer | As a Reliability Engineer, I want the AI to analyze past failure trends and suggest preventive maintenance actions, so that I can prevent unplanned downtime. | AI Recommendations | AI surfaces failure trends, confidence scores, and recommended inspection schedules. |
| **US-04** | Knowledge Admin | As a Knowledge Admin, I want to upload PDF equipment manuals (including scanned PDFs), so that the system extracts text via OCR, chunks it, and updates vector indexes. | Document Upload / OCR | Progress indicator shows OCR extraction, chunking, embedding generation, and FAISS/Chroma confirmation. |
| **US-05** | Safety Officer | As a Safety Officer, I want all AI answers regarding hazardous materials or dangerous machinery to explicitly highlight mandatory safety guidelines. | AI Safety Guardrails | Safety alerts are formatted in high-visibility warning badges with source document references. |
| **US-06** | Plant Manager | As a Plant Manager, I want to view an analytics dashboard showing document coverage, search volume, top queried assets, and system accuracy metrics. | Industrial Analytics | Dashboard renders real-time charts powered by MongoDB aggregation queries. |
| **US-07** | Reliability Engineer | As a Reliability Engineer, I want to log Root Cause Analysis (RCA) incident post-mortems and link them to equipment nodes, so that future failures leverage past lessons. | Incident / RCA Module | Incident form saves RCA text, root causes, corrective actions, and tags asset node. |
| **US-08** | System Admin | As a System Admin, I want to view audit logs of all user authentication events, role changes, and document deletions, so that enterprise compliance is maintained. | Security & Audit Logs | Audit table displays timestamp, user ID, action type, IP address, and details. |

---

## 5. Detailed Functional Requirements

### 5.1 Authentication & Role-Based Access Control (RBAC)
- **FR-AUTH-1**: User login with email/username and password using JWT authentication.
- **FR-AUTH-2**: Support 8 predefined roles: `Plant Operator`, `Maintenance Engineer`, `Reliability Engineer`, `Safety Officer`, `Production Engineer`, `Plant Manager`, `Knowledge Admin`, `Admin`.
- **FR-AUTH-3**: Granular feature permission mapping (e.g., only `Knowledge Admin` and `Admin` can upload/delete documents or trigger re-indexing).

### 5.2 Plant Asset Hierarchy & Asset Brain
- **FR-ASSET-1**: Hierarchical modeling of physical plant assets (Site -> Area -> System -> Asset -> Sub-component).
- **FR-ASSET-2**: Dedicated Asset Detail page displaying linked documents, maintenance history, active alerts, technical specs, and AI knowledge search scoped specifically to that asset.
- **FR-ASSET-3**: Support for custom tags, equipment codes (e.g., `COMP-7`, `PUMP-102`), manufacturer info, and install dates.

### 5.3 Document Ingestion & Management
- **FR-DOC-1**: Support multi-format document upload (`.pdf`, `.txt`, `.docx`, `.png`, `.jpg`).
- **FR-DOC-2**: Document categorization by type (SOP, Manual, RCA, Maintenance Log, P&ID Drawing, Safety Sheet, Incident Report).
- **FR-DOC-3**: Document-to-Asset linking (associating documents with specific assets or entire plant systems).
- **FR-DOC-4**: Document metadata editing, version tracking, and soft-deletion.

### 5.4 OCR & Processing Pipeline
- **FR-OCR-1**: Automatic detection of scanned image-based PDFs or image uploads (`.png`, `.jpg`).
- **FR-OCR-2**: High-accuracy text extraction using PyTesseract / EasyOCR with preprocessing (contrast enhancement, deskewing).
- **FR-OCR-3**: Table structure extraction from manuals to preserve tabular specs (e.g., pressure thresholds, electrical ratings).

### 5.5 Chunking, Vector Embeddings & Indexing
- **FR-VEC-1**: Context-aware chunking strategy (Recursive Character Text Splitter with 500-1000 token chunk size and 100-200 token overlap).
- **FR-VEC-2**: Dense vector embedding generation using `all-mpnet-base-v2` or `bge-large-en-v1.5` (768 / 1024 dimension vectors).
- **FR-VEC-3**: Indexing in vector database (FAISS / ChromaDB) enriched with metadata attributes (Asset ID, Doc Type, Page Number, Upload Date, Security Level).

### 5.6 RAG Core Engine & AI Chatbot
- **FR-RAG-1**: Natural language chat interface with conversational context memory.
- **FR-RAG-2**: Hybrid Search (combining dense vector similarity with keyword BM25/regex matching on asset codes).
- **FR-RAG-3**: Strict Retrieval-Augmented Generation: Prompt instructions strictly command the LLM to rely ONLY on retrieved context chunks.
- **FR-RAG-4**: Mandatory inline citations: Every statement must reference `[Doc Name, Page X, Para Y]`.
- **FR-RAG-5**: Confidence Score Calculation: Compute similarity match percentage and surface confidence level (`High (>85%)`, `Medium (65-85%)`, `Low (<65%)`).
- **FR-RAG-6**: Out-of-bounds / Unknown query handling: If context match score is below 60%, system must answer: *"Information not found in plant knowledge base. Please consult a domain expert or upload relevant manual."*

### 5.7 Prescriptive & Preventive Maintenance Recommendations
- **FR-REC-1**: Automated analysis of historical maintenance logs and RCA reports linked to an asset.
- **FR-REC-2**: AI-generated preventive maintenance checklists, component replacement warnings, and inspection frequency recommendations.

### 5.8 Incident & RCA Management
- **FR-INC-1**: Incident logging form capturing failure event date, severity (`Critical`, `Major`, `Minor`), equipment code, root cause summary, and corrective actions taken.
- **FR-INC-2**: Automatic OCR parsing and vector indexing of uploaded PDF RCA reports so historical incidents are instantly retrievable in AI Chat.

### 5.9 Audit Logging & Compliance
- **FR-AUD-1**: Immutable backend audit logging of all authentication events, role modifications, document uploads, document deletions, and low-confidence AI queries.
- **FR-AUD-2**: System Admin view for searching and filtering security audit records by date range, user, or action type.

### 5.10 Industrial Analytics & Knowledge Dashboard
- **FR-DASH-1**: High-level KPIs: Total Ingested Docs, Total Vector Chunks, Total Assets Covered, Total Queries Handled, Average Retrieval Confidence.
- **FR-DASH-2**: Graphical Charts: Most Queried Assets, Document Type Breakdown, System Query Volume Over Time, Low-Confidence Query Log for Admin review.

---

## 6. Non-Functional Requirements (NFRs)

### 6.1 Performance & Latency
- **NFR-PERF-1**: Vector Similarity Search response time < 300 ms for queries across 100,000+ vector chunks.
- **NFR-PERF-2**: End-to-End RAG chat response generation time < 2.5 seconds (using local/cloud LLM stream).
- **NFR-PERF-3**: Page load time for frontend web client < 1.2 seconds on standard broadband connection.

### 6.2 Reliability & Hallucination Prevention
- **NFR-REL-1**: Zero hallucinated technical data (100% citation enforcement).
- **NFR-REL-2**: System uptime >= 99.9% for API service and vector index.

### 6.3 Security & Data Protection
- **NFR-SEC-1**: JWT tokens signed using SHA-256 with 8-hour expiration.
- **NFR-SEC-2**: Sensitive operational documents encrypted at rest using AES-256.
- **NFR-SEC-3**: Role-Based Authorization enforcement on all backend API endpoints.

### 6.4 Scalability
- **NFR-SCALE-1**: Architecture must support expansion up to 500,000+ vector chunks without index degradation.
- **NFR-SCALE-2**: Stateless FastAPI AI service designed to scale horizontally across multiple worker containers.

---

## 7. AI Boundaries & Strict Safety Rules

> [!IMPORTANT]
> **STRICT AI GUARDRAILS ENFORCED BY PLATFORM ARCHITECTURE**

1. **Zero External Knowledge Injection**: The LLM system prompt explicitly forbids the use of parametric knowledge for specific plant values, tolerances, or operating instructions.
2. **Citation Requirement**: An answer without document citations is treated as an architectural failure and rejected by response parser middleware.
3. **Safety First**: Any response containing operational procedures on high-voltage, high-pressure, or toxic material machinery must prepend a **SAFETY WARNING** block extracted from official SDS/SOP docs.
4. **Low Confidence Fallback**: When vector retrieval distance is below threshold (cosine distance > 0.40 or similarity < 0.60), the AI must decline to answer and offer document upload guidance.

---

## 8. Success Metrics & KPIs

| Metric Category | Metric Name | Target Benchmark |
| :--- | :--- | :--- |
| **Accuracy** | Citation Precision | **> 98%** match between cited page and answer text |
| **Safety** | Zero Hallucination Rate | **100%** compliance with retrieved context |
| **Speed** | Query-to-Answer Latency | **< 2.5s** total latency |
| **Coverage** | Industrial Knowledge Coverage | **> 90%** of plant machinery assets linked to active docs |
| **Usability** | User Satisfaction (CSAT) | **> 4.6 / 5.0** rating from plant engineers |

---

## 9. Assumptions, Dependencies & Risks

### 9.1 Assumptions
- Plant documents are provided in standard electronic formats (PDF, DOCX, PNG, JPG).
- Equipment codes (e.g., `PUMP-102`, `BOILER-3`) are used consistently across SOPs and work logs.

### 9.2 Dependencies
- Python `sentence-transformers` models (`all-mpnet-base-v2`).
- Tesseract OCR engine installed on server OS for image PDF parsing.
- MongoDB server operational with vector or standard indexes.

### 9.3 Risk Matrix

| Risk Event | Severity | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| Bad OCR quality on scanned vintage paper manuals | High | Medium | Implement image contrast preprocessing (grayscale, binarization) prior to OCR. |
| Large PDF manuals cause memory spikes during extraction | Medium | Medium | Stream processing of PDF pages and batch chunk processing in background jobs. |
| Operator queries with slang or ambiguous names | Medium | High | Maintain an Asset Alias dictionary (e.g., "Main Pump" -> `PUMP-101-A`). |

---

## 10. Acceptance Criteria (Definition of Done for Requirements)

- All 8 User Roles authenticated via JWT with distinct dashboard views.
- Asset Graph displaying hierarchical relationships and linked documents.
- Document Ingestion Pipeline processing text and scanned PDFs via OCR.
- Hybrid Semantic Search returning vector chunks with similarity scores.
- RAG AI Chat interface answering questions with inline citations and confidence meters.
- Incident & RCA Log capturing failure reports and linking to vector index.
- Security Audit Log capturing system events for Admin compliance view.
- Analytics Dashboard rendering document coverage and query activity metrics.
