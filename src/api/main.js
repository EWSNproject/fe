import Cookies from 'js-cookie';
import httpClient from './httpClient';

export const getInterestCategories = async () => {
  try {
    const response = await httpClient.get('/interests');
    return response.data.categorizedInterests;
  } catch (error) {
    throw new Error(error.response?.data?.message || '관심사 목록을 가져오는데 실패했습니다.');
  }
};

export const saveUserInterests = async (interests) => {
  try {
    const response = await httpClient.post('/interests/me', 
      {
        categorizedInterests: {
          "가구상황": interests.familyType,
          "가구형태": interests.familyStatus,
          "관심주제": interests.interestTopics
        }     
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '관심사 저장에 실패했습니다.');
  }
};

export const getPopularBenefits = async () => {
  try {
    const response = await httpClient.get('/services/popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching popular benefits:', error);
    throw error;
  }
};

export const getMatchServices = async () => {
  const token = Cookies.get('accessToken');
  if (!token) return []; // 토큰 없으면 요청 아예 안 함
  
  try {
    const response = await httpClient.get('/mongo/services/matched');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '맞춤 서비스 목록을 가져오는데 실패했습니다.');
  }
};

export const getSearchHistory = async () => {
  try {
    const response = await httpClient.get('/search/history');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '검색 이력을 가져오는데 실패했습니다.');
  }
};

export const getInterestUser = async () => {
  try {
    const response = await httpClient.get('/interests/me');
    return response.data.categorizedInterests;
  } catch (error) {
    throw new Error(error.response?.data?.message || '관심사 목록을 가져오는데 실패했습니다.');
  }
};

export const deleteSearchHistory = async (historyId) => {
  try {
    const url = historyId
      ? `/search/history/${historyId}`
      : `/search/history`; // ← id 없으면 전체 삭제

    const response = await httpClient.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || '검색 이력을 삭제하는 데 실패했습니다.');
  }
};
