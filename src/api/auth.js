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
