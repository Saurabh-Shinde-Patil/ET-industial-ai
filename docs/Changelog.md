# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.4.0] - 2026-07-19

### Completed Phase 1 Technical Review
- **Directory Alignment**: Created tracked subdirectory structures (`.gitkeep`) for all frontend components (`ui`, `layout`, `assets`, `documents`, `chat`, `search`, `analytics`, `incidents`, `admin`), pages, contexts, hooks, services, utils, controllers, models, routes, and middleware.
- **Containerization Specs**: Added production-grade Dockerfiles for `frontend/Dockerfile` (multi-stage Nginx build), `backend/Dockerfile` (Node 18), and `ai_service/Dockerfile` (Python 3.10 + Tesseract OCR).
- **Service Connectivity**: Created `backend/src/services/aiServiceProxy.js` and exposed `GET /api/v1/ai-health` to test Express API Gateway to FastAPI AI Microservice connectivity.
- **Frontend Client**: Created `frontend/src/services/apiClient.js` configuring Axios with Vite proxy and JWT authorization header interceptors.
- **Audit**: Verified all 15 Phase 1 technical checkpoints. Passed 100%.

---

## [1.3.0] - 2026-07-19

### Completed Phase 1: Project Setup & Environment Bootstrap
- Bootstrapped React 18 SPA with Vite and Tailwind CSS.
- Bootstrapped Node.js Express API gateway with Helmet security middleware, CORS, Winston logger, and Mongoose connection module.
- Bootstrapped Python FastAPI microservice with Pydantic settings manager and Uvicorn server.
- Created `docker-compose.yml` for unified microservice stack.

---

## [1.2.0] - 2026-07-19

### Added
- Synthetic Industrial Demo Dataset (`DemoData.md`) with 10 assets, 20 SOPs, 15 maintenance logs, 10 RCA incidents, 5 PM schedules, 5 engineering manuals, and 5 AI ground-truth test pairs.
