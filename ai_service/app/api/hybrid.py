from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from app.services.hybrid_search import hybrid_rrf_search

router = APIRouter(prefix="/search", tags=["Hybrid Reciprocal Rank Fusion Search"])
logger = logging.getLogger("ai_service.api.hybrid")

class HybridSearchRequest(BaseModel):
    query: str
    asset_id: Optional[str] = None
    top_k: Optional[int] = 10

@router.post("/hybrid")
async def hybrid_search_endpoint(request: HybridSearchRequest):
    """
    Reciprocal Rank Fusion (RRF) Hybrid Search Engine.
    Fuses BM25 sparse keyword ranking + FAISS 384-dim dense vector cosine ranking.
    """
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query payload cannot be empty")

    logger.info(f"Processing Hybrid RRF Search Query: '{request.query}' (top_k={request.top_k})")

    results = hybrid_rrf_search(
        query=request.query,
        asset_id=request.asset_id,
        top_k=request.top_k or 10
    )

    return {
        "success": True,
        "query": request.query,
        "match_count": len(results),
        "matches": results,
    }
