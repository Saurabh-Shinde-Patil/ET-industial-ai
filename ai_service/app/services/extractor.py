import os
import logging
from io import BytesIO
from app.services.cleaner import clean_industrial_text

logger = logging.getLogger("ai_service.extractor")

def extract_text_from_file(file_bytes: bytes, file_name: str) -> dict:
    """
    Multi-format industrial document parser with PyTesseract OCR fallback.
    Supports PDF, DOCX, TXT, PNG, JPG files.
    """
    ext = os.path.splitext(file_name)[1].lower()
    raw_text = ""
    page_count = 1
    is_ocr = False

    try:
        # 1. Plain Text (.txt)
        if ext == '.txt':
            raw_text = file_bytes.decode('utf-8', errors='ignore')

        # 2. PDF Files (.pdf)
        elif ext == '.pdf':
            try:
                import pdfplumber
                with pdfplumber.open(BytesIO(file_bytes)) as pdf:
                    page_count = len(pdf.pages)
                    extracted_pages = []
                    for p in pdf.pages:
                        p_text = p.extract_text() or ""
                        extracted_pages.append(p_text)
                    raw_text = "\n\n".join(extracted_pages)
            except Exception as pdf_err:
                logger.warning(f"pdfplumber extraction failed: {pdf_err}")

            # PyTesseract OCR Fallback if extracted text is sparse (< 50 chars per page)
            if len(raw_text.strip()) < (page_count * 50):
                logger.info("PDF has low text density. Triggering PyTesseract OCR fallback...")
                try:
                    import pytesseract
                    from PIL import Image
                    import fitz  # PyMuPDF if available, or pdf2image

                    # Try fitz / PyMuPDF rasterization for OCR
                    doc = fitz.open(stream=file_bytes, filetype="pdf")
                    ocr_pages = []
                    for i in range(len(doc)):
                        page = doc.load_page(i)
                        pix = page.get_pixmap()
                        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                        ocr_text = pytesseract.image_to_string(img)
                        ocr_pages.append(ocr_text)
                    raw_text = "\n\n".join(ocr_pages)
                    is_ocr = True
                except Exception as ocr_err:
                    logger.warning(f"OCR fallback encounter: {ocr_err}")

        # 3. Word Documents (.docx)
        elif ext == '.docx':
            try:
                import docx
                doc = docx.Document(BytesIO(file_bytes))
                paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
                raw_text = "\n\n".join(paragraphs)
            except Exception as docx_err:
                logger.warning(f"python-docx extraction failed: {docx_err}")
                raw_text = file_bytes.decode('utf-8', errors='ignore')

        # 4. Images (.png, .jpg, .jpeg)
        elif ext in ['.png', '.jpg', '.jpeg']:
            try:
                import pytesseract
                from PIL import Image
                img = Image.open(BytesIO(file_bytes))
                raw_text = pytesseract.image_to_string(img)
                is_ocr = True
            except Exception as img_err:
                logger.warning(f"Image OCR failed: {img_err}")

        else:
            raw_text = file_bytes.decode('utf-8', errors='ignore')

    except Exception as e:
        logger.error(f"Error during document extraction for '{file_name}': {str(e)}")

    # Clean industrial text
    cleaned_text = clean_industrial_text(raw_text)
    word_count = len(cleaned_text.split())

    return {
        "text": cleaned_text,
        "page_count": page_count,
        "is_ocr": is_ocr,
        "word_count": word_count,
    }
