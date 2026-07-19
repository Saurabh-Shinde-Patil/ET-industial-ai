# Project Changelog

All notable changes to the **Industrial Knowledge Intelligence – Unified Asset & Operations Brain** system and documentation will be recorded in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-07-19

### Completed Phase 2: Authentication & RBAC System
- **Database & Schemas**: Created Mongoose `User` collection schema (`userModel.js`) with BCrypt password hashing pre-save hook and `matchPassword` method.
- **Backend Auth API**: Built `/api/v1/auth/login`, `/api/v1/auth/register`, `/api/v1/auth/me`, and `/api/v1/auth/seed` endpoints.
- **Middleware**: Built JWT Bearer token verification middleware (`authMiddleware.js`) and role-based authorization guard (`rbacMiddleware.js`).
- **Seeder Utility**: Created `seedUsers.js` utility seeding 8 demo plant accounts (`operator`, `maint_eng`, `reliability_eng`, `safety_officer`, `prod_eng`, `plant_mgr`, `doc_admin`, `admin`).
- **Frontend Auth Engine**: Created `AuthContext.jsx` for session persistence, `authService.js`, `ProtectedRoute.jsx`, and `RoleGuard.jsx`.
- **Industrial Login UI**: Built `LoginPage.jsx` featuring responsive dark industrial layout, role selector grid for instant credential fill, and error alerts.

---

## [1.5.0] - 2026-07-19

### Added
- Husky pre-commit hooks, ESLint + Prettier rules, GitHub Actions CI workflow (`.github/workflows/ci.yml`), OpenAPI (Swagger UI) at `/docs`, and Docker Health Checks.

---

## [1.4.0] - 2026-07-19

### Completed Phase 1 Technical Review
- Audited 15 verification checkpoints. Passed 100%.

---

## [1.3.0] - 2026-07-19

### Completed Phase 1: Project Setup & Environment Bootstrap
- Bootstrapped React 18 SPA, Node Express API gateway, and Python FastAPI microservice.
