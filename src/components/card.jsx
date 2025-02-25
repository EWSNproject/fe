import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";

const Card = () => {
  return (
    <div className="border rounded-2xl shadow-md p-5 w-80 relative">
      {/* 카테고리 태그 */}
      <div className="flex space-x-2 mb-3">
        <span className="bg-red-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">보육/교육</span>
        <span className="bg-yellow-500 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">청년</span>
        <span className="bg-green-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded-full">주거</span>
      </div>

      {/* 제목 */}
      <h3 className="text-lg font-bold text-gray-900 mb-1">전국민 마음투자 지원사업</h3>
      
      {/* 설명 */}
      <p className="text-sm mb-4">
        우울/불안 등 정서적 어려움으로 인해 심리상담이 필요한 국민에게 전문적인 심리상담 서비스를 제공합니다.
      </p>
      
      {/* 자세히 보기 버튼 */}
      <div className="flex justify-end">
        <button className="bg-white text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
          자세히 보기
        </button>
      </div>

      {/* 즐겨찾기 아이콘 */}
      <div className="absolute top-4 right-4">
        <BookmarkIcon className="w-6 h-6 text-yellow-500" />
      </div>
    </div>
  );
};

export default Card;
