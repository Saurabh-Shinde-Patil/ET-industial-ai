import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Industrial Knowledge Intelligence AI Service"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Embedding Configuration
    EMBEDDING_MODEL_NAME: str = os.getenv("EMBEDDING_MODEL_NAME", "sentence-transformers/all-mpnet-base-v2")
    VECTOR_DIMENSION: int = 768
    
    # Confidence Score Thresholds
    CONFIDENCE_HIGH: float = 0.85
    CONFIDENCE_MEDIUM: float = 0.65
    CONFIDENCE_LOW: float = 0.50

    class Config:
        case_sensitive = True

settings = Settings()
