import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8080/api';

export const getbookmarked = async () => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.get(`${BASE_URL}/users/me/bookmarked/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.content; // 사용자 정보 반환
    } catch (error) {
      throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
    }
  };
  
export const getUserPosts = async () => {
    try {
        const token = Cookies.get('accessToken');
        const response = await axios.get(`${BASE_URL}/users/me/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.content; 
    } catch (error) {
        throw new Error("사용자 게시글을 가져오는 데 실패했습니다.");
    }
};
export const getliked = async () => {
  try {
      const token = Cookies.get('accessToken');
      const response = await axios.get(`${BASE_URL}/users/me/recommended/posts`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data.content; 
  } catch (error) {
      throw new Error("사용자 게시글을 가져오는 데 실패했습니다.");
  }
};
