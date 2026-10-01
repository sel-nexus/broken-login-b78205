# Plan

## What I am building
I am repairing the existing static login/gallery application so the login behavior is no longer trivially bypassed, the protected content is revealed only after valid local authentication logic succeeds, and the repaired behavior is covered by repeatable automated tests. This is a brownfield stabilization pass focused on fixing confirmed defects and adding regression protection, not introducing net-new product scope.

## Upstream read
- `/discovery/PRD - Codebase Stabilization and Test Hardening.md`
- `.engine/external_source.json`
- Existing repository files in the workspace: `index.html`, `app.js`, `style.css`

## Repository reality and inferred scope
The PRD describes a generic full-stack Vite/React + Express + PostgreSQL shape, but the actual checked-out repository is a tiny static HTML/CSS/JavaScript site with no backend, no package manifest, and no tests. Because this is a brownfield repair task, implementation will follow the existing product on disk rather than scaffolding an unrelated new stack. This is an **inferred** architecture decision based on the repository contents.

## Pre-existing Repository Issues
- The repository has **no automated test runner or test files** (`glob("**/*test*")` returned no matches), so baseline regression protection is missing.
- The login logic in `app.js` is intentionally broken: a `bypass` username grants access without a valid password, credentials are hardcoded in client code, and the error message hints the bypass value.
- The gallery markup already contains the protected images in `index.html`; they are only hidden via CSS until the flawed client-side check toggles visibility.
- There is no package manifest, build pipeline, or README documenting how to validate changes; the only baseline command I could run was `node --check app.js`, which passed syntax validation but did not verify runtime behavior.
- The codebase product shape does not match the PRD's normalized full-stack stack; the safe path is to repair the existing static application in place and document that mismatch.

## UI design decision
- Mode: preserve
- Product shape: focused workflow
- Inherited system: none
- House style: `design-minimalist`
- Why: the existing UI is a single-purpose screen where clarity matters more than decorative redesign. I will preserve the current structure and improve usability/state feedback only as needed for the repair.

## Feature slices
### Slice 1 — Stabilize login flow and add regression tests
Repair the client-side authentication flow so only the supported credential pair unlocks the gallery, remove the insecure bypass hint, improve state handling for success/error transitions, and add a lightweight automated DOM-level test harness that proves the fixed behavior.

### Files
- `index.html` — existing login/gallery markup, updated only as needed for clearer auth states and testability hooks.
- `app.js` — existing login logic, refactored into testable functions and repaired to reject bypass-style access.
- `style.css` — existing styling, adjusted only for any validation/error/success state presentation introduced by the repair.
- `tests/app.test.js` — new Node-based regression tests for authentication logic and DOM visibility changes.
- `README.md` — usage and verification instructions for the repaired static app and test suite.
- `CHANGELOG.md` — summary of repaired defects, added tests, and any validation notes from this run.

## Risk
- `app.js` is the core behavior file and directly controls DOM state; changes here affect both login success/failure handling and gallery visibility.
- `index.html` is tightly coupled to `app.js` through element IDs, so any markup edits must preserve or intentionally update those selectors.
- `style.css` has low blast radius and should only change if the repaired UX requires clearer feedback.
- The codebase is under 10 files and already graphified, so file-level inspection plus targeted graph queries will be sufficient during implementation.

## Verification
- Baseline syntax: `node --check app.js` → exits 0.
- Unit/slice tests: `node tests/app.test.js` → all assertions pass, 0 failures.
- E2E/source-level preflight: not applicable as a separate browser suite for this tiny static repair; DOM interaction coverage is provided by the slice test harness in `tests/app.test.js`.
- Build: `node --check app.js` → exits 0 (no build pipeline exists in this repository).

## Ordered work
1. Repair and modularize the authentication logic in `app.js`, keeping the existing page structure intact.
2. Apply any minimal markup/style updates required to support clearer error/success and deterministic testing.
3. Add `tests/app.test.js` to validate successful login, rejected invalid login, and rejection of the prior bypass path.
4. Update `README.md` and `CHANGELOG.md` to document the repaired behavior and verification commands.
