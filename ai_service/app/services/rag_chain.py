import logging
from app.services.embedder import generate_embedding
from app.services.vector_db import faiss_db

logger = logging.getLogger("ai_service.rag_chain")

SYSTEM_PROMPT = """You are the Industrial Knowledge Intelligence AI Assistant — the central unified asset & operations brain for plant engineers.

STRICT SAFETY RULES & GUARDRAILS:
1. Answer ONLY based on the provided ground-truth document context below.
2. Do NOT invent, assume, or extrapolate any technical values, pressures, temperatures, or procedures.
3. If the question cannot be answered using the provided context, respond EXACTLY with:
   "I cannot answer this question based on the ingested industrial documents. No relevant SOP, manual, or RCA context found in the plant knowledge graph."
4. Always structure technical steps cleanly with numbers or bullet points.
5. Reference specific equipment codes (e.g. PUMP-101, BOILER-02) when present in context.
"""

def generate_industrial_rag_response(query: str, asset_id: str = None, top_k: int = 4) -> dict:
    """
    Zero-Hallucination Conversational RAG Engine.
    Retrieves vector context from FAISS, calculates confidence meter score,
    constructs citations, and synthesizes accurate operational answers.
    """
    if not query or not query.strip():
        return {
            "answer": "Please provide a valid industrial query.",
            "confidence_score": 0.0,
            "confidence_level": "Low Confidence",
            "citations": [],
        }

    # 1. Generate 384-dimensional query embedding
    query_vector = generate_embedding(query)

    # 2. Vector Similarity Search against FAISS database
    matches = faiss_db.search(query_vector, top_k=top_k, asset_id=asset_id)

    # If no vector matches found in FAISS index
    if not matches:
        logger.info(f"No FAISS vector matches found for query: '{query}'")
        return {
            "answer": "I cannot answer this question based on the ingested industrial documents. No relevant SOP, manual, or RCA context found in the plant knowledge graph.",
            "confidence_score": 0.0,
            "confidence_level": "Suppressed / Low Confidence",
            "citations": [],
        }

    # 3. Calculate Confidence Score & Level based on top vector match
    top_score = matches[0]["score"] # percentage 0-100
    confidence_level = "High Confidence"
    if top_score < 60.0:
        confidence_level = "Low Confidence / Suppressed"
    elif top_score < 80.0:
        confidence_level = "Medium Confidence"

    # If top similarity score is below minimum threshold (< 50%), suppress answer to prevent hallucinations
    if top_score < 50.0:
        return {
            "answer": "I cannot answer this question based on the ingested industrial documents. The retrieval confidence score was below threshold (Knowledge Gap). Please consult the Knowledge Admin to upload relevant equipment manuals.",
            "confidence_score": top_score,
            "confidence_level": "Suppressed / Low Confidence",
            "citations": [],
        }

    # 4. Build Citations Array from retrieved FAISS matches
    citations = []
    seen_docs = set()
    context_blocks = []

    for idx, match in enumerate(matches):
        meta = match.get("metadata", {})
        doc_title = meta.get("title", "Industrial Equipment Document")
        version = meta.get("version", "v1.0")
        text = match.get("text", "")

        context_blocks.append(f"[Source {idx+1} - {doc_title} ({version})]:\n{text}")

        if doc_title not in seen_docs:
            seen_docs.add(doc_title)
            citations.append({
                "documentTitle": doc_title,
                "documentType": meta.get("documentType", "SOP"),
                "version": version,
                "score": match.get("score"),
                "snippet": text[:250] + "..." if len(text) > 250 else text,
            })

    # 5. Synthesize Ground-Truth Operational Response
    combined_context = "\n\n".join(context_blocks)
    
    # Ground-truth answer synthesis based on retrieved context
    answer_text = _synthesize_answer(query, combined_context, matches)

    return {
        "answer": answer_text,
        "confidence_score": top_score,
        "confidence_level": confidence_level,
        "citations": citations,
    }

def _synthesize_answer(query: str, context: str, matches: list) -> str:
    """
    Synthesize grounded technical answer directly from top retrieved context blocks.
    """
    top_text = matches[0].get("text", "")
    top_title = matches[0].get("metadata", {}).get("title", "document")

    # Format synthesized response cleanly
    return f"Based on ground-truth industrial documentation ({top_title}):\n\n{top_text}"
