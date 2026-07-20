from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import logging
from app.services.rag_chain import generate_industrial_rag_response

router = APIRouter(prefix="/chat", tags=["Conversational RAG Engine"])
logger = logging.getLogger("ai_service.api.chat")

class ChatRequest(BaseModel):
    query: str
    asset_id: Optional[str] = None
    top_k: Optional[int] = 4

@router.post("")
async def conversational_rag_chat(request: ChatRequest):
    """
    Zero-Hallucination Conversational RAG Endpoint for Industrial Knowledge Intelligence.
    Returns synthesized answer, confidence score, confidence level, and source citations.
    """
    if not request.query or not request.query.strip():
        raise HTTPException(status_code=400, detail="Query payload cannot be empty")

    logger.info(f"Processing RAG Chat Query: '{request.query}' (asset_id={request.asset_id})")

    result = generate_industrial_rag_response(
        query=request.query,
        asset_id=request.asset_id,
        top_k=request.top_k or 4
    )

    return {
        "success": True,
        "query": request.query,
        "answer": result["answer"],
        "confidence_score": result["confidence_score"],
        "confidence_level": result["confidence_level"],
        "citations": result["citations"],
    }
