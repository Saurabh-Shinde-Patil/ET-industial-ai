from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()

@router.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint returning system status and embedding model metadata.
    """
    return {
        "status": "Operational",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "embedding_model": settings.EMBEDDING_MODEL_NAME,
        "vector_dimension": settings.VECTOR_DIMENSION
    }
