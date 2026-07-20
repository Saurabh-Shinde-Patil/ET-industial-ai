import apiClient from './apiClient';

export const documentService = {
  /**
   * Fetch documents catalog with filters
   */
  async getDocuments(params = {}) {
    const response = await apiClient.get('/documents', { params });
    return response.data;
  },

  /**
   * Get single document details
   */
  async getDocumentById(id) {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  },

  /**
   * Trigger AI PyTesseract OCR & text extraction
   */
  async extractDocumentText(id) {
    const response = await apiClient.post(`/documents/${id}/extract`);
    return response.data;
  },

  /**
   * Upload multi-format file with metadata & asset links
   */
  async uploadDocument(formData) {
    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Update asset association links
   */
  async linkAssets(id, linkedAssetIds) {
    const response = await apiClient.put(`/documents/${id}/link-assets`, { linkedAssetIds });
    return response.data;
  },

  /**
   * Delete document
   */
  async deleteDocument(id) {
    const response = await apiClient.delete(`/documents/${id}`);
    return response.data;
  },

  /**
   * Seed ground-truth industrial documents
   */
  async seedDocuments() {
    const response = await apiClient.post('/documents/seed');
    return response.data;
  },
};
