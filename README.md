# 🤖 AWS-USAR RAG Assistant

A full-stack, production-ready Retrieval-Augmented Generation (RAG) system built for **AWS Cloud Club USAR**. 

Powered by **FastAPI**, **LangChain**, **Pinecone Vector DB**, **Google Gemini**, and a modern **Next.js 16 + Tailwind CSS** frontend.

---

## ⚡ Key Features

- ✅ **Semantic Document Search**: Vector retrieval powered by **Pinecone** and HuggingFace **Sentence-Transformers** (`all-MiniLM-L6-v2`).
- ✅ **LLM Response Generation**: Grounded answer synthesis using **Google Gemini**.
- ✅ **Full-Stack SaaS Architecture**: FastAPI backend + Next.js App Router frontend with TypeScript.
- ✅ **Document Grounding & Citation Viewer**: Clickable source cards, chunk previews, full text modal, and 1-click text copying.
- ✅ **Dynamic Top-K Retrieval Control**: Select number of grounding sources (`1`, `3`, or `5`) in real-time.
- ✅ **Live API Connection Monitor**: Real-time status indicator (`● API Connected` / `● API Offline`) checking backend health `GET /`.
- ✅ **Recent Query Persistence**: LocalStorage query history with quick restoration and new chat clearing.
- ✅ **Rich Markdown Rendering**: Clean formatting for headings, bullet lists, bold text, and code blocks.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** – High-performance Python REST API with CORS support
- **LangChain** – RAG orchestration & chain management
- **Pinecone** – Vector database for similarity search
- **Google Generative AI** – LLM engine (Gemini Flash)
- **Sentence Transformers** – Embedding generation (`all-MiniLM-L6-v2`)

### Frontend
- **Next.js 16** (App Router) – React framework
- **TypeScript** – Type-safe UI components
- **Tailwind CSS v4** – Modern responsive styling
- **Lucide React** – Clean SVG icon system
- **React Markdown & Remark GFM** – Markdown rendering

---

## 📂 Project Architecture

```text
aws-usar-rag-chatbot/
├── app/
│   ├── main.py              # FastAPI server with CORS & endpoints
│   ├── rag.py               # LangChain + Pinecone + Gemini RAG chain
│   └── utils.py             # Helper utilities
├── data/                    # Knowledge base documents (PDF, DOCX)
├── frontend/                # Next.js frontend application
│   ├── app/                 # Next.js App Router (page, layout, globals.css)
│   ├── components/          # React UI components
│   │   ├── Header.tsx       # Top bar with status & Top-K selector
│   │   ├── Sidebar.tsx      # Navigation drawer & recent query history
│   │   ├── ChatWindow.tsx   # Message stream & animated loader
│   │   ├── ChatMessage.tsx  # User/Assistant message card with Markdown
│   │   ├── ChatInput.tsx    # Textarea input with keyboard shortcuts
│   │   ├── SourcePanel.tsx  # Grounding sources sidebar
│   │   ├── SourceCard.tsx   # Individual retrieved chunk card
│   │   ├── SourceViewer.tsx # Full-screen source text viewer modal
│   │   ├── EmptyState.tsx   # Welcome screen & suggested prompts
│   │   └── ConnectionStatus.tsx # Live API connection badge
│   ├── lib/
│   │   └── api.ts           # Centralized API service layer
│   ├── types/
│   │   └── chat.ts          # TypeScript type definitions
│   └── .env.example         # Environment template for frontend
├── ingest.py                # Script to chunk & index documents into Pinecone
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/hashmi09zx/aws-usar-rag-chatbot.git
cd aws-usar-rag-chatbot
```

---

### 2️⃣ Backend Setup (FastAPI)

1. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate        # On Mac/Linux
   # or
   venv\Scripts\activate           # On Windows
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   PINECONE_API_KEY=your_pinecone_api_key
   GOOGLE_API_KEY=your_google_gemini_api_key
   PINECONE_INDEX=aws-usar-index
   GEMINI_MODEL=gemini-3.8-flash
   ```

4. **Ingest Knowledge Documents**:
   Place your PDFs or DOCX files inside the `data/` directory, then run:
   ```bash
   python ingest.py
   ```

5. **Start the FastAPI Server**:
   ```bash
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
   The backend API will be available at: `http://127.0.0.1:8000`

---

### 3️⃣ Frontend Setup (Next.js)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file inside `frontend/` (or copy `.env.example`):
   ```bash
   cp .env.example .env.local
   ```
   Contents of `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```

4. **Start the Next.js Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to launch the web interface.

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📡 API Reference

### Health Check
- **Endpoint**: `GET /`
- **Response**:
  ```json
  {
    "message": "AWS-USAR RAG Chatbot API is running!",
    "status": "online"
  }
  ```

### Chat Query
- **Endpoint**: `POST /chat`
- **Request Body**:
  ```json
  {
    "question": "What is AWS Cloud Club GGSIPU?",
    "top_k": 3
  }
  ```
- **Response**:
  ```json
  {
    "answer": "AWS Cloud Club GGSIPU is a student-led user group focused on cloud technologies...",
    "sources": [
      {
        "source": "data/AWSinformation.pdf",
        "chunk": 2,
        "text": "AWS Cloud Club GGSIPU: AWS Cloud Clubs are student-led, student-driven user groups..."
      }
    ]
  }
  ```

---

## 🙌 Credits

Built with ❤️ for **AWS Cloud Club USAR**.  
Powered by **FastAPI**, **Pinecone**, **Gemini**, and **Next.js**.
