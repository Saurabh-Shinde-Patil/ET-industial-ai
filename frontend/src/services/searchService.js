import apiClient from './apiClient';

export const searchService = {
  /**
   * Perform FAISS Vector Similarity Search
   */
  async searchVectorDatabase(params) {
    const response = await apiClient.post('/search/vector', params);
    return response.data;
  },

  /**
   * Perform Reciprocal Rank Fusion (RRF) Hybrid Search (BM25 + FAISS)
   */
  async searchHybridDatabase(params) {
    const response = await apiClient.post('/search/hybrid', params);
    return response.data;
  },
};
