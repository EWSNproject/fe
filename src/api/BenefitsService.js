import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getBenefitDetail = async (serviceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/serviceDetail/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching benefit detail:', error);
    throw error;
  }
};