import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = "http://localhost:8080/api";

export const getChatbotAnswer = async (question) => {
  const token = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/chatbot`, {
    params: { question },
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
