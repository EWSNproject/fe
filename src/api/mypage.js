import httpClient from './httpClient';

export const getbookmarked = async () => {
  try {
    const response = await httpClient.get('/users/me/bookmarked/posts');
    return response.data.content; 
  } catch (error) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};

export const getUserPosts = async () => {
  try {
    const response = await httpClient.get('/users/me/posts');
    return response.data.content; 
  } catch (error) {
    throw new Error("사용자 게시글을 가져오는 데 실패했습니다.");
  }
};

export const getliked = async () => {
  try {
    const response = await httpClient.get('/users/me/recommended/posts');
    return response.data.content; 
  } catch (error) {
    throw new Error("사용자 게시글을 가져오는 데 실패했습니다.");
  }
};
