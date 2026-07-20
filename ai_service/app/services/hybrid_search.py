import re
import math
import logging
from app.services.embedder import generate_embedding
from app.services.vector_db import faiss_db

logger = logging.getLogger("ai_service.hybrid_search")

def bm25_keyword_score(query: str, text: str) -> float:
    """
    Industrial TF-IDF / BM25 keyword matching score calculation.
    Gives heavy weight to exact equipment codes (PUMP-101, BOILER-02) and technical terms.
    """
    if not query or not text:
        return 0.0

    query_terms = re.findall(r'\w+', query.lower())
    text_lower = text.lower()

    score = 0.0
    for term in query_terms:
        # Check exact match count
        count = text_lower.count(term)
        if count > 0:
            # BM25-style non-linear term frequency scaling
            tf = (count * 2.2) / (count + 1.2)
            # Extra boost for industrial equipment codes / numbers
            boost = 2.0 if re.match(r'^[a-z]+-?\d+', term) else 1.0
            score += tf * boost

    return score

def hybrid_rrf_search(query: str, asset_id: str = None, top_k: int = 10, rrf_k: int = 60) -> list:
    """
    Reciprocal Rank Fusion (RRF) Hybrid Search Engine.
    Combines BM25 Sparse Keyword Ranking with FAISS Dense Vector Cosine Ranking.
    RRF Score(d) = 1/(k + Rank_BM25) + 1/(k + Rank_FAISS)
    """
    if not query or not query.strip():
        return []

    # 1. FAISS Dense Vector Similarity Search
    query_vector = generate_embedding(query)
    faiss_matches = faiss_db.search(query_vector, top_k=top_k * 2, asset_id=asset_id)

    # 2. BM25 Sparse Keyword Search over indexed metadata & chunks
    bm25_matches = []
    for idx, meta in enumerate(faiss_db.metadata):
        chunk_text = meta.get("text", "")
        # Apply asset filter if present
        if asset_id and asset_id not in meta.get("linkedAssetIds", []):
            continue

        score = bm25_keyword_score(query, chunk_text)
        if score > 0:
            bm25_matches.append({
                "meta": meta,
                "score": score,
            })

    # Sort BM25 matches by keyword score descending
    bm25_matches.sort(key=lambda x: x["score"], reverse=True)
    bm25_matches = bm25_matches[:top_k * 2]

    # 3. Compute Reciprocal Rank Fusion (RRF) Scores
    rrf_map = {}

    # Rank vectors from FAISS
    for rank, match in enumerate(faiss_matches):
        cid = match.get("chunkId") or f"faiss_{rank}"
        if cid not in rrf_map:
            rrf_map[cid] = {
                "chunkId": cid,
                "text": match.get("text"),
                "metadata": match.get("metadata"),
                "faiss_rank": rank + 1,
                "bm25_rank": 999,
                "faiss_score": match.get("score"),
                "rrf_score": 0.0,
            }
        rrf_map[cid]["rrf_score"] += 1.0 / (rrf_k + (rank + 1))

    # Rank keywords from BM25
    for rank, match in enumerate(bm25_matches):
        meta = match["meta"]
        cid = meta.get("chunkId") or f"bm25_{rank}"
        if cid not in rrf_map:
            rrf_map[cid] = {
                "chunkId": cid,
                "text": meta.get("text"),
                "metadata": meta.get("metadata"),
                "faiss_rank": 999,
                "bm25_rank": rank + 1,
                "faiss_score": 50.0,
                "rrf_score": 0.0,
            }
        else:
            rrf_map[cid]["bm25_rank"] = rank + 1

        rrf_map[cid]["rrf_score"] += 1.0 / (rrf_k + (rank + 1))

    # 4. Sort final results by RRF score descending
    fused_results = list(rrf_map.values())
    fused_results.sort(key=lambda x: x["rrf_score"], reverse=True)

    # Normalize RRF scores to 0-100% scale for UI display
    max_rrf = fused_results[0]["rrf_score"] if fused_results else 1.0
    for res in fused_results:
        res["score"] = round((res["rrf_score"] / max_rrf) * 100, 1)

    logger.info(f"Hybrid RRF Search for '{query}': Merged {len(faiss_matches)} vector ranks and {len(bm25_matches)} BM25 ranks into {len(fused_results)} RRF items")
    return fused_results[:top_k]
