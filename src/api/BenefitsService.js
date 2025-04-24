import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const getBenefitDetail = async (serviceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/services/detail/${serviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching benefit detail:', error);
    throw error;
  }
};

export const getAllBenefits = async () => {
  try {
    // 여러 페이지의 데이터를 가져오기
    const pages = [11,50,102,34,200]; // 0~4 페이지 데이터
    const size = 50; // 각 페이지당 50개

    // 모든 페이지의 데이터를 병렬로 가져오기
    const responses = await Promise.all(
      pages.map(page => 
        axios.get(`${BASE_URL}/services?size=${size}&page=${page}`)
      )
    );

    // 모든 데이터 합치기
    let allBenefits = [];
    responses.forEach(response => {
      if (response.data.content) {
        allBenefits = [...allBenefits, ...response.data.content];
      }
    });

    // 데이터 랜덤하게 섞기
    const shuffledBenefits = allBenefits
      .sort(() => Math.random() - 0.5)
      .slice(0, 50); // 최대 50개만 반환

    return shuffledBenefits;
  } catch (error) {
    console.error('Error fetching benefits:', error);
    throw error;
  }
};