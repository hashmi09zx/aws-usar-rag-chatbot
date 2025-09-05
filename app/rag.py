import os
from dotenv import load_dotenv
from pinecone import Pinecone
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain_pinecone import PineconeVectorStore
from langchain_huggingface import HuggingFaceEmbeddings

load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
INDEX_NAME = "aws-usar-index"


def get_rag_chain():
    # ✅ Pinecone client
    pc = Pinecone(api_key=PINECONE_API_KEY)
    index = pc.Index(INDEX_NAME)

    # ✅ Embeddings
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # ✅ Vectorstore retriever
    vectorstore = PineconeVectorStore(
        index=index,
        embedding=embeddings,
        text_key="text",   # matches what you stored in ingest.py
        namespace=""
    )
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    # ✅ Gemini LLM
    llm = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0,
        google_api_key=GOOGLE_API_KEY
    )

    # ✅ Prompt
    prompt_template = """
    You are an AI assistant for AWS Cloud Club USAR. 
Use the context below to answer the question. 
Always list all events found in the documents if the question asks about events. 
If the answer is not in the context, reply: "I don’t know based on my knowledge."

Context:
{context}

Question:
{question}

Answer (be complete and specific ):
    """
    PROMPT = PromptTemplate(
        template=prompt_template,
        input_variables=["context", "question"]
    )

    # ✅ RetrievalQA chain with source docs
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type="stuff",
        chain_type_kwargs={"prompt": PROMPT},
        return_source_documents=True
    )

    return qa_chain


def format_response(result):
    """Format the QA result to include answer + source + chunk metadata"""
    answer = result.get("result", "")
    sources = []
    for doc in result.get("source_documents", []):
        sources.append({
            "source": doc.metadata.get("source"),
            "chunk": doc.metadata.get("chunk"),
            "text": doc.page_content
        })
    return {"answer": answer, "sources": sources}
