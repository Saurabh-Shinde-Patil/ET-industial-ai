import apiClient from './apiClient';

export const analyticsService = {
  /**
   * Fetch aggregated analytics summary
   */
  async getAnalyticsSummary() {
    const response = await apiClient.get('/analytics/summary');
    return response.data;
  },
};
