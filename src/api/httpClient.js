import axios from 'axios';
import Cookies from 'js-cookie';
import { showSessionExpiredModal } from '../utils/sessionExpired'; 

const BASE_URL = 'http://localhost:8080/api';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ 요청 시 accessToken 자동 주입
httpClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 401 또는 403 시 모달 표시 (단, 로그인/회원가입은 예외)
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url;

    const excludedUrls = ['/login', '/signup'];
    const isExcluded = excludedUrls.some((url) => requestUrl?.includes(url));

    if ((status === 401 || status === 403) && !isExcluded) {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');

      showSessionExpiredModal();
    }

    return Promise.reject(error);
  }
);

export default httpClient;
