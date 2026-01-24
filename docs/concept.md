# 🧩 Concept – Gehalt Rechner

## 1. Problem Description 🧠

Understanding the German salary system is a major challenge for non-German speakers. Job offers in Germany are usually communicated using **gross salary**, while the actual **net salary** depends on a complex combination of tax classes, federal states (Bundesländer), social insurance contributions, and personal factors.

Most existing salary calculators:

- are only available in German,
- assume prior knowledge of the tax system,
- or do not clearly explain how deductions are calculated.

This creates uncertainty for expats, international students, and job seekers when evaluating job offers.

---

## 2. Users & Target Group 👥

The primary users of this application are:

- Expats working or moving to Germany
- International students with part-time or full-time jobs
- Job seekers comparing different offers
- English-speaking professionals unfamiliar with the German tax system

---

## 3. Benefits of the Application ✨

The _Gehalt Rechner_ provides:

- an **English-first user interface**
- a **simple and intuitive input process**
- transparent presentation of salary deductions
- fast “what-if” comparisons of salary scenarios

By lowering the language and complexity barrier, the application makes salary estimation more accessible and understandable.

---

## 4. Why a Web Application / SPA? 🌐

The problem is well-suited for a **single-page web application (SPA)** because:

- users frequently change inputs to explore scenarios,
- instant feedback improves understanding,
- no installation is required,
- the application is easily accessible across devices.

A SPA enables dynamic updates without page reloads, improving usability and responsiveness.

---

## 5. High-Level Features 🧩

- Input of gross salary and tax-related parameters
- Backend-based salary calculation
- Result view with net salary and deduction breakdown
- Clear separation between frontend and backend
- Containerized execution using Docker Compose

---

## 6. Technical Overview 🛠️

- **Frontend:** React (TypeScript) Single Page Application
- **Backend:** Node.js + Express (TypeScript) REST API
- **Architecture:** Client–Server architecture
- **Deployment:** Docker containers orchestrated via Docker Compose
- **Testing:** Unit and integration tests for core logic

---

## 7. Scope & Limitations ⚠️

This application uses a **simplified and educational model** of the German tax system.  
It does **not** represent official tax calculations and must not be used as legal or financial advice.

---

## 8. Alignment with Course Task 🎓

This concept directly addresses the task requirements by:

- identifying a real-world problem,
- defining users and benefits,
- justifying the use of a SPA,
- integrating frontend, backend, architecture, and documentation,
- and preparing the foundation for structured implementation and evaluation.
