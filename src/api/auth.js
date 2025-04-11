import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // 실제 API URL로 변경하세요

// 로그인
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('로그인 오류:', error);
    throw error;
  }
};

// 회원가입
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('회원가입 오류:', error);
    throw error;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error('로그아웃 오류:', error);
    throw error;
  }
};

// 토큰 재발급
export const refreshToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/token/refresh`);
    return response.data;
  } catch (error) {
    console.error('토큰 재발급 오류:', error);
    throw error;
  }
};