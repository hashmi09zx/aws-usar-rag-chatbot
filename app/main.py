import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag import get_rag_chain, format_response

app = FastAPI(title="AWS-USAR RAG Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Query(BaseModel):
    question: str
    top_k: int = 4


@app.get("/")
async def root():
    return {"message": "AWS-USAR RAG Chatbot API is running!", "status": "online"}


@app.post("/chat")
async def chat(q: Query):
    if not q.question.strip():
        raise HTTPException(status_code=400, detail="question empty")

    # initialize chain with user-requested top_k
    qa_chain = get_rag_chain(top_k=q.top_k)
    result = qa_chain.invoke({"query": q.question})
    return format_response(result)
   # ✅ clean formatted response
