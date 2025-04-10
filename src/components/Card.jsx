import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { id, categories, title, description, isBookmarked } = data;

  return (
    <div className="relative p-6 border shadow-md rounded-2xl w-full max-w-[404px] min-h-[285px] gap-[24px] flex flex-col bg-black-50">
      {/* 카테고리 태그 */}
      <div className="flex justify-between">
        <div className="flex flex-wrap space-x-2 sm:space-x-3">
          {categories.map((category, index) => (
            <span
              key={index}
              className={`px-2.5 py-1 text-xs font-light rounded-full text-black-50 ${category.bgColor}`}
            >
              {category.name}
            </span>
          ))}
        </div>
        {/* 즐겨찾기 아이콘 */}
        <div className="absolute top-6 right-5">
          <BookmarkIcon className={`w-6 h-6 ${isBookmarked ? 'text-yellow-500' : 'text-gray-300'}`} />
        </div>
      </div>

      {/* 제목 & 설명 */}
      <div className="flex flex-col gap-[24px] min-h-[108px]">
        {/* 제목 */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
          {title}
        </h3>

        {/* 설명 */}
        <p className="text-xs sm:text-sm min-h-[60px] max-w-[356px]">
          {description}
        </p>
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
