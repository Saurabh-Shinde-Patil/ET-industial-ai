import re
import logging

logger = logging.getLogger("ai_service.cleaner")

def clean_industrial_text(raw_text: str) -> str:
    """
    Clean and normalize extracted industrial text.
    Removes OCR noise, normalizes whitespace, and preserves industrial units & equipment codes.
    """
    if not raw_text:
        return ""

    # Replace non-printable ASCII / control characters (except newlines & tabs)
    text = re.sub(r'[^\x09\x0A\x0D\x20-\x7E\xC0-\xFF]', ' ', raw_text)

    # Normalize multiple spaces into a single space
    text = re.sub(r'[ \t]+', ' ', text)

    # Normalize multiple blank lines into max 2 newlines
    text = re.sub(r'\n{3,}', '\n\n', text)

    # Standardize common OCR unit typos
    # e.g., 'm3 / h' -> 'm³/h', 'deg C' -> '°C', 'bar a' -> 'bar'
    text = re.sub(r'\bm3\s*/\s*h\b', 'm³/h', text, flags=re.IGNORECASE)
    text = re.sub(r'\bdeg\s*C\b', '°C', text, flags=re.IGNORECASE)
    text = re.sub(r'\bRPMs?\b', 'RPM', text)

    cleaned = text.strip()
    logger.info(f"Cleaned industrial text: Reduced from {len(raw_text)} to {len(cleaned)} chars")
    return cleaned
