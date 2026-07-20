from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import logging
from app.services.pm_engine import calculate_predictive_pm_risk

router = APIRouter(prefix="/pm", tags=["AI Predictive Maintenance Engine"])
logger = logging.getLogger("ai_service.api.pm")

class PMAnalyzeRequest(BaseModel):
    asset_code: str
    category: Optional[str] = "General"

@router.post("/analyze")
async def analyze_asset_pm_risk(request: PMAnalyzeRequest):
    """
    Calculate AI predictive failure risk score & generate PM recommendations.
    """
    if not request.asset_code:
        raise HTTPException(status_code=400, detail="asset_code is required")

    logger.info(f"Received AI PM Risk analysis request for asset: {request.asset_code}")

    result = calculate_predictive_pm_risk(request.asset_code, request.category)

    return {
        "success": True,
        "asset_code": result["asset_code"],
        "risk_score": result["risk_score"],
        "priority": result["priority"],
        "justification": result["justification"],
        "action_items": result["action_items"],
    }
