import httpClient from './httpClient';

// 유저 목록 조회
export const getAllUser = async (page = 0) => {
  const response = await httpClient.get(`/admin/users?page=${page}`);
  return response.data;
};


// 회원 정지
export const postUserSuspension = async (userId, suspendData) => {
  const response = await httpClient.post(
    `/admin/users/${userId}/suspend`,
    suspendData
  );
  return response.data;
}; 

// 회원 정지 해제
export const putUserlifted = async (userId) => {
  const response = await httpClient.put(
    `/admin/users/${userId}/unsuspend`,
    {}
  );
  return response.data;
};

// 정지 회원 목록 조회
export const getSuspendedUser = async () => {
  const response = await httpClient.get('/admin/users/suspended');
  return response.data;
};

// 탈퇴 회원 목록 조회
export const getCancelUser = async () => {
  const response = await httpClient.get('/admin/users/withdrawn');
  return response.data;
};

// 신고 내역 조회
export const getReports = async (page = 0) => {
  const response = await httpClient.get(`/admin/users/reports?page=${page}`);
  return response.data;
};

// 신고 유형별 내역 조회
export const getReportType = async (status, page = 0) => {
  const response = await httpClient.get(`/admin/users/reports/status/${status}?page=${page}`);
  return response.data;
};

// 신고 승인 처리
export const postReportApproval = async (reportId, suspendData) => {
  const response = await httpClient.post(
    `admin/users/reports/${reportId}/resolve?suspendUser=true`,
    suspendData
  );
  return response.data;
}; 

// 신고 승인 거부
export const postApprovalDenied = async (reportId, suspendData) => {
  const response = await httpClient.post(
    `admin/users/reports/${reportId}/reject`,
    {}
  );
  return response.data;
}; 





