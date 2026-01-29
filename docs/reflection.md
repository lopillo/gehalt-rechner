# 📝 Reflection – Gehalt Rechner

## 1. Goal Achievement ✅

The primary goal of the project was to deliver a full-stack salary calculator
for English speakers in Germany, including a documented concept, architecture,
process model, and a backend that performs the core calculations. The current
implementation meets these goals by providing:

- a React SPA frontend with a full input form and result breakdown,
- a Node.js/Express backend with schema validation and calculation logic,
- automated tests for core backend behavior,
- Docker files for frontend + backend and a root Docker Compose file,
- documentation for concept, requirements, architecture, and process.

Overall, the solution fulfills the technical and content goals of the module.

---

## 2. Technical Evaluation ⚙️

### What worked well

- The schema-driven API validation prevents malformed input.
- The calculation flow is deterministic and testable.
- Frontend-to-backend integration is simple and reliable via a single endpoint.

### Technical gaps / risks

- The salary calculation is simplified and not legally authoritative.
- The frontend relies on a single calculation endpoint and could benefit from
  improved error messaging and input validation rules.
- Full end-to-end tests were not added yet.

---

## 3. Process Evaluation 🔍

The Scrum-inspired process helped structure work into clear phases: concept,
requirements, architecture, backend, frontend, and reflection. A lightweight,
solo-adapted Scrum approach kept momentum without heavy tooling. In hindsight,
earlier creation of a shared data contract (types) would have reduced the need
for later alignment.

---

## 4. Lessons Learned & Personal Development 🌱

- It is easier to maintain consistency when API schemas and frontend types are
  aligned from the start.
- Writing tests early increased confidence in the backend logic.
- Documenting decisions while building avoids gaps in the final report.

This project strengthened my ability to translate academic requirements into a
structured engineering workflow and improved confidence in full-stack delivery.

---

## 5. Future Improvements 🚀

- Implement a more accurate tax model (progressive brackets, real insurance
  caps, and region-specific rules).
- Add an informational page explaining tax classes and deductions.
- Provide PDF export for calculations.
- Add full end-to-end tests to validate the user flow.
