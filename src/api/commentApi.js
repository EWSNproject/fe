import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

// 댓글 작성
export const postComment = async (postId, content, userId, nickname) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/comments`,
      { content, userId, nickname }, 
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

// 댓글 목록 조회
export const getCommentsByPostId = async (postId) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axios.get(
      `${BASE_URL}/posts/${postId}/comments`,
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

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axios.delete(
      `${BASE_URL}/posts/${postId}/comments/${commentId}`,
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


// 대댓글 작성
export const postReply = async (postId, commentId, content, userId, nickname) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios.post(
      `${BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
      { content, userId, nickname },
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

// 대댓글 목록 조회
export const getRepliesByCommentId = async (postId, commentId) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios.get(
      `${BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.content; 
  } catch (error) {
    throw error;
  }
};