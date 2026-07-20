import apiClient from './apiClient';

export const assetService = {
  /**
   * Get plant asset tree hierarchy
   */
  async getAssetTree() {
    const response = await apiClient.get('/assets/tree');
    return response.data;
  },

  /**
   * Query asset list with filters
   */
  async getAssets(params = {}) {
    const response = await apiClient.get('/assets', { params });
    return response.data;
  },

  /**
   * Get single asset profile details
   */
  async getAssetById(id) {
    const response = await apiClient.get(`/assets/${id}`);
    return response.data;
  },

  /**
   * Create asset node
   */
  async createAsset(assetData) {
    const response = await apiClient.post('/assets', assetData);
    return response.data;
  },

  /**
   * Update asset details
   */
  async updateAsset(id, assetData) {
    const response = await apiClient.put(`/assets/${id}`, assetData);
    return response.data;
  },

  /**
   * Delete asset node
   */
  async deleteAsset(id) {
    const response = await apiClient.delete(`/assets/${id}`);
    return response.data;
  },

  /**
   * Seed demo plant assets
   */
  async seedAssets() {
    const response = await apiClient.post('/assets/seed');
    return response.data;
  },
};
