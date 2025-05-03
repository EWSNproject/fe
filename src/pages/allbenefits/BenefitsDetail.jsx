import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBenefitDetail } from "../../api/BenefitsService";

const BenefitsDetail = () => {
  const { id } = useParams();
  const [benefit, setBenefit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchBenefitDetail = async () => {
      try {
        const data = await getBenefitDetail(id);
        setBenefit(data);
      } catch (error) {
        console.error("Error:", error);
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

  const [department, phone] =
    benefit.contactInfo?.split("/") || ["정보 없음", "정보 없음"];

  // 텍스트 정제 함수
  const sanitizeText = (text) => {
    if (!text || typeof text !== "string") return ["정보 없음"];
    return text
      .replace(/○\s*/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  // 줄 제한 렌더링 함수
  const renderMultiline = (text, limit = 2) => {
    const lines = sanitizeText(text);
    if (showMore || lines.length <= limit) {
      return lines.map((line, idx) => (
        <span key={idx}>
          {line}
          <br />
        </span>
      ));
    }

    const preview = lines.slice(0, limit);
    return preview.map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className="max-w-[1000px] mt-10 mx-auto p-6 bg-white">
      <div className="flex flex-col gap-6">
        <div className="flex min-w-[322px] min-h-[40px]">
          <div className="flex items-center px-4 py-2 text-lg bg-yellow-700 text-black-50">
            담당부서
          </div>
          <div className="flex items-center px-4 py-2 text-lg text-black bg-white border-2 border-yellow-700">
            {department}
          </div>
          <div className="flex items-center px-4 py-2 text-lg text-black bg-white border-2 border-yellow-700">
            {phone}
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <span className="text-[36px] font-bold">
            {benefit.serviceName || "제목 없음"}
          </span>
          <span className="text-[24px]">
            {benefit.servicePurpose || "설명 없음"}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* 지원대상 */}
        <div>
          <div className="flex items-center">
            <div className="w-[6px] h-5 bg-yellow-700 mr-[11px]"></div>
            <h2 className="text-[20px] font-semibold">지원대상</h2>
          </div>
          <div className="mt-[18px] space-y-4 ml-8">
            <li className="mb-2 font-medium">
              지원대상 : {renderMultiline(benefit.supportTarget)}
            </li>
            {benefit.selectionCriteria && (
              <li className="mb-2 font-medium">
                선정기준 : {renderMultiline(benefit.selectionCriteria)}
              </li>
            )}
          </div>
        </div>

        {/* 지원내용 */}
        <div>
          <div className="flex items-center">
            <div className="w-[6px] h-5 bg-yellow-700 mr-[11px]"></div>
            <h2 className="text-[20px] font-semibold">지원내용</h2>
          </div>
          <div className="mt-[18px] space-y-4 ml-8">
            <li className="mb-2 font-medium">
              지원내용 : {renderMultiline(benefit.supportDetail)}
            </li>
            <li className="mb-2 font-medium">
              지원유형 : {benefit.supportType || "정보 없음"}
            </li>
          </div>
        </div>

        {/* 신청방법 */}
        <div>
          <div className="flex items-center">
            <div className="w-[6px] h-5 bg-yellow-700 mr-[11px]"></div>
            <h2 className="text-[20px] font-semibold">신청방법</h2>
          </div>
          <div className="mt-[18px] space-y-4 ml-8">
            <li className="mb-2 font-medium">
              신청방법 : {renderMultiline(benefit.applicationMethod)}
            </li>
          </div>
        </div>
      </div>

      {/* 상세보기 버튼 */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => setShowMore(!showMore)}
          className="ml-2 px-12 max-w-[237px] bg-black-300 text-black-50 py-3 rounded-lg transition"
        >
          {showMore ? "접기" : "상세 보기"}
        </button>
      </div>

      {/* 신청하기 버튼 */}
      <div className="flex justify-end mt-8">
        {benefit.onlineApplicationUrl && (
          <button
            className="ml-2 px-12 max-w-[237px] bg-yellow-700 hover:bg-yellow-500 text-black-50 py-3 rounded-lg transition"
            onClick={() =>
              window.open(benefit.onlineApplicationUrl, "_blank")
            }
          >
            온라인 신청하기
          </button>
        )}
      </div>
    </div>
  );
};

export default BenefitsDetail;
