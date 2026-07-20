import logging
import hashlib
import numpy as np

logger = logging.getLogger("ai_service.embedder")

_model = None

def get_embedding_model():
    """
    Lazy singleton loader for SentenceTransformer ('all-MiniLM-L6-v2').
    Produces 384-dimensional dense vector embeddings.
    """
    global _model
    if _model is None:
        try:
            from sentence_transformers import SentenceTransformer
            logger.info("Loading SentenceTransformer model 'all-MiniLM-L6-v2' (384 dimensions)...")
            _model = SentenceTransformer('all-MiniLM-L6-v2')
            logger.info("SentenceTransformer model loaded successfully!")
        except Exception as e:
            logger.warning(f"Could not load SentenceTransformer: {str(e)}. Using fallback vector generator.")
            _model = "FALLBACK"
    return _model

def _generate_fallback_embedding(text: str, dim: int = 384) -> list:
    """
    Deterministic pseudo-embedding fallback generator for testing environments.
    Converts text hash into a normalized 384-dimensional unit vector.
    """
    hash_object = hashlib.sha256(text.encode('utf-8'))
    seed = int(hash_object.hexdigest()[:8], 16)
    np.random.seed(seed)
    vec = np.random.randn(dim)
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm
    return vec.tolist()

def generate_embedding(text: str) -> list:
    """
    Generate a 384-dimensional dense embedding vector for single string.
    """
    if not text or not text.strip():
        return [0.0] * 384

    model = get_embedding_model()
    if model == "FALLBACK":
        return _generate_fallback_embedding(text)

    try:
        embedding = model.encode(text, convert_to_numpy=True)
        # Normalize to unit length for cosine similarity
        norm = np.linalg.norm(embedding)
        if norm > 0:
            embedding = embedding / norm
        return embedding.tolist()
    except Exception as e:
        logger.error(f"Error encoding embedding: {str(e)}")
        return _generate_fallback_embedding(text)

def generate_embeddings_batch(texts: list) -> list:
    """
    Generate 384-dimensional embedding vectors for a list of strings.
    """
    if not texts:
        return []

    model = get_embedding_model()
    if model == "FALLBACK":
        return [_generate_fallback_embedding(t) for t in texts]

    try:
        embeddings = model.encode(texts, batch_size=32, convert_to_numpy=True)
        norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        normalized = (embeddings / norms).tolist()
        return normalized
    except Exception as e:
        logger.error(f"Error encoding batch embeddings: {str(e)}")
        return [_generate_fallback_embedding(t) for t in texts]
