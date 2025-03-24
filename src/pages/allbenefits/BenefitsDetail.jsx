import React from "react";
import { useParams } from "react-router-dom";
import { benefitDetailData } from "../../data/benefitDetailData";

const BenefitsDetail = () => {
  const { id } = useParams();
  const benefit = benefitDetailData.find((item) => item.id === parseInt(id));

  if (!benefit) {
    return (
      <div className="text-center text-gray-500">
        존재하지 않는 복지혜택입니다.
      </div>
    );
  }

  const { serviceName, servicePurpose, details } = benefit;

  // contactInfo 분리
  const [department, phone] = details.contactInfo.split('/');

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
          <span className="text-[36px] font-bold">{serviceName}</span>
          <span className="text-[24px]">{servicePurpose}</span>
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
              <li className="mb-2 font-medium">지원대상 : {details.supportTarget}</li>
              <li className="mb-2 font-medium">선정기준 : {details.selectionCriteria}</li>
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
              <li className="mb-2 font-medium">지원내용 : {details.supportDetails}</li>
              <li className="mb-2 font-medium">지원유형 : {details.supportType}</li>
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
              <li className="mb-2 font-medium">신청방법 : {details.applicationMethod}</li>
              <li className="mb-2 font-medium">신청기한 : {details.applicationDeadline}</li>
              <li className="mb-2 font-medium">구비서류 : {details.requiredDocuments.join(', ')}</li>
            </div>
          </div>
        </div>
      </div>

      {/* 신청하기 버튼 */}
      <div className="flex justify-end mt-8">
        <button 
          className="px-12 max-w-[237px] bg-yellow-700 hover:bg-yellow-500 text-black-50 py-3 rounded-lg transition"
          onClick={() => window.open(details.onlineApplicationUrl, '_blank')}
        >
          온라인 신청하기
        </button>
      </div>
    </div>
  );
};

export default BenefitsDetail;
