import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const checkDuplicate = async (type, value) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/check-duplicate`, {
      params: {
        type,
        value
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || '중복 확인에 실패했습니다.');
    }
    throw new Error('서버와의 통신에 실패했습니다.');
  }
};

export const signup = async (userData) => {
  try {
    console.log(userData)
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || '회원가입에 실패했습니다.');
    }
    throw new Error('서버와의 통신에 실패했습니다.');
  }
};

export const login = async (userData) => {
    try {
      const { realId, password } = userData;
      const response = await axios.post(`${BASE_URL}/login`, { realId, password });
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || '로그인에 실패했습니다.');
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  };
  export const getUserInfo = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
        },
      });
      return response.data; // 사용자 정보 반환
    } catch (error) {
      throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
    }
  };


  
