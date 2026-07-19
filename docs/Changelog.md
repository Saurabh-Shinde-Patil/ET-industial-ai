# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.0] - 2026-07-19

### Completed Phase 1: Project Setup & Environment Bootstrap
- **Frontend (`frontend/`)**: Bootstrapped React 18 SPA with Vite, Tailwind CSS custom industrial design tokens, PostCSS, Lucide icons, React Query, and Axios client.
- **Backend API (`backend/`)**: Bootstrapped Node.js Express API gateway with Helmet security middleware, CORS, Winston structured logger, Mongoose database connection module, and `/health` monitoring endpoint.
- **AI Microservice (`ai_service/`)**: Bootstrapped Python FastAPI microservice with Pydantic settings manager, Uvicorn server runner, Sentence-Transformers configuration, and `/health` metadata endpoint.
- **Container Orchestration**: Created `docker-compose.yml` organizing MongoDB, Backend API Gateway, AI Service, and Frontend static serve containers.

---

## [1.2.0] - 2026-07-19

### Added
- **Synthetic Industrial Demo Dataset (`DemoData.md`)**:
  - 10 physical industrial assets (`PUMP-101`, `BOILER-02`, `COMP-07`, `TURBINE-04`, `HEX-12`, `VALVE-88`, `CONVEYOR-03`, `XFRM-01`, `REACTOR-05`, `CHILLER-09`).
  - 20 sample Standard Operating Procedures (SOPs).
  - 15 historical maintenance logs.
  - 10 Root Cause Analysis (RCA) incident post-mortem reports.
  - 5 preventive maintenance (PM) schedules.
  - 5 vendor engineering manuals with technical bolt torque specs and tolerances.
  - 5 ground-truth AI query-answer benchmark test pairs with confidence scores and citations.

---

## [1.1.0] - 2026-07-19

### Added
- Incident & Root Cause Analysis (RCA) Module and Security Audit Logging added across PRD, Architecture, and Phases.
- Explicit Mongoose schemas for all 8 database collections in `Architecture.md`.
- Mathematical formulations for RRF and confidence scoring.

---

## [1.0.0] - 2026-07-19

### Added
- Initial system documentation suite in `docs/`: `README.md`, `PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`, `Memory.md`.
