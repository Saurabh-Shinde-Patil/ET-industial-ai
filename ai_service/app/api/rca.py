from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import logging
from app.services.rca_engine import generate_5whys_root_cause

router = APIRouter(prefix="/rca", tags=["AI Root Cause Analysis Engine"])
logger = logging.getLogger("ai_service.api.rca")

class RCAGenerateRequest(BaseModel):
    title: str
    symptom: str
    asset_code: Optional[str] = "PUMP-101"

@router.post("/generate-5whys")
async def generate_5whys_analysis(request: RCAGenerateRequest):
    """
    Generate structured 5-Whys Root Cause Analysis steps for an industrial incident.
    """
    if not request.title or not request.symptom:
        raise HTTPException(status_code=400, detail="title and symptom are required")

    logger.info(f"Received AI 5-Whys RCA request for asset {request.asset_code}: '{request.title}'")

    result = generate_5whys_root_cause(request.title, request.symptom, request.asset_code)

    return {
        "success": True,
        "asset_code": result["asset_code"],
        "title": result["title"],
        "root_cause_category": result["root_cause_category"],
        "five_whys": result["five_whys"],
        "corrective_actions": result["corrective_actions"],
    }
