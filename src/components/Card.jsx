import React, { useState } from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import Tooltip from "./ui/Tooltip";
import { addBookmark, removeBookmark } from "../api/BenefitsService";

const Card = ({ data }) => {
  const {
    id = "",
    title = "",
    description = "",
    category = "",
    specialGroup = [],
    familyType = [],
  } = data || {};

  const [bookmarked, setBookmarked] = useState(data?.isBookmarked || false);


  if (!data) {
    return null;
  }


  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await removeBookmark(id);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        await addBookmark(id);
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  // 태그 목록을 문자열로 변환하는 함수
  const formatTagList = (tags) => {
    return tags.join(", ");
  };

  return (
    <div className="relative p-6 border shadow-md rounded-2xl w-full max-w-[404px] min-h-[285px] gap-[24px] flex flex-col bg-black-50">
      {/* 카테고리 태그들 */}
      <div className="flex justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {/* 서비스 카테고리 - 항상 표시 (빨간색) */}
          <Tooltip content="">
            <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-red inline-flex items-center">
              {category}
            </span>
          </Tooltip>

          {/* Special Group - 첫 번째 태그만 표시 (주황색) */}
          {specialGroup.length > 0 && (
            <Tooltip
              content={
                specialGroup.length > 1
                  ? formatTagList(specialGroup.slice(1))
                  : ""
              }
            >
              <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-orange inline-flex items-center">
                {specialGroup[0]}
              </span>
            </Tooltip>
          )}

          {/* Family Type - 첫 번째 태그만 표시 (초록색) */}
          {familyType.length > 0 && (
            <Tooltip
              content={
                familyType.length > 1 ? formatTagList(familyType.slice(1)) : ""
              }
            >
              <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-green inline-flex items-center">
                {familyType[0]}
              </span>
            </Tooltip>
          )}
        </div>

        {/* 북마크 아이콘 */}
        <div>
          <BookmarkIcon
            className={`w-6 h-6 cursor-pointer ${
              bookmarked ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={toggleBookmark}
          />
        </div>
      </div>

      {/* 제목과 설명 */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900 md:text-lg lg:text-xl">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* 자세히 보기 버튼 */}
      <div className="flex justify-end h-[40px] mt-auto">
        <Link
          to={`/benefitsList/${id}`}
          className="flex items-center justify-center w-full h-full text-sm font-medium text-gray-700 bg-gray-200 border rounded-lg md:text-xs hover:bg-black-50"
        >
          자세히 보기
        </Link>
      </div>
    </div>
  );
};

export default Card;
