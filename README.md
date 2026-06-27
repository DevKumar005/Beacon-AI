# BEACON AI — Intelligent Benefits Navigator

> Built for **USAII 2026 Hackathon** · Undergraduate Track · Benefits Navigator Challenge

---

## 📖 Overview

BEACON AI is an AI-powered reasoning engine that helps individuals, families, and community organizations navigate complex public support systems. It translates fragmented, hard-to-understand eligibility rules into plain language — turning confusion into clarity and actionable next steps.

**Core Distinction:** BEACON AI is not a directory of programs. It is an intelligent assistant that asks relevant questions, interprets eligibility rules against the user's specific situation, and helps users understand whether they *may* qualify for public support programs (SNAP, Medicaid, housing support, etc.) and what steps to take next.

Deployed on ()

---
 
## ⚠️ Hackathon Submission Note
 
> **Frontend and backend were developed in parallel and are both fully functional as standalone components. Due to time constraints at the end of the hackathon submission window, the two layers were not integrated before the deadline.**
 
The repositories are structured and ready for connection — the API contract is defined, environment variables are documented, and both services run independently. Full integration is the immediate next step post-submission.
 
| Component | Status | Location |
|-----------|--------|----------|
| **Backend** (FastAPI + RAG pipeline) | ✅ Complete & deployed | `backend/` |
| **Frontend** (React + Vite) | ✅ Almost Complete | `frontend/` |
| **Frontend ↔ Backend Integration** | 🔄 Pending | — |
 
---

## 🎯 The Problem

People rely on public systems for stability — food assistance, housing support, healthcare, education programs, and emergency services. These systems are often fragmented and inaccessible, especially under stress. People routinely miss support they are eligible for simply because the process is too confusing, slow, or opaque.

---

## 👥 Team

| Role | Responsibilities |
|------|-----------------|
| **[Dev](https://github.com/DevKumar005) — AI & Project Lead** | Backend, AI/RAG pipeline, deployment, repository merges, API contract definition |
| **[Param](https://github.com/paramsharma01) — Frontend** | UI/UX, React components, state management, all user-facing interactions |
| **[Rohit](https://github.com/Rohit-pal01) — Data & QA** | Knowledge base documents (policy data), test scenarios, project documentation |

---

## 🛠️ Tech Stack

The architecture is lightweight and cloud-managed to avoid memory overload (OOM errors) during deployment.

| Layer | Technology |
|-------|------------|
| **Frontend** | React, Vite, Tailwind CSS — deployed on Vercel |
| **Backend** | FastAPI + Python 3.11/3.12 — deployed on Render |
| **Primary LLM** | Google Gemini 3.5 Flash |
| **Fallback LLM** | Groq (Llama 3.1 70B) |
| **RAG Framework** | LangChain |
| **Vector Database** | Pinecone (cloud-managed, migrated from local ChromaDB) |
| **Embeddings** | Google Embeddings API (zero local RAM overhead) |

---

## 🚀 Features & AI Capabilities

- **Conversational Guided Intake** — The AI acts as a helpful caseworker, conducting a step-by-step interview to gather household size, income, and other details without requiring users to fill out forms perfectly.
- **Contextual Memory** — Session tracking remembers previous turns, so users can answer naturally ("just me and my son", "3") rather than re-entering context each time.
- **State-Driven UI Badges** — Eligibility results dynamically update the UI theme:
  - 🟢 `may_qualify` → Soft green badge/border
  - ⚪ `unlikely` → Neutral slate grey badge
  - 🔵 `need_more_info` → Soft blue badge with input chips
  - 🟠 `refer_to_human` → Bold amber warning card
- **Transparent Reasoning Engine** — An expandable accordion ("Why BEACON thinks this") breaks down the exact logic checklist, matching policy rules against the user's inputs.
- **Smart Input Chips** — Frontend chips auto-populate based on backend suggestions to streamline the intake process.

---

## 🛡️ Responsible AI & Guardrails

1. **Conditional Language — No Legal Decisions:** The system is hardcoded to never say "you qualify." It strictly uses safe framing like *"you may qualify."*
2. **Source Transparency:** Every AI response cites the exact rule or policy document used to reach its determination.
3. **Human-in-the-Loop Escalation:** For complex or ambiguous cases (vague inputs, unclear immigration status, edge-case income), the AI triggers an automatic `refer_to_human` flag and directs users to a caseworker.
4. **Off-Topic Redirection:** The system is prompt-engineered to decline out-of-scope questions (politics, weather, etc.) and redirect the user back to benefits navigation.

---

## 💻 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DevKumar005/Beacon-AI.git
cd beacon-ai
```

### 2. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Environment Variables**

Create a `.env` file inside `backend/`. **Do not commit this file.**

```env
GEMINI_API_KEY=your_google_ai_studio_key
PINECONE_API_KEY=your_pinecone_key
```

**Run the Server**

```bash
python run.py
# Or directly via Uvicorn:
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

### 3. Data Ingestion (Pinecone RAG)

Place clean policy text files inside `data/eligibility_docs/`, then run:

```bash
cd backend
python -m app.services.ingest_docs
```

> Only needs to run once, or whenever source documents are updated.

---

### 4. Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

**Environment Variables**

Create a `.env` file inside `frontend/`:

```env
# Local development
VITE_API_URL=http://localhost:8000/api

# Production — point to your deployed Render backend
```

---

## 🌿 Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — only the AI Lead merges here |
| `dev` | Integration branch for the whole team |
| `ai` | Backend & AI workspace |
| `frontend` | Frontend workspace |
| `data` | Data workspace |

---

## 🤝 Contributing

### Branch Naming Convention

| Prefix | Use for |
|--------|---------|
| `feature/` | New features or enhancements |
| `fix/` | Bug fixes |
| `docs/` | Documentation-only updates |
| `refactor/` | Code restructuring without behaviour change |
| `chore/` | Dependency updates, config changes |

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add eligibility filter for state-specific schemes
fix: correct Pinecone query returning empty results
docs: update ingest script instructions in README
refactor: extract scheme parser into separate service
```

### Pull Request Process

1. Keep your branch up to date with `dev` before opening a PR:
   ```bash
   git fetch origin
   git rebase origin/dev
   ```
2. Confirm the backend starts cleanly and the frontend builds (`npm run build`) before submitting
3. Write a clear PR description — what changed, why, and any relevant screenshots or API response samples
4. At least one team member must review and approve before merging
5. Squash noisy intermediate commits before merge
6. 

### Reporting Issues

Open a GitHub Issue with a clear title, steps to reproduce, expected vs. actual behaviour, and any relevant logs or screenshots.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
