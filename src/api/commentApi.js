import httpClient from './httpClient';

// 댓글 작성
export const postComment = async (postId, content, userId, nickname) => {
  const response = await httpClient.post(
    `/posts/${postId}/comments`,
    { content, userId, nickname }
  );
  return response.data;
};

// 댓글 목록 조회
export const getCommentsByPostId = async (postId) => {
  const response = await httpClient.get(`/posts/${postId}/comments`);
  return response.data;
};

// 댓글 삭제
export const deleteComment = async (postId, commentId) => {
  const response = await httpClient.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
};

// 대댓글 작성
export const postReply = async (postId, commentId, content, userId, nickname) => {
  const response = await httpClient.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    { content, userId, nickname }
  );
  return response.data;
};

// 대댓글 목록 조회
export const getRepliesByCommentId = async (postId, commentId) => {
  const response = await httpClient.get(`/posts/${postId}/comments/${commentId}/replies`);
  return response.data.content;
};