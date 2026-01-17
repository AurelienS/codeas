# Tasks: Personal Portfolio Website

**Input**: Design documents from `/specs/002-portfolio-site/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/content-schema.json

**Tests**: Not explicitly requested - manual browser testing only.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Deployment files already created: `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `.github/workflows/deploy.yml`

---

## Phase 1: Setup (Project Structure)

**Purpose**: Create directory structure and initial files

- [x] T001 Create src/ directory structure: `src/css/`, `src/js/`, `src/data/`, `src/assets/images/`
- [x] T002 [P] Create empty placeholder files: `src/css/styles.css`, `src/js/main.js`
- [x] T003 [P] Create sample content.json with placeholder data in `src/data/content.json`

**Checkpoint**: Directory structure ready for development

---

## Phase 2: Foundational (Base HTML & CSS)

**Purpose**: Core HTML structure and CSS foundation that all user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 Create base HTML structure in `src/index.html` with semantic sections (header, nav, main, footer)
- [x] T005 Add navigation with anchor links for Projects and About sections in `src/index.html`
- [x] T006 Implement CSS reset and base typography in `src/css/styles.css`
- [x] T007 [P] Implement responsive grid/flexbox layout foundation in `src/css/styles.css`
- [x] T008 [P] Add CSS variables for colors, spacing, fonts in `src/css/styles.css`
- [x] T009 Implement smooth scroll behavior via CSS in `src/css/styles.css`

**Checkpoint**: Base site structure visible, navigation works, responsive foundation ready

---

## Phase 3: User Story 1 - Browse Projects List (Priority: P1) 🎯 MVP

**Goal**: Display a list of projects with name, description, and links

**Independent Test**: Navigate to projects section, verify projects render from content.json with clickable links

### Implementation for User Story 1

- [x] T010 [US1] Create projects section HTML structure in `src/index.html`
- [x] T011 [US1] Implement fetchContent() function to load content.json in `src/js/main.js`
- [x] T012 [US1] Implement renderProjects() function to display project cards in `src/js/main.js`
- [x] T013 [US1] Add project card CSS styles (grid layout, card design) in `src/css/styles.css`
- [x] T014 [US1] Implement project links with target="_blank" rel="noopener noreferrer" in `src/js/main.js`
- [x] T015 [US1] Add empty state message when no projects exist in `src/js/main.js`
- [x] T016 [US1] Style project tags/technologies display in `src/css/styles.css`

**Checkpoint**: Projects list displays from JSON, links work, empty state handled - **MVP COMPLETE**

---

## Phase 4: User Story 2 - View About Me Section (Priority: P2)

**Goal**: Display personal bio and social links

**Independent Test**: Navigate to about section, verify bio displays and social links open in new tabs

### Implementation for User Story 2

- [x] T017 [US2] Create about section HTML structure in `src/index.html`
- [x] T018 [US2] Implement renderProfile() function to display bio and social links in `src/js/main.js`
- [x] T019 [US2] Add about section CSS styles (layout, typography) in `src/css/styles.css`
- [x] T020 [US2] Style social links as buttons/icons in `src/css/styles.css`
- [x] T021 [US2] Add profile image support (optional, with fallback) in `src/js/main.js` and `src/css/styles.css`

**Checkpoint**: About section displays bio and social links correctly

---

## Phase 5: User Story 3 - View Project Details (Priority: P3)

**Goal**: Expand project cards to show full description when clicked

**Independent Test**: Click a project card, verify expanded view shows full description and all links

### Implementation for User Story 3

- [x] T022 [US3] Add click handler for project card expansion in `src/js/main.js`
- [x] T023 [US3] Implement expanded project view (modal or inline expand) in `src/js/main.js`
- [x] T024 [US3] Display fullDescription, all links, and tags in expanded view in `src/js/main.js`
- [x] T025 [US3] Add CSS for expanded/modal view in `src/css/styles.css`
- [x] T026 [US3] Implement close/collapse functionality in `src/js/main.js`
- [x] T027 [US3] Add keyboard accessibility (Escape to close) in `src/js/main.js`

**Checkpoint**: Project details expand/collapse works, accessible via keyboard

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final touches, error handling, and responsive testing

- [x] T028 Create custom 404 page in `src/404.html` with navigation back to main site
- [x] T029 [P] Add mobile responsive styles (hamburger menu if needed) in `src/css/styles.css`
- [x] T030 [P] Add tablet responsive styles in `src/css/styles.css`
- [x] T031 Add loading state while fetching content.json in `src/js/main.js`
- [x] T032 Add error handling for failed content.json fetch in `src/js/main.js`
- [x] T033 [P] Create manual test checklist in `tests/manual/checklist.md`
- [x] T034 Populate content.json with real projects and profile data in `src/data/content.json`
- [ ] T035 Run Lighthouse audit and fix any critical issues
- [ ] T036 Final cross-browser testing (Chrome, Firefox, Safari, Edge)

**Checkpoint**: Site fully functional, tested, ready for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion
- **User Stories (Phase 3-5)**: All depend on Phase 2 completion
  - Can proceed sequentially: P1 → P2 → P3
  - US2 and US3 can start after US1 if desired
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Independent from US1
- **User Story 3 (P3)**: Depends on US1 (needs project cards to expand)

### Within Each User Story

- HTML structure before JS functionality
- JS data fetching before rendering
- Rendering before styling
- Core functionality before edge cases

### Parallel Opportunities

- T002, T003 can run in parallel (Setup phase)
- T007, T008 can run in parallel (Foundational phase)
- T029, T030, T033 can run in parallel (Polish phase)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Projects List)
4. **STOP and DEPLOY**: Site shows projects - MVP live!
5. Continue with US2, US3, Polish

### Incremental Delivery

1. Setup + Foundational → Base site structure
2. Add User Story 1 → Deploy (MVP - projects visible)
3. Add User Story 2 → Deploy (about section added)
4. Add User Story 3 → Deploy (project details work)
5. Polish → Final deploy

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- Commit after each task or logical group
- Deploy after each user story checkpoint for feedback
- Use `git push origin main && git checkout prod && git merge main && git push origin prod` to deploy
