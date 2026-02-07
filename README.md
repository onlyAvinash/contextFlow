# ContextFlow MVP

ContextFlow is a hackathon MVP that showcases generative UI with Tambo. Ask a question, and the AI renders the most relevant interface component (tables, timelines, cards, and action forms).

## Prerequisites

- Node.js 18+
- npm 9+

## Setup (Beginner Friendly)

### 1) Install dependencies

Open two terminals and run:

```bash
cd frontend
npm install
```

```bash
cd backend
npm install
```

### 2) Configure environment variables

Create `frontend/.env` with your Tambo key:

```bash
VITE_TAMBO_API_KEY=YOUR_TAMBO_API_KEY
VITE_API_BASE_URL=http://localhost:3001

# Optional MCP URLs (client-side MCP)
VITE_GITHUB_MCP_URL=
VITE_NOTION_MCP_URL=
VITE_CALENDAR_MCP_URL=
```

### 3) Start the backend

```bash
cd backend
npm run dev
```

### 4) Start the frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`.

## Demo Queries

- Show me all P0 bugs assigned to me
- What did engineering ship last week?
- Who is available for a meeting tomorrow at 3pm?
- Find docs about authentication
- Summarize recent backend commits

## Notes

- The backend is intentionally mocked for hackathon reliability.
- You can replace mock data with real MCP servers later without changing the UI.
