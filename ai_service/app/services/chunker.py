import re
import logging

logger = logging.getLogger("ai_service.chunker")

def recursive_industrial_chunker(text: str, chunk_size: int = 500, chunk_overlap: int = 100) -> list:
    """
    Sliding window recursive text chunker tailored for industrial SOPs and technical manuals.
    Preserves section headings, safety alerts (DANGER/WARNING), and equipment tags (PUMP-101).
    """
    if not text or not text.strip():
        return []

    # Separators ordered by structural importance
    separators = ["\n\n", "\n", ". ", "; ", " "]

    def split_text(text_block: str, current_sep_index: int = 0) -> list:
        if len(text_block) <= chunk_size or current_sep_index >= len(separators):
            return [text_block.strip()] if text_block.strip() else []

        sep = separators[current_sep_index]
        splits = text_block.split(sep)
        chunks = []
        current_chunk = ""

        for part in splits:
            item = part if current_chunk == "" else sep + part
            if len(current_chunk) + len(item) <= chunk_size:
                current_chunk += item
            else:
                if current_chunk.strip():
                    chunks.append(current_chunk.strip())
                # If a single item exceeds chunk_size, recursively split it with next separator
                if len(item) > chunk_size:
                    sub_chunks = split_text(part, current_sep_index + 1)
                    chunks.extend(sub_chunks)
                    current_chunk = ""
                else:
                    current_chunk = part.strip()

        if current_chunk.strip():
            chunks.append(current_chunk.strip())

        return chunks

    raw_chunks = split_text(text)

    # Apply overlap buffer across consecutive chunks for context preservation
    overlapped_chunks = []
    for i, chunk in enumerate(raw_chunks):
        if i > 0 and chunk_overlap > 0:
            prev_suffix = raw_chunks[i - 1][-chunk_overlap:]
            chunk = f"...{prev_suffix}\n{chunk}"
        overlapped_chunks.append(chunk)

    logger.info(f"Chunked document text ({len(text)} chars) into {len(overlapped_chunks)} chunks (target size {chunk_size}, overlap {chunk_overlap})")
    return overlapped_chunks
