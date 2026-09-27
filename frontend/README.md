# 🌐 AWS-USAR RAG Chatbot Frontend

This is the Next.js frontend application for the **AWS-USAR RAG Assistant**.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide Icons**, and **React Markdown**.

---

## ⚡ Features

- **Modern SaaS AI Interface**: Clean light-first interface with custom AWS-inspired branding accents.
- **Real-Time API Health Monitor**: Performs live checks against `GET /` to verify backend connectivity (`● API Connected` / `● API Offline`).
- **Interactive Sources Drawer & Modal**: Inspect full grounding document text, chunk numbers, and copy source snippets with 1 click.
- **Dynamic Top-K Retrieval**: Easily toggle between `1`, `3`, or `5` retrieved sources for your queries.
- **Recent Query History**: Automatically saves recent questions in `localStorage` for quick re-use.
- **Responsive Layout**: Full 3-part grid layout on desktop with mobile-friendly slide-over drawers.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Create `.env.local` in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 3. Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000` to view the application in your browser.

### 4. Production Build

```bash
npm run build
```

---

## 📂 Component Structure

- `app/page.tsx`: Main container managing state (messages, sources, connection, top_k).
- `components/Header.tsx`: Header bar with branding, Top-K selector, and status indicator.
- `components/Sidebar.tsx`: Left sidebar for navigation and recent query history.
- `components/ChatWindow.tsx`: Message stream renderer with empty state & loading animation.
- `components/ChatMessage.tsx`: Renders Markdown assistant answers & user message bubbles.
- `components/ChatInput.tsx`: Auto-resizing textarea with keyboard shortcuts.
- `components/SourcePanel.tsx`: Right sidebar listing retrieved grounding sources.
- `components/SourceViewer.tsx`: Full-screen modal for inspecting source text content.
- `lib/api.ts`: Centralized API service for `checkHealth()` and `sendMessage()`.
