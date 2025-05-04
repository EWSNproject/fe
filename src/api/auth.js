import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

export const checkDuplicate = async (type, value) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/check-duplicate`, {
      params: {
        type,
        value,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "중복 확인에 실패했습니다."
      );
    }
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

export const signup = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "회원가입에 실패했습니다."
      );
    }
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

export const login = async (userData) => {
  try {
    const { realId, password } = userData;
    const response = await axios.post(`${BASE_URL}/login`, {
      realId,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "로그인에 실패했습니다.");
    }
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // 사용자 정보 반환
  } catch (error) {
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};

export const updateUserProfile = async (data) => {
  const token = Cookies.get("accessToken");

  const response = await axios.put(`${BASE_URL}/users/me/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  const token = Cookies.get("accessToken");
  if (!token) throw new Error("인증 토큰이 없습니다.");

  try {
    const response = await axios.put(
      `${BASE_URL}/users/me/password`,
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "비밀번호 변경에 실패했습니다."
      );
    }
    throw new Error("서버와의 통신에 실패했습니다.");
  }
};

export const deleteUser = async (reasonText) => {
  const token = Cookies.get("accessToken");

  try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain'
      },
      data: reasonText  // 여기: 순수한 텍스트 값
    });

    return response.data;
  } catch (error) {
    console.error("Axios Error Response:", error.response); // 여기 꼭 로그 찍어
    throw new Error("회원탈퇴 요청 실패");
  }
};




