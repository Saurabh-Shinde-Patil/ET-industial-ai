from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging

from app.core.config import settings
from app.api import health, extract, embed, search, chat, hybrid

# Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("ai_service")

# FastAPI App Instance
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Python FastAPI Zero-Hallucination RAG & OCR Microservice for Industrial Knowledge Intelligence"
)

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router)
app.include_router(extract.router)
app.include_router(embed.router)
app.include_router(search.router)
app.include_router(chat.router)
app.include_router(hybrid.router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Industrial Knowledge Intelligence AI Microservice",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    logger.info("Starting Industrial AI Microservice on Port 8000...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
