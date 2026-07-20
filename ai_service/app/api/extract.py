from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
import os
import logging
from app.services.extractor import extract_text_from_file

router = APIRouter(prefix="/extract", tags=["Text & OCR Extraction"])
logger = logging.getLogger("ai_service.api.extract")

@router.post("")
async def extract_document(
    file: Optional[UploadFile] = File(None),
    file_path: Optional[str] = Form(None)
):
    """
    Extract & clean text from multi-format industrial documents with OCR fallback.
    Accepts direct file upload (multipart/form-data) OR local file_path string.
    """
    try:
        file_bytes = b""
        file_name = "document.txt"

        if file:
            file_bytes = await file.read()
            file_name = file.filename
        elif file_path:
            if not os.path.exists(file_path):
                raise HTTPException(status_code=404, detail=f"File path not found: {file_path}")
            with open(file_path, "rb") as f:
                file_bytes = f.read()
            file_name = os.path.basename(file_path)
        else:
            raise HTTPException(status_code=400, detail="Must provide either file or file_path")

        logger.info(f"Received extraction request for '{file_name}' ({len(file_bytes)} bytes)")
        
        result = extract_text_from_file(file_bytes, file_name)

        return {
            "success": True,
            "filename": file_name,
            "text": result["text"],
            "page_count": result["page_count"],
            "is_ocr": result["is_ocr"],
            "word_count": result["word_count"],
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"Extraction failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")
