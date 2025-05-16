import httpClient from './httpClient';
import Cookies from "js-cookie";

export const checkDuplicate = async (type, value) => {
  try {
    const response = await httpClient.get('/users/check-duplicate', {
      params: { type, value },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "중복 확인에 실패했습니다.");
  }
};

export const signup = async (userData) => {
  try {
    const response = await httpClient.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "회원가입에 실패했습니다.");
  }
};

export const login = async (userData) => {
  try {
    const { realId, password } = userData;
    const response = await httpClient.post('/login', { realId, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "로그인에 실패했습니다.");
  }
};

export const getUserInfo = async () => {
  try {
    const response = await httpClient.get('/users/me');
    return response.data;
  } catch (error) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};

export const updateUserProfile = async (data) => {
  try {
    const response = await httpClient.put('/users/me/profile', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "프로필 수정에 실패했습니다.");
  }
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword
}) => {
  try {
    const response = await httpClient.put('/users/me/password', 
      {
        currentPassword,
        newPassword,
        confirmPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "비밀번호 변경에 실패했습니다.");
  }
};

export const deleteUser = async (reasonText) => {
  try {
    const response = await httpClient.delete('/users/me', {
      data: { deleteReason: reasonText },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "회원 탈퇴에 실패했습니다.");
  }
};

export const logout = async () => {
  try {
    await httpClient.post('/logout');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  } catch (error) {
    throw new Error(error.response?.data?.message || "로그아웃에 실패했습니다.");
  }
};

// 타회원 조회
export const getOtherUserInfo = async (userId) => {
  try {
    const response = await httpClient.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};