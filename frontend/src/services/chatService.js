import apiClient from './apiClient';

export const chatService = {
  /**
   * Send query to Conversational RAG Engine
   */
  async sendChatMessage(params) {
    const response = await apiClient.post('/chat', params);
    return response.data;
  },
};
