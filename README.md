# 🤖 AWS-USAR RAG Chatbot

A Retrieval-Augmented Generation (RAG) chatbot built for **AWS Cloud Club USAR** using **LangChain**, **Pinecone**, and **Google Gemini**.  
This chatbot answers questions based on custom documents (like PDFs, DOCX) and returns both the **answer** and the **source text** from the knowledge base.

---

## ⚡ Features
- ✅ Uses **Pinecone** as vector database for semantic search.  
- ✅ **Sentence-Transformers** embeddings (`all-MiniLM-L6-v2`).  
- ✅ **Google Gemini (1.5 Flash)** as the LLM for fast & reliable answers.  
- ✅ Built with **FastAPI** → simple REST API for queries.  
- ✅ Returns **sources + chunks** from Pinecone in responses.  
- ✅ Easily extensible with new documents using `ingest.py`.

---

## 🛠️ Tech Stack
- [FastAPI](https://fastapi.tiangolo.com/) – API framework  
- [LangChain](https://www.langchain.com/) – RAG pipeline  
- [Pinecone](https://www.pinecone.io/) – Vector database  
- [Google Generative AI](https://ai.google/) – LLM (Gemini)  
- [Sentence Transformers](https://www.sbert.net/) – Text embeddings  

---

## 📂 Project Structure
├── app/

│ ├── rag.py # RAG chain logic

│ ├── main.py # FastAPI server

│ └── ingest.py # Indexing documents into Pinecone

├── data/ # Your PDF/DOCX knowledge base

├── requirements.txt # Dependencies

├── .env # API keys (not pushed to GitHub)

└── README.md


# ⚙️ Setup & Installation

1️⃣ Clone the repo
```bash
git clone https://github.com/<hashmi09zx>/aws-usar-rag-chatbot.git
cd aws-usar-rag-chatbot
```

2️⃣ Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows
```

3️⃣ Install dependencies
```bash
pip install -r requirements.txt
```

4️⃣ Set up .env file

Create a .env in the root folder:

PINECONE_API_KEY=your_pinecone_key
GOOGLE_API_KEY=your_google_key

5️⃣ Ingest documents
Put your PDFs/DOCX files inside the data/ folder, then run:
```bash
python app/ingest.py
```

6️⃣ Start the server
```bash
uvicorn app.main:app --reload
```

The API will be live at → http://localhost:8000


## 📡 API Usage & Security

**Endpoint:** `POST /chat`

**Request body:**
```json
{
  "question": "what is AWS cloud club GGSIPU",
  "top_k": 3
}
```
**Response:**
```json
{
    "answer": "AWS Cloud Club GGSIPU is a student-led, student-driven user group focused on learning about the AWS Cloud and its various use cases, including security, AI, business analytics, and business transformation.  The club aims to teach students about the benefits of the cloud and how it accelerates business.  They recently hosted an event called “Cloud Innovation: Serverless and AI with AWS Leadership” on Tuesday, August 5th, 2025.",
    "sources": [
        {
            "source": "data\\AWSinformation.pdf",
            "chunk": 2.0,
            "text": "workshops, and other support. \n \nAWS Cloud Club GGSIPU:  \nAWS Cloud Clubs are student-led..."
        },
        {
            "source": "data\\AWSinformation.pdf",
            "chunk": 2.0,
            "text": "professional development at GGSIPU EDC. \n \n3- AWS Cloud Club GGSIPU Event: ..."
        },
        {
            "source": "data\\AWSinformation.pdf",
            "chunk": 0.0,
            "text": "About AWS Cloud Clubs: \nAWS Cloud Clubs are student-led user groups designed for post-secondary students..."
        }
    ]
}
```

**🙌 Credits**

Built with ❤️ for AWS Cloud Club USAR

Powered by LangChain + Pinecone + Gemini

