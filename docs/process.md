# 🔄 Development Process – Gehalt Rechner

## 1. Purpose of the Development Process 🧠

The development of the _Gehalt Rechner_ web application follows a **structured yet flexible process model** that supports systematic planning, iterative implementation, and continuous reflection.

The chosen process model ensures that:

- requirements are clearly derived from the task description,
- implementation decisions are traceable,
- development is integrated into all project phases,
- and learning outcomes are continuously reflected.

---

## 2. Choice of Process Model: Scrum 🏃‍♂️

A **Scrum-based process model** was selected for this project.

### Why Scrum?

Scrum was chosen because it:

- promotes **iterative and incremental development**,
- allows early validation of ideas and technical decisions,
- supports frequent reflection and improvement,
- aligns well with exploratory software development,
- is commonly used in modern web development projects.

The project requirements were not fully fixed at the beginning, especially regarding implementation details, UI design, and calculation logic. Scrum provides the flexibility needed to gradually refine these aspects while maintaining a clear structure.

---

## 3. Adapting Scrum for an Indie Developer Context ⚙️

This project is developed by a **single developer**, not by a team.  
Therefore, Scrum is applied in a **lightweight and adapted form**.

### Role Adaptation

- **Product Owner:**  
  The developer derives and prioritizes requirements directly from the course task and user needs.
- **Development Team:**  
  The developer implements frontend, backend, tests, and documentation.
- **Scrum Master:**  
  The developer monitors progress, reflects on challenges, and adjusts the process when necessary.

This role consolidation preserves Scrum principles while remaining realistic for an individual project.

---

## 4. Why No Atlassian / Jira / Confluence? 🧩

Professional Scrum environments often rely on tools such as **Jira** or **Confluence** to manage backlogs, sprints, and documentation.  
However, for this project, these tools were **intentionally not used**.

### Justification

- The project is developed by a **single developer**, not a team.
- Tool-heavy Scrum setups introduce unnecessary overhead in a solo context.
- The focus of this project is on **software engineering concepts**, not tool mastery.
- Using multiple external tools would reduce development efficiency without adding real value.

Instead, a **lean documentation-first approach** was chosen.

---

## 5. Why VS Code & GitHub as the Central Workflow 🛠️

All planning, documentation, and implementation are performed directly within:

- **Visual Studio Code**
- **GitHub**

### Advantages of this approach:

- Immediate proximity between **code and documentation**
- Faster iteration and reduced context switching
- Clear version history via Git commits
- Transparent traceability of decisions and progress
- Simplified workflow suitable for an indie developer

Documentation files (`concept.md`, `requirements.md`, `process.md`, `architecture.md`) serve as lightweight but effective substitutes for traditional Scrum artifacts such as:

- product backlog,
- sprint backlog,
- sprint reviews.

---

## 6. Sprint-Oriented Development Structure 📆

Even without formal Scrum tooling, development is organized into **logical sprints**:

### Sprint 1 – Concept & Requirements

- Problem analysis
- User and benefit definition
- Concept creation
- Requirements specification
- Tutor approval preparation

### Sprint 2 – Architecture & Design

- Software architecture definition
- Backend integration into architecture
- Wireframe creation
- Architectural documentation

### Sprint 3 – Backend Implementation

- API design and implementation
- Salary calculation logic
- Validation and backend testing

### Sprint 4 – Frontend Implementation

- SPA development using React
- User interface implementation
- Backend integration
- Frontend testing

### Sprint 5 – Finalization & Reflection

- Dockerization and Docker Compose setup
- End-to-end testing
- Documentation completion
- Critical evaluation and reflection

---

## 7. Continuous Reflection & Learning 🔁

Reflection is treated as an integral part of the process:

- decisions are reviewed after each sprint,
- challenges are documented,
- improvements are identified,
- lessons learned are captured in `reflection.md`.

This supports both technical growth and personal development.

---

## 8. Alignment with Course Requirements 🎓

The selected and adapted Scrum-based process fulfills the course requirements by:

- applying a recognized process model,
- justifying deviations based on project context,
- integrating development into all phases,
- documenting decisions transparently,
- enabling critical evaluation of the final result.

The process demonstrates not only _how_ the application was built, but _why_ specific methodological choices were made.
