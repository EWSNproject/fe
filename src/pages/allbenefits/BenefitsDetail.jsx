import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBenefitDetail } from "../../api/BenefitsService";

const BenefitsDetail = () => {
  const { id } = useParams();
  const [benefit, setBenefit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBenefitDetail = async () => {
      try {
        const data = await getBenefitDetail(id);
        setBenefit(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBenefitDetail();
  }, [id]);

  if (isLoading) {
    return <div className="text-center text-gray-500">로딩 중...</div>;
  }

  if (!benefit) {
    return (
      <div className="text-center text-gray-500">
        존재하지 않는 복지혜택입니다.
      </div>
    );
  }

  // contactInfo 안전하게 분리
  const [department, phone] = benefit.contactInfo?.split('/') || ['정보 없음', '정보 없음'];

  // 줄바꿈 처리 및 ○ 제거 함수
  const formatText = (text) => {
    if (!text) return '정보 없음';
    return text
      .split('\r\n')
      .map(line => line.trim().replace(/^○\s*/, '')) // ○ 문자와 그 뒤의 공백 제거
      .map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
  };

  return (
    <div className="max-w-[1000px] mt-10 mx-auto p-6 bg-white">
      <div className="flex flex-col gap-6">
        <div className="flex min-w-[322px] min-h-[40px]">
          {/* 왼쪽 '담당부서' 박스 */}
          <div className="flex items-center px-4 py-2 text-lg bg-yellow-700 text-black-50">
            담당부서
          </div>

          {/* 가운데 부서명 */}
          <div className="flex items-center px-4 py-2 text-lg text-black bg-white border-2 border-yellow-700">
            {department}
          </div>

          {/* 오른쪽 연락처 */}
          <div className="flex items-center px-4 py-2 text-lg text-black bg-white border-2 border-yellow-700">
            {phone}
          </div>
        </div>
        {/* 헤더 섹션 */}
        <div className="flex flex-col mb-6">
          <span className="text-[36px] font-bold">{benefit.serviceName || '제목 없음'}</span>
          <span className="text-[24px]">{benefit.servicePurpose || '설명 없음'}</span>
        </div>
      </div>

      {/* 복지 정보 */}
      <div className="space-y-6">
        {/* 지원대상 */}
        <div>
          <div className="flex items-center">
            <div className="w-[6px] h-5 bg-yellow-700 mr-[11px]"></div>
            <h2 className="text-[20px] font-semibold">지원대상</h2>
          </div>
          <div className="mt-[18px] space-y-4 ml-8">
            <div className="flex flex-col">
              <li className="mb-2 font-medium">지원대상 : {formatText(benefit.supportTarget)}</li>
              {benefit.selectionCriteria && (
                <li className="mb-2 font-medium">선정기준 : {formatText(benefit.selectionCriteria)}</li>
              )}
            </div>
          </div>
        </div>

        {/* 지원내용 */}
        <div>
          <div className="flex items-center">
            <div className="w-[6px] h-5 bg-yellow-700 mr-[11px]"></div>
            <h2 className="text-[20px] font-semibold">지원내용</h2>
          </div>
          <div className="mt-[18px] space-y-4 ml-8">
            <div className="flex flex-col">
              <li className="mb-2 font-medium">지원내용 : {formatText(benefit.supportDetail)}</li>
              <li className="mb-2 font-medium">지원유형 : {benefit.supportType || '정보 없음'}</li>
            </div>
          </div>
        </div>

        {/* 신청방법 */}
        <div>
          <div className="flex items-center">
            <div className="w-[6px] h-5 bg-yellow-700 mr-[11px]"></div>
            <h2 className="text-[20px] font-semibold">신청방법</h2>
          </div>
          <div className="mt-[18px] space-y-4 ml-8">
            <div className="flex flex-col">
              <li className="mb-2 font-medium">신청방법 : {formatText(benefit.applicationMethod)}</li>
              <li className="mb-2 font-medium">신청기한 : {benefit.applicationDeadline || '정보 없음'}</li>
            </div>
          </div>
        </div>
      </div>

      {/* 신청하기 버튼 */}
      {benefit.onlineApplicationUrl && (
        <div className="flex justify-end mt-8">
          <button 
            className="px-12 max-w-[237px] bg-yellow-700 hover:bg-yellow-500 text-black-50 py-3 rounded-lg transition"
            onClick={() => window.open(benefit.onlineApplicationUrl, '_blank')}
          >
            온라인 신청하기
          </button>
        </div>
      )}
    </div>
  );
};

export default BenefitsDetail;
