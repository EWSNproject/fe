import React, { useState } from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  // data가 undefined일 경우를 대비한 기본값 설정
  const {
    id = '',
    title = '',
    description = '',
    category = '',
    specialGroup = null,
    familyType = null,
  } = data || {};

  const [bookmarked, setIsBookmarked] = useState(data?.isBookmarked || false);

  // data가 없는 경우 렌더링하지 않음
  if (!data) {
    return null;
  }

  // 제목에서 괄호와 그 안의 내용을 제거하는 함수
  const formatTitle = (title) => {
    return title?.replace(/^\([^)]*\)\s*/, '') || '';
  };

  return (
    <div className="relative p-6 border shadow-md rounded-2xl w-full max-w-[404px] min-h-[285px] gap-[24px] flex flex-col bg-black-50">
      {/* 카테고리 태그들 */}
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          {/* 서비스 카테고리 - 항상 표시 (빨간색) */}
          <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-red">
            {category}
          </span>

          {/* Special Group - 있을 때만 표시 (주황색) */}
          {specialGroup && (
            <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-orange">
              {specialGroup}
            </span>
          )}

          {/* Family Type - 있을 때만 표시 (초록색) */}
          {familyType && (
            <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-green">
              {familyType}
            </span>
          )}
        </div>

        {/* 북마크 아이콘 */}
        <div>
          <BookmarkIcon 
            className={`w-6 h-6 ${bookmarked ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => setIsBookmarked(!bookmarked)} 
          />
        </div>
      </div>

      {/* 제목과 설명 */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          {formatTitle(title)}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* 자세히 보기 버튼 */}
      <div className="flex justify-end h-[40px] mt-auto">
        <Link
          to={`/benefitsList/${id}`}
          className="w-full h-full text-xs sm:text-sm font-medium text-gray-700 bg-white border bg-gray-200 rounded-lg hover:bg-black-50 flex items-center justify-center"
        >
          자세히 보기
        </Link>
      </div>
    </div>
  );
};

export default Card;
