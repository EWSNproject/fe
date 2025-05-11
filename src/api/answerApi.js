import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

// 답변 작성
export const postAnswer = async (postId, content, userId) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/answers`,
      { content, userId }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 답변 목록 조회
export const getAnswersByPostId = async (postId) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axios.get(
      `${BASE_URL}/posts/${postId}/answers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 답변 채택 
export const selectAnswer = async (postId, answerId) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios.put(
      `${BASE_URL}/posts/${postId}/answers/${answerId}/select`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 답변 삭제
export const deleteAnswer = async (postId, answerId) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios.delete(
      `${BASE_URL}/posts/${postId}/answers/${answerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};



