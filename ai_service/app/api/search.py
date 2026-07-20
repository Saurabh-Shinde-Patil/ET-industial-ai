from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from app.services.embedder import generate_embedding
from app.services.vector_db import faiss_db

router = APIRouter(prefix="/search", tags=["Vector Similarity Search Engine"])
logger = logging.getLogger("ai_service.api.search")

class VectorSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5
    asset_id: Optional[str] = None

class IndexChunksRequest(BaseModel):
    chunks: List[dict]

@router.post("/vector")
async def vector_search(request: VectorSearchRequest):
    """
    Perform high-speed cosine vector similarity search against FAISS database index.
    """
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query statement cannot be empty")

    logger.info(f"Received FAISS vector search query: '{request.query}' (top_k={request.top_k})")

    # 1. Generate 384-dimensional query embedding
    query_vector = generate_embedding(request.query)

    # 2. Query FAISS index manager
    matches = faiss_db.search(query_vector, top_k=request.top_k, asset_id=request.asset_id)

    return {
        "success": True,
        "query": request.query,
        "match_count": len(matches),
        "matches": matches,
    }

@router.post("/index")
async def index_chunks(request: IndexChunksRequest):
    """
    Index batch of vector chunks into FAISS vector database index.
    """
    if not request.chunks:
        raise HTTPException(status_code=400, detail="Chunks payload cannot be empty")

    added_count = faiss_db.add_chunks(request.chunks)

    return {
        "success": True,
        "added_count": added_count,
        "total_indexed": len(faiss_db.metadata),
    }
