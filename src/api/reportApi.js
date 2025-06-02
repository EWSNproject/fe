import httpClient from './httpClient';

export const reportUser = async ({ reportedUserId, reason, content }) => {
  try {
    const response = await httpClient.post(`/users/reports`, {
      reportedUserId,
      reason,
      content
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
