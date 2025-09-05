import os
from typing import List
from pathlib import Path
import PyPDF2
import docx

def extract_text_from_file(path: str) -> str:
    p = Path(path)
    if p.suffix.lower() == ".pdf":
        return extract_text_from_pdf(path)
    elif p.suffix.lower() in (".txt",):
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    elif p.suffix.lower() in (".docx",):
        return extract_text_from_docx(path)
    else:
        return ""

def extract_text_from_pdf(path: str) -> str:
    text = []
    with open(path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text.append(t)
    return "\n".join(text)

def extract_text_from_docx(path: str) -> str:
    doc = docx.Document(path)
    return "\n".join(p.text for p in doc.paragraphs)

def chunk_text(text: str, chunk_size: int = None, overlap: int = None) -> List[str]:
    import os
    chunk_size = int(os.getenv("CHUNK_SIZE", 1000)) if chunk_size is None else chunk_size
    overlap = int(os.getenv("CHUNK_OVERLAP", 200)) if overlap is None else overlap
    tokens = text.split()
    if not tokens:
        return []
    chunks = []
    i = 0
    while i < len(tokens):
        chunk = tokens[i:i+chunk_size]
        chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks
