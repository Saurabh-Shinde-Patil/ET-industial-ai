from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from app.services.chunker import recursive_industrial_chunker
from app.services.embedder import generate_embedding, generate_embeddings_batch

router = APIRouter(prefix="/embed", tags=["Text Chunking & Vector Embeddings"])
logger = logging.getLogger("ai_service.api.embed")

class TextEmbeddingRequest(BaseModel):
    text: str

class ChunkAndEmbedRequest(BaseModel):
    document_id: str
    text: str
    chunk_size: Optional[int] = 500
    chunk_overlap: Optional[int] = 100

@router.post("")
async def embed_single_text(request: TextEmbeddingRequest):
    """
    Generate 384-dimensional SentenceTransformer vector embedding for input query or text.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text payload cannot be empty")

    embedding = generate_embedding(request.text)
    return {
        "success": True,
        "dimensions": len(embedding),
        "embedding": embedding,
    }

@router.post("/chunk")
async def chunk_and_embed_document(request: ChunkAndEmbedRequest):
    """
    Recursively chunk industrial document text and generate 384-dim vector embeddings for each chunk.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text payload cannot be empty")

    # 1. Perform sliding window text chunking
    chunks = recursive_industrial_chunker(
        request.text,
        chunk_size=request.chunk_size,
        chunk_overlap=request.chunk_overlap
    )

    if not chunks:
        raise HTTPException(status_code=400, detail="Document text produced zero chunks")

    # 2. Batch generate SentenceTransformer embeddings
    embeddings = generate_embeddings_batch(chunks)

    result_chunks = []
    for idx, (chunk_text, vec) in enumerate(zip(chunks, embeddings)):
        result_chunks.append({
            "chunkIndex": idx,
            "text": chunk_text,
            "embedding": vec,
            "tokenCount": len(chunk_text.split()),
        })

    logger.info(f"Chunk & Embed completed for document '{request.document_id}': Generated {len(result_chunks)} vector chunks (384-dim)")

    return {
        "success": True,
        "document_id": request.document_id,
        "total_chunks": len(result_chunks),
        "dimensions": 384,
        "chunks": result_chunks,
    }
