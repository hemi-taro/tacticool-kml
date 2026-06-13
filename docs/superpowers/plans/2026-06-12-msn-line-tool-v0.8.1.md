# MSN Line Tool v0.8.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully offline single-HTML tool that generates Bullseye-based mission geometry and exports valid KML.

**Architecture:** Embed independently testable geometry and KML functions in `index.html`, with a separate UI script managing forms and in-memory objects. Use Node's built-in test runner to extract the core script and verify calculations without external libraries.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js built-in test runner

---

### Task 1: Geometry and KML Core

**Files:**
- Create: `tests/core.test.js`
- Create: `index.html`

- [ ] Write failing tests for DDM conversion, bearings, destination points, circle closure, and KML coordinate/color output.
- [ ] Run `node --test tests/core.test.js` and confirm it fails because `index.html` is missing.
- [ ] Add the embedded core calculation and KML functions to `index.html`.
- [ ] Run `node --test tests/core.test.js` and confirm the core tests pass.

### Task 2: Offline UI

**Files:**
- Modify: `index.html`

- [ ] Add Bullseye DDM fields and geometry creation forms.
- [ ] Add input validation, object storage, axis selection, delete, clear, and KML download behavior.
- [ ] Add compact responsive CSS suitable for iPad Safari.

### Task 3: Documentation and Verification

**Files:**
- Create: `README.md`

- [ ] Document local use, DDM format, magnetic variation convention, and KML export.
- [ ] Run the full Node test suite.
- [ ] Serve locally and perform a browser smoke test.
