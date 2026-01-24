# 📋 Requirements Specification – Gehalt Rechner

## 1. Requirements Engineering Approach 🧠

The requirements for this project were derived using a structured approach:

1. **Elicitation**  
   Requirements were collected from:
   - the official task description,
   - the identified user problem,
   - technical constraints defined by the course.

2. **Analysis**  
   Requirements were analyzed for feasibility, relevance, and alignment with learning objectives.

3. **Structuring**  
   Requirements were grouped into:
   - functional requirements,
   - non-functional requirements,
   - technical requirements.

4. **Prioritization**  
   A distinction was made between:
   - Must-have (MVP / exam-relevant),
   - Nice-to-have (optional extensions).

5. **Validation**  
   Requirements are validated through:
   - automated tests,
   - architectural documentation,
   - critical evaluation in the reflection phase.

---

## 2. Functional Requirements ⚙️

### Must-have (MVP)

- The user shall be able to enter a gross salary.
- The user shall be able to select monthly or yearly salary input.
- The user shall be able to select a tax class (1–6).
- The user shall be able to select a Bundesland.
- The user shall be able to enable or disable church tax.
- The user shall be able to specify:
  - number of children,
  - health insurance rate,
  - pension region (West / East / None),
  - calculation year.
- The system shall calculate an estimated net salary.
- The system shall display a detailed breakdown of deductions.

---

## 3. Non-Functional Requirements 📐

- The application shall be developed as a **Single Page Application (SPA)**.
- The application shall use a **modern web framework** (React).
- The application shall provide an English user interface.
- The application shall be responsive and usable on different screen sizes.
- The system shall handle invalid input gracefully with meaningful error messages.

---

## 4. Technical Requirements 🛠️

### Frontend

- Implemented using React and TypeScript
- Communicates with backend via HTTP/JSON
- Contains client-side validation and state management

### Backend

- Implemented as a REST API
- Provides endpoint:
  - `POST /api/v1/salary/calculate`
- Validates input data using schemas
- Contains business logic for salary calculation
- Returns structured JSON responses
- Covered by unit and integration tests

---

## 5. Testing Requirements 🧪

- Core calculation logic shall be covered by unit tests.
- API endpoints shall be covered by integration tests.
- Frontend components shall be tested for:
  - form submission,
  - result rendering.

Testing ensures correctness, maintainability, and reliability.

---

## 6. Deployment & Infrastructure Requirements 🐳

- The frontend and backend shall run in separate Docker containers.
- A Docker Compose file shall orchestrate the full system.
- The complete application shall be startable with a single command:
  ```bash
  docker-compose up --build
  ```
