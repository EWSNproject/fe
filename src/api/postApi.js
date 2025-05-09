import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

// 게시글 작성
export const createPost = async (postData) => {
  const token = Cookies.get("accessToken");

  const formData = new FormData();
  formData.append("nickName", postData.nickName);
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("postType", postData.postType);
  formData.append("urlTitle", postData.urlTitle);
  formData.append("urlPath", postData.urlPath);
  formData.append("tags", postData.tags);

  // 이미지 여러 개 추가 : 아직안됨
  postData.images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await axios.post(`${BASE_URL}/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// 게시글 목록 조회
export const getPostsByType = async ({ postType, page = 0, size = 10 }) => {
  const response = await axios.get(`${BASE_URL}/posts/type`, {
    params: { postType, page, size }
  });
  return response.data;
};

// 게시글 상세 조회
export const getPostById = async (postId) => {
  const token = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 게시물 추천
export const recommendPost = async (postId) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axios.post(`${BASE_URL}/posts/${postId}/recommend`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

// 게시글 추천 해제
export const cancelRecommendPost = async (postId) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}/recommend`, { 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 게시글 수정
export const updatePost = async (postId, postData) => {
  const token = Cookies.get("accessToken");

  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("postType", postData.postType);
  formData.append("urlTitle", postData.urlTitle);
  formData.append("urlPath", postData.urlPath);
  formData.append("tags", postData.tags);

  postData.images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await axios.put(`${BASE_URL}/posts/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const searchPosts = async (word) => {

  try {
    const response = await axios.get(`${BASE_URL}/mongo/search/posts?searchTerm=${encodeURIComponent(word)}`);
    return response.data.content; 
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw error;
  }

};