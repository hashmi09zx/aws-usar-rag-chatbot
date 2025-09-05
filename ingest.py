import os
import glob
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from pinecone import Pinecone, ServerlessSpec
from langchain.schema import Document

# Load environment variables
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX", "aws-usar-index")

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)

# Make sure index exists
if PINECONE_INDEX not in [i["name"] for i in pc.list_indexes()]:
    pc.create_index(
        name=PINECONE_INDEX,
        dimension=384,  # all-MiniLM-L6-v2 output size
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")  # adjust if needed
    )

# Connect to index
index = pc.Index(PINECONE_INDEX)

# Load embedding model
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def process_pdfs(data_path="data/*.pdf"):
    """Load PDFs and return list of LangChain Document objects with metadata."""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    docs = []
    for file_path in glob.glob(data_path):
        print(f"Loading {file_path}")
        loader = PyPDFLoader(file_path)
        raw_docs = loader.load()
        for doc in raw_docs:
            chunks = text_splitter.split_text(doc.page_content)
            for i, chunk in enumerate(chunks):
                docs.append(Document(
                    page_content=chunk,
                    metadata={"source": file_path, "chunk": i}
                ))
    return docs

def main():
    # 1. Load and chunk PDFs into Documents
    docs = process_pdfs()
    print(f"Split into {len(docs)} chunks")

    # 2. Embed and upsert into Pinecone
    print(f"Upserting into Pinecone index '{PINECONE_INDEX}' ...")
    vectors = []
    for i, doc in enumerate(docs):
        vector = embeddings.embed_query(doc.page_content)
        vectors.append({
            "id": f"doc-{i}",
            "values": vector,
            "metadata": doc.metadata | {"text": doc.page_content}  # ✅ keep both text + metadata
        })

    index.upsert(vectors=vectors)
    print("✅ Data successfully ingested!")


if __name__ == "__main__":
    main()
