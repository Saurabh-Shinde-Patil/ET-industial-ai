# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2026-07-19

### Added
- **Pre-commit Hooks**: Installed & configured Husky and `lint-staged` in `.husky/pre-commit` and `package.json`.
- **Code Formatting & Linting**: Added `.eslintrc.cjs` and `.prettierrc` for root monorepo enforcement.
- **GitHub Actions CI/CD Pipeline**: Created `.github/workflows/ci.yml` running automated build and syntax verification jobs on every git push or pull request to `main`/`develop`.
- **OpenAPI (Swagger UI)**: Integrated `swagger-ui-express` and `swagger-jsdoc` in `backend/src/config/swagger.js` exposing interactive API documentation at `http://localhost:5000/docs`.
- **Docker Health Checks**: Added native `healthcheck` declarations in `docker-compose.yml` for all 4 microservice containers (`mongo`, `backend`, `ai_service`, `frontend`).

---

## [1.4.0] - 2026-07-19

### Completed Phase 1 Technical Review
- Audited 15 verification checkpoints. Passed 100%.
- Created production Dockerfiles for `frontend`, `backend`, and `ai_service`.

---

## [1.3.0] - 2026-07-19

### Completed Phase 1: Project Setup & Environment Bootstrap
- Bootstrapped React 18 SPA with Vite and Tailwind CSS.
- Bootstrapped Express REST API gateway with Helmet and Winston logger.
- Bootstrapped FastAPI microservice.
