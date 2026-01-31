# 💶 Gehalt Rechner

Gehalt Rechner is a full-stack web application that helps **English speakers in Germany** estimate their **net salary** based on a simplified model of the German tax and social security system.

Many expats, international students, and job seekers receive job offers with a _gross salary_ but struggle to understand how much money they will actually take home each month. This project aims to bridge that gap with a clear, English-first, and transparent salary calculator.

---

## 🎯 Objective & Mission

### Objective

The main objective of this project is to design and implement a **containerized full-stack web application** that demonstrates:

- a structured software development process,
- a clear separation between frontend and backend,
- and the practical use of modern web technologies.

### Mission

The mission of _Gehalt Rechner_ is to:

- make the German salary system more accessible to non-German speakers 🇩🇪➡️🌍,
- provide an intuitive way to explore “what-if” salary scenarios,
- and present salary deductions in a transparent and understandable way.

⚠️ **Disclaimer**  
This application uses a **simplified and educational model** of the German tax system.  
It is **not official tax advice** and should not be used for legal or financial decisions.

---

## 👥 Target Users

- Expats working in Germany
- International students with part-time or full-time jobs
- Job seekers comparing offers
- Anyone who wants a rough net-salary estimate in English

---

## ✨ Core Features (Planned)

### Inputs

- Gross salary (monthly or yearly)
- Tax class (1–6)
- Bundesland (German federal state)
- Church tax (yes / no)
- Number of children
- Health insurance rate
- Pension region (West / East / None)
- Calculation year

### Outputs

- Estimated **net salary**
- Detailed breakdown of deductions:
  - Income tax
  - Church tax
  - Solidarity surcharge
  - Health insurance
  - Pension insurance
  - Unemployment insurance
  - Nursing care insurance

---

## 🧠 Why a Single Page Application (SPA)?

A Single Page Application allows users to:

- instantly recalculate results when changing inputs,
- explore multiple scenarios without page reloads,
- and receive fast, responsive feedback.

This makes the application ideal for **interactive “what-if” salary exploration**.

---

## 🛠️ Technical Implementation

The application is implemented as a **full-stack system**, fully containerized using Docker.

### Frontend

- **React (TypeScript)** single-page application
- English-only user interface
- Form-based input with validation
- Fetches calculation results from the backend API
- Displays results and breakdown in a clear UI

### Backend

- **Node.js + Express (TypeScript)** REST API
- Core endpoint:
  - `POST /api/v1/salary/calculate`
- Validates input data using schemas
- Contains the salary calculation logic
- Returns structured JSON responses
- Includes automated unit and integration tests

### Architecture Overview

- Browser → React Frontend
- Frontend → Backend API (HTTP/JSON)
- Docker Compose orchestrates frontend and backend containers locally

---

## 📚 Documentation Map

- `docs/concept.md`: Problem statement, users, benefits, scope, and tech choices.
- `docs/requirements.md`: Functional, non-functional, and testing requirements.
- `docs/architecture.md`: C4-style container architecture (diagram included).
- `docs/process.md`: Scrum-inspired process model and justification.
- `docs/reflection.md`: Critical evaluation, lessons learned, and improvements.

---

## 🚀 Quick Start

Run the full stack locally with Docker Compose (this starts the frontend and backend containers):

```bash
docker-compose up --build
```

Open the app at:

- http://localhost:3000

To stop the app and return to your shell, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the
terminal running Docker Compose. To fully shut down and remove containers, run:

```bash
docker-compose down
```

---

## 🔌 API Contract

**Endpoint**

- `POST /api/v1/salary/calculate`

**Request Body**

```json
{
  "year": 2025,
  "grossAmount": 5000,
  "period": "monthly",
  "taxClass": 1,
  "federalState": "BE",
  "churchMember": false,
  "childrenCount": 0,
  "annualAllowance": 0,
  "healthInsuranceRate": 8.7,
  "pensionRegion": "West"
}
```

**Response Body**

```json
{
  "net": 3200,
  "breakdown": {
    "incomeTax": 500,
    "churchTax": 0,
    "solidarityTax": 20,
    "healthInsurance": 300,
    "pensionInsurance": 200,
    "unemploymentInsurance": 50,
    "nursingCareInsurance": 40
  }
}
```

### API error handling

If validation fails, the API responds with **HTTP 400 (Bad Request)** and a JSON
body containing a summary message plus an array of Zod issues.

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Invalid input data",
  "issues": [
    {
      "code": "too_small",
      "minimum": 0,
      "type": "number",
      "inclusive": true,
      "message": "Number must be greater than 0",
      "path": ["grossAmount"]
    }
  ]
}
```

Alternative minimal example:

```json
{
  "message": "Invalid input data",
  "issues": [
    {
      "code": "too_small",
      "minimum": 0,
      "type": "number",
      "inclusive": true,
      "message": "Number must be greater than 0",
      "path": ["grossAmount"]
    }
  ]
}
```

---

## ✅ Tests

### Backend

The backend suite includes **unit** and **integration** tests (Jest + Supertest).

Run all backend tests:

```bash
cd backend
npm test
```

Run a specific backend test file:

```bash
cd backend
npm test -- calculateNetSalary.test.ts
npm test -- api.test.ts
```

### Frontend

Frontend tests include **unit/component** tests (Vitest + Testing Library) and
**end-to-end (E2E)** tests (Playwright).

Run frontend unit/component tests:

```bash
cd frontend
npm install
npm run test
```

Run E2E tests (start the frontend and backend manually, then run Playwright):

```bash
cd frontend
npm install
```

Start the backend in a separate terminal:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev -- --host --port 3000
```

Finally, run the E2E tests:

```bash
cd frontend
npm run test:e2e
```

#### Running E2E tests against Docker

Playwright waits for both the frontend and backend URLs configured in
`frontend/playwright.config.ts`. When the app runs in Docker, make sure those
URLs resolve on your host. If `localhost` does not reach the containers (common
with some Docker Desktop + Git Bash setups), point Playwright to the Docker host
explicitly:

```bash
cd frontend
E2E_FRONTEND_URL=http://host.docker.internal:3000 \
E2E_BACKEND_URL=http://host.docker.internal:4000 \
npm run test:e2e
```

You can keep the existing Docker Compose stack running; Playwright will reuse
the reachable servers when `reuseExistingServer` is enabled.

---

## 🐳 Docker & Deployment

The entire system runs locally using **Docker Compose**:

- Frontend container:
  - React build served via Nginx
- Backend container:
  - Node.js API server
- One command to run everything:
  ```bash
  docker-compose up --build
  ```
