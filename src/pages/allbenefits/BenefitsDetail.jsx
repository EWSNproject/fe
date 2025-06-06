import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBenefitDetail } from "../../api/BenefitsService";
import { List } from "lucide-react";
import CurveLoading from '../../components/Loading/CurveLoading'; 

const BenefitsDetail = () => {
  const navigate = useNavigate();
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
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <CurveLoading size={40} />
      </div>
    );
  }

  if (!benefit) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-600 text-center px-4">
        <p className="mb-2 text-lg font-semibold">해당 복지 혜택 정보를 찾을 수 없습니다.</p>
        <p className="mb-6 text-sm text-gray-500">
          요청하신 혜택은 존재하지 않거나 삭제되었을 수 있습니다.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 font-semibold transition bg-yellow-600 rounded-md text-black-50 hover:bg-yellow-500 hover:text-yellow-900"
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    );
  }

  const [department, phone] =
    benefit.contactInfo?.split("/") || ["정보 없음", "정보 없음"];

  const sanitizeText = (text) => {
    if (!text || typeof text !== "string") return ["정보 없음"];
    return text
      .replace(/○\s*/g, "")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  const renderMultiline = (text, limit = 2) => {
    const lines = sanitizeText(text);
    if (showMore || lines.length <= limit) {
      return lines.map((line, idx) => (
        <span key={idx} className="block md:inline">
          {line}
          {idx < lines.length - 1 && <br className="hidden md:inline" />}
        </span>
      ));
    }

    const preview = lines.slice(0, limit);
    return preview.map((line, idx) => (
      <span key={idx} className="block md:inline">
        {line}
        {idx < preview.length - 1 && <br className="hidden md:inline" />}
      </span>
    ));
  };

  const hasMoreContent = () => {
    const fields = [
      benefit.supportTarget,
      benefit.selectionCriteria,
      benefit.supportDetail,
      benefit.applicationMethod,
      benefit.servicePurpose
    ];
    
    return fields.some(field => {
      const lines = sanitizeText(field);
      return lines.length > 2;
    });
  };

  return (
    <div className="max-w-[1000px] mt-10 md:mt-5 mx-auto p-6 ">
      <div className="flex flex-col gap-6">
        <div className="flex min-w-[322px] min-h-[40px] justify-between">
          <div className="flex">
            <div className="flex items-center px-4 py-2 text-lg bg-yellow-700 md:text-sm text-black-50">
              담당부서
            </div>
            <div className="flex items-center px-4 py-2 text-lg text-black bg-white border-2 border-yellow-700 md:text-sm">
              {department}
            </div>
            <div className="flex items-center px-4 py-2 text-lg text-black bg-white border-2 border-yellow-700 md:text-sm">
              {phone}
            </div>
          </div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate('/benefitsList')}>
            <span className='ml-3 border-gray-400 md:'><List size={30} /></span>
            <span className='text-[20px] md:hidden'>목록</span>
          </div>
        </div>

        <div className="flex flex-col mb-6">
          <span className="text-[36px] font-bold md:text-[26px]">
            {benefit.serviceName || "제목 없음"}
          </span>
          <span className="text-[24px] md:text-[16px]">
            {renderMultiline(benefit.servicePurpose) || "설명 없음"}
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
              지원대상  {renderMultiline(benefit.supportTarget)}
            </li>
            {benefit.selectionCriteria && (
              <li className="mb-2 font-medium">
                선정기준  {renderMultiline(benefit.selectionCriteria)}
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
              지원내용  {renderMultiline(benefit.supportDetail)}
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
              신청방법  {renderMultiline(benefit.applicationMethod)}
            </li>
          </div>
        </div>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="flex justify-end gap-4 mt-8">
        {/* 상세보기 버튼 */}
        {hasMoreContent() && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-12 max-w-[237px] bg-black-300 text-black-50 py-3 rounded-lg transition"
          >
            {showMore ? "접기" : "상세 보기"}
          </button>
        )}

        {/* 신청하기 버튼 */}
        {benefit.onlineApplicationUrl && (
          <button
            className="px-12 max-w-[237px] bg-yellow-700 hover:bg-yellow-500 text-black-50 py-3 rounded-lg transition"
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
