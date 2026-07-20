import apiClient from './apiClient';

export const searchService = {
  /**
   * Perform FAISS Vector Similarity Search
   */
  async searchVectorDatabase(params) {
    const response = await apiClient.post('/search/vector', params);
    return response.data;
  },
};
