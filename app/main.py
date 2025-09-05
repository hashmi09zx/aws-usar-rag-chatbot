import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.rag import get_rag_chain, format_response   # ✅ import format_response

app = FastAPI(title="AWS-USAR RAG Chatbot")


class Query(BaseModel):
    question: str
    top_k: int = 4


# ✅ initialize chain once
qa_chain = get_rag_chain()


@app.post("/chat")
async def chat(q: Query):
    if not q.question.strip():
        raise HTTPException(status_code=400, detail="question empty")

    # run query
    result = qa_chain.invoke({"query": q.question})
    return format_response(result)   # ✅ clean formatted response
