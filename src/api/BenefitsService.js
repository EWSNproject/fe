import httpClient from './httpClient';
import { toast } from 'react-toastify';

export const getBenefitDetail = async (serviceId) => {
  try {
    const response = await httpClient.get(`/services/detail/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching benefit detail:', error);
    throw error;
  }
};

export const addBookmark = async (serviceId) => {
  try {
    const response = await httpClient.post(`/services/${serviceId}/bookmark`);
    toast.success('북마크가 추가되었습니다.', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding bookmark:', error);
    toast.error('북마크 추가에 실패했습니다.');
    throw error;
  }
};

export const removeBookmark = async (serviceId) => {
  try {
    const response = await httpClient.delete(`/services/${serviceId}/bookmark`);
    toast.error('북마크가 삭제되었습니다.', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return response.data;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    toast.error('북마크 삭제에 실패했습니다.');
    throw error;
  }
};

export const getFilteredBenefits = async (filters = {}, sort = '') => {
  try {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([paramName, selectedLabels]) => {
      if (Array.isArray(selectedLabels) && selectedLabels.length > 0) {
        selectedLabels.forEach((label) => queryParams.append(paramName, label));
      }
    });

    queryParams.append('size', '30');

    if (sort) queryParams.append('sort', sort);

    const response = await httpClient.get(`/services?${queryParams.toString()}`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching filtered benefits:', error);
    throw error;
  }
};

export const getFilterData = async () => {
  try {
    const response = await httpClient.get('/services/filters');
    return response.data;
  } catch (error) {
    console.error('Error fetching filter data:', error);
    throw error;
  }
};

export const searchBenefits = async (searchTerm,size) => {
  try {
    const response = await httpClient.get(`/mongo/search/services?searchTerm=${encodeURIComponent(searchTerm)}&size=${size}`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching searched benefits:', error);
    throw error;
  }
};

export const autocompleteSearch = async (word) => {
  try {
    const response = await httpClient.get(`/mongo/search/services/autocomplete?word=${encodeURIComponent(word)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    throw error;
  }
};

export const getRecentService = async () => {
  try {
    const response = await httpClient.get('/services/recent');
    return response.data.content;
  } catch (error) {
    console.error('Error fetching benefit detail:', error);
    throw error;
  }
};