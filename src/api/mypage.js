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
