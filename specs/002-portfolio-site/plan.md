# Implementation Plan: Personal Portfolio Website

**Branch**: `002-portfolio-site` | **Date**: 2026-01-17 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-portfolio-site/spec.md`

## Summary

Build a single-page personal portfolio website to showcase side projects and provide an "About Me" section with social links. The site will be static (no backend), with content stored in configuration files, manually ordered projects, and responsive design across all devices. No analytics or tracking.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES6+)
**Primary Dependencies**: None required (vanilla implementation per Simplicity First principle)
**Storage**: Static JSON file for projects and profile data
**Testing**: Manual browser testing + Lighthouse audits for performance/accessibility
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
**Project Type**: Single (static frontend only)
**Performance Goals**: Page load < 3 seconds (from SC-001)
**Constraints**: Responsive 320px-1920px (from SC-004), no external tracking scripts
**Scale/Scope**: Personal portfolio (~5-20 projects), minimal concurrent visitors

**Deployment**:
- **Domain**: `codeas.me` (root domain)
- **Hosting**: VPS with Docker Compose
- **Reverse Proxy**: Traefik (existing `traefik_default` network)
- **SSL**: Let's Encrypt via Traefik certresolver
- **CI/CD**: GitHub Actions on push to `prod` branch
- **Container**: nginx:alpine serving static files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Simplicity First

| Check | Status | Notes |
|-------|--------|-------|
| YAGNI - No unneeded features | ✅ PASS | Static site, no CMS, no auth, no analytics |
| Minimal Dependencies | ✅ PASS | Vanilla HTML/CSS/JS, no framework required |
| No Premature Optimization | ✅ PASS | Standard static hosting, optimize only if measured issues |
| Clear Over Clever | ✅ PASS | Simple file structure, straightforward markup |

### II. Code Quality

| Check | Status | Notes |
|-------|--------|-------|
| Meaningful Names | ⏳ VERIFY | Will enforce in implementation |
| Small Functions | ⏳ VERIFY | Minimal JS needed; will keep functions focused |
| Clear Structure | ✅ PASS | Single HTML file + CSS + data file |
| No Dead Code | ⏳ VERIFY | Will enforce in implementation |
| Consistent Style | ⏳ VERIFY | Will use linting (Prettier/ESLint) |

### III. Iterative Delivery

| Check | Status | Notes |
|-------|--------|-------|
| Vertical Slices | ✅ PASS | US1 (projects) → US2 (about) → US3 (details) |
| Working Software | ✅ PASS | Each story delivers deployable increment |
| Prioritized Delivery | ✅ PASS | P1 → P2 → P3 order defined in spec |
| Ship Early | ✅ PASS | MVP = projects list only |
| Feedback Loops | ✅ PASS | Can deploy after each user story |

**Gate Status**: ✅ PASS - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-site/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (data schema)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── index.html           # Single-page HTML (all sections)
├── 404.html             # Custom 404 error page
├── css/
│   └── styles.css       # All styles (responsive)
├── js/
│   └── main.js          # Minimal JS (smooth scroll, project rendering)
├── data/
│   └── content.json     # Projects and profile data
└── assets/
    └── images/          # Profile photo, project screenshots (optional)

# Deployment files (repository root)
Dockerfile               # nginx:alpine multi-stage build
docker-compose.yml       # Service config with Traefik labels
nginx.conf               # nginx configuration for SPA routing

.github/
└── workflows/
    └── deploy.yml       # GitHub Actions: deploy on push to prod

tests/
└── manual/
    └── checklist.md     # Manual test checklist (browser/device matrix)
```

**Structure Decision**: Single project structure with minimal files. No build step required - nginx serves static files directly from `src/`. Docker Compose connects to existing Traefik network for SSL termination.

## Complexity Tracking

> No violations - design follows all constitution principles.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| (none)    | -          | -                                   |
