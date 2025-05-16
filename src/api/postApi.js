import httpClient from './httpClient';

// 게시글 작성
export const createPost = async (postData) => {
  const formData = new FormData();
  formData.append("nickName", postData.nickName);
  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("postType", postData.postType);
  formData.append("urlTitle", postData.urlTitle);
  formData.append("urlPath", postData.urlPath);
  formData.append("tags", postData.tags);

  postData.images.forEach((file) => {
    formData.append("images", file);
  });

  const response = await httpClient.post(`/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 게시글 목록 조회
export const getPostsByType = async ({ postType, page = 0, size = 10 }) => {
  const response = await httpClient.get(`/posts/type`, {
    params: { postType, page, size }
  });
  return response.data;
};

// 게시글 상세 조회
export const getPostById = async (postId) => {
  const response = await httpClient.get(`/posts/${postId}`);
  return response.data;
};

// 게시물 추천
export const recommendPost = async (postId) => {
  const response = await httpClient.post(`/posts/${postId}/recommend`);
  return response.data;
};

// 게시글 추천 해제
export const cancelRecommendPost = async (postId) => {
  const response = await httpClient.delete(`/posts/${postId}/recommend`);
  return response.data;
};

// 게시글 수정
export const updatePost = async (postId, postData) => {
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

  const response = await httpClient.put(`/posts/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 통합 게시글 검색
export const searchAllPosts = async (word) => {
  try {
    const response = await httpClient.get(`/mongo/search/posts?searchTerm=${encodeURIComponent(word)}`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw error;
  }
};

// 게시글 검색
export const searchPosts = async (searchTerm, page = 0, size = 10) => {
  try {
    const response = await httpClient.get(`/mongo/search/posts`, {
      params: {
        searchTerm,
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("게시글 검색 실패");
  }
};