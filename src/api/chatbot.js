import httpClient from './httpClient';

export const getChatbotAnswer = async (question) => {
  const response = await httpClient.get(`/chatbot`, {
    params: { question },
  });
  return response.data;
};
