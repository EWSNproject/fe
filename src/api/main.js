import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

export const getInterestCategories = async () => {
  try {
    const token = Cookies.get("accessToken");
    const response = await axios.get(`${BASE_URL}/interests`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.categorizedInterests;
  } catch (error) {
    throw new Error(error.response?.data?.message || '관심사 목록을 가져오는데 실패했습니다.');
  }
};

export const saveUserInterests = async (interests) => {
  try {
    const token = Cookies.get("accessToken");
    const response = await axios.post(`${BASE_URL}/interests/me`, 
      {
        categorizedInterests: {
          "가구상황": interests.familyType,
          "가구형태": interests.familyStatus,
          "관심주제": interests.interestTopics
        }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '관심사 저장에 실패했습니다.');
  }
};
