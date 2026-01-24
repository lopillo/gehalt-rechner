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
