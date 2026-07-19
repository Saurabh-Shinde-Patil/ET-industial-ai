# Strict Development Rules & Engineering Standards

## Project Name: Industrial Knowledge Intelligence – Unified Asset & Operations Brain
**Hackathon**: Economic Times AI Hackathon 2.0  
**Problem Statement**: PS-8 – AI for Industrial Knowledge Intelligence  
**Document Version**: 1.0.0  
**Status**: Mandatory Compliance for All Developers & AI Agents  

---

## 1. AI Boundaries & Strict Safety Guardrails

> [!CAUTION]
> **CRITICAL RULE**: In an industrial plant environment, inaccurate information can cause equipment destruction, production halts, or fatal accidents. AI safety guardrails are absolute and non-negotiable.

### 1.1 The AI Must:
1. **Never Hallucinate**: Never generate technical specifications, pressure ratings, bolt torque values, electrical wiring instructions, or chemical safety steps from LLM pre-training parameters. Every piece of advice MUST come directly from retrieved document chunks.
2. **Always Retrieve Documents**: Every user query MUST pass through the vector retrieval step first. No response may be sent directly from LLM memory without document retrieval context.
3. **Always Show Citations**: Every generated response MUST include explicit citations identifying the source document title, page number, and paragraph snippet.
4. **Return Confidence Score**: Every answer must output a calculated retrieval confidence score (`High`, `Medium`, `Low`) based on vector similarity distance.
5. **Reject Unknown Questions Politely**: If no context chunks exceed the minimum similarity threshold (>0.60 match score), the AI MUST explicitly reject the query with the standardized fallback response:  
   *"Information not found in current plant documentation. Please consult a qualified engineer or upload the relevant manual/SOP."*
6. **Highlight Safety Alerts**: Any response containing operational procedures for high-voltage, high-pressure, chemical, or rotating machinery MUST automatically prepend a high-visibility **SAFETY WARNING** block.

---

## 2. General Coding Standards

- **Clean Code Architecture**: Follow Single Responsibility Principle (SRP) and Separation of Concerns across all modules.
- **Strict Typing & Validation**: Use JSDoc / TypeScript interfaces for frontend/backend, and Pydantic models for Python services.
- **No Magic Numbers or Hardcoded Strings**: All configuration constants, vector dimensions, threshold values, and timeouts must reside in centralized configuration files (`config.js`, `settings.py`).
- **No Console Logs in Production**: All logging must be routed through structured logging utility wrappers (`winston` for Node.js, `loguru` / `logging` for Python).

---

## 3. Frontend Rules (React 18 + Vite + Tailwind CSS)

1. **Framework Strictness**: Build with functional components and React hooks exclusively. Class components are strictly prohibited.
2. **Styling Policy**: Use Vanilla CSS variables defined in global design tokens combined with utility classes from Tailwind CSS. Custom inline styles (`style={{ ... }}`) are forbidden except for dynamically calculated width/height values (e.g., progress meters).
3. **State Management**:
   - Server Data: Handle via React Query (`useQuery`, `useMutation`). Do NOT store API fetch results in global `useState` or Redux-like stores.
   - Component UI State: Keep local to components (`useState`, `useReducer`).
   - Global App Context: Restrict to `AuthContext` and `ThemeContext`.
4. **Component Isolation**: Components must be small (<250 lines of code) and placed in modular folders.
5. **Accessibility**: Every interactive element (Button, Input, Select, Modal trigger) MUST have a unique, descriptive `id`, `aria-label`, and keyboard focus outline.

---

## 4. Backend Rules (Node.js + Express + MongoDB)

1. **Async Error Handling**: All route handlers and asynchronous middleware MUST use `express-async-handler` or try-catch blocks passing errors to `next(err)`. Unhandled promise rejections will crash the server and are strictly unacceptable.
2. **Response Envelope Standard**: All API endpoints must return a standardized JSON structure:
   ```json
   {
     "success": true,
     "data": { ... },
     "message": "Operation completed successfully",
     "error": null,
     "timestamp": "2026-07-19T14:40:00.000Z"
   }
   ```
3. **Mongoose Schema Hygiene**: All schemas must enforce `timestamps: true`, explicit validation messages, proper field indexing, and virtual getters where appropriate.
4. **Controller Simplification**: Controllers must only parse request params, call the appropriate business Service, and format the HTTP response. Zero business logic inside route handlers.

---

## 5. AI Service Rules (Python 3.10+ + FastAPI)

1. **Async Endpoints**: FastAPI router functions must be declared with `async def` when performing non-blocking I/O operations.
2. **Vector DB Mutex / Locking**: Writes or updates to local FAISS indices must be thread-safe using an async Lock wrapper.
3. **Prompt Template Protection**: All LLM prompt templates must be stored in `ai_service/app/core/prompts.py`. Dynamic prompt strings scattered inside code files are forbidden.
4. **Model Caching**: Heavy sentence-transformer models and tokenizers must be initialized once during FastAPI app startup (`lifespan` event) and stored in `app.state`, never reloaded per request.

---

## 6. Naming Conventions

### 6.1 Folder Naming
- **kebab-case** for all directories in project (e.g., `ai-service`, `document-processing`, `user-management`).

### 6.2 File Naming
- **Frontend Components**: `PascalCase.jsx` (e.g., `AssetCard.jsx`, `CitationDrawer.jsx`).
- **Frontend Utilities/Hooks**: `camelCase.js` (e.g., `useAssetData.js`, `formatDate.js`).
- **Backend Node.js Files**: `camelCase.js` (e.g., `assetController.js`, `documentModel.js`, `authMiddleware.js`).
- **Python AI Files**: `snake_case.py` (e.g., `vector_store.py`, `rag_engine.py`, `ocr_pipeline.py`).

### 6.3 Code Identifier Naming
- **Variables / Functions**: `camelCase` in JS/React, `snake_case` in Python.
- **Classes / Types / Models**: `PascalCase` in all languages.
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_CHUNK_SIZE`, `DEFAULT_CONFIDENCE_THRESHOLD`).

---

## 7. Git & Version Control Rules

1. **Branch Naming**:
   - Feature: `feature/phase-X-feature-name`
   - Bugfix: `fix/issue-description`
   - Docs: `docs/update-architecture`
2. **Commit Message Format**:
   - `feat(component): concise summary`
   - `fix(ai): resolve vector index mismatch`
   - `docs(readme): update environment setup instructions`
3. **No Code Without Docs Update**: If a pull request modifies an API route or database model, the corresponding documentation in `docs/` MUST be updated in the same pull request.

---

## 8. Security Rules

1. **No Hardcoded Secrets**: Secret keys, JWT secrets, database connection URIs, and LLM API keys must be loaded from environment variables via `.env`. `.env` files must be included in `.gitignore`.
2. **Input Sanitization**: All incoming payload data must be sanitized to prevent Mongo Injection, XSS, and Path Traversal attacks during file uploads.
3. **File Upload Security**: Uploaded files must be validated for MIME type (`application/pdf`, `image/png`, `image/jpeg`) and size-restricted (max 50 MB per file).

---

## 9. Libraries & Dependencies Rules

### 9.1 Approved Libraries
- **Frontend**: `react`, `react-dom`, `vite`, `tailwindcss`, `react-router-dom`, `@tanstack/react-query`, `axios`, `lucide-react`, `recharts`.
- **Backend**: `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `helmet`, `dotenv`, `multer`, `winston`.
- **AI Service**: `fastapi`, `uvicorn`, `langchain`, `sentence-transformers`, `faiss-cpu` / `chromadb`, `pytesseract`, `pdfplumber`, `pydantic`.

### 9.2 Disallowed Libraries
- ❌ **TailwindCSS CDN script tag in production** (must use Vite PostCSS build process).
- ❌ **jQuery** or legacy DOM manipulation tools.
- ❌ **Var declarations** in JavaScript (`const` and `let` only).
- ❌ **Unverified npm/pip packages** with fewer than 500 weekly downloads or no active maintenance.

---

## 10. Definition of Done (DoD)

A feature is considered **DONE** only when:
1. All written code strictly complies with `Rules.md`.
2. Manual verification passes without errors or console warnings.
3. API endpoints return standardized JSON envelopes.
4. AI responses strictly produce accurate citations and confidence scores.
5. Living documentation file [`docs/Memory.md`](file:///p:/projects/hackathon_projects/ET_industrial_ai/docs/Memory.md) has been updated with changes.
