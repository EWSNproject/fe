import httpClient from './httpClient'; 

// 답변 작성
export const postAnswer = async (postId, content, userId) => {
  const response = await httpClient.post(
    `/posts/${postId}/answers`,
    { content, userId }
  );
  return response.data;
};

// 답변 목록 조회
export const getAnswersByPostId = async (postId) => {
  const response = await httpClient.get(`/posts/${postId}/answers`);
  return response.data;
};

// 답변 채택
export const selectAnswer = async (postId, answerId) => {
  const response = await httpClient.put(
    `/posts/${postId}/answers/${answerId}/select`,
    {}
  );
  return response.data;
};

// 답변 삭제
export const deleteAnswer = async (postId, answerId) => {
  const response = await httpClient.delete(
    `/posts/${postId}/answers/${answerId}`
  );
  return response.data;
};
