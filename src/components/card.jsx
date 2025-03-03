import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/solid";

const Card = () => {
  return (
    <div className="relative p-6 border shadow-md rounded-2xl w-[380px] h-[285px] gap-6 flex flex-col bg-black-50">
      {/* 카테고리 태그 */}
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-red">보육/교육</span>
          <span className="px-2.5 py-1 text-xs font-light rounded-full text-black-50 bg-tag-orange">청년</span>
          <span className="px-2.5 py-1 text-xs font-light bg-green-100 rounded-full text-black-50 bg-tag-green">주거</span>
        </div>
        {/* 즐겨찾기 아이콘 */}
        <div className="absolute top-4 right-4">
          <BookmarkIcon className="w-6 h-6 text-yellow-500" />
        </div>
      </div>


      <div className="gap-3.5 flex-col flex min-h-[108px]">
        {/* 제목 */}
        <h3 className="text-2xl font-bold text-gray-900">전국민 마음투자 지원사업</h3>

        {/* 설명 */}
        <p className="text-sm min-h-[60px] max-w-[280px]">
          우울/불안 등 정서적 어려움으로 인해 심리상담이 필요한 국민에게 전문적인 심리상담 서비스를 제공합니다.
        </p>
      </div>

      {/* 자세히 보기 버튼 */}
      <div className="flex justify-end h-[40px]">
        <button className="w-[150px] h-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
          자세히 보기
        </button>
      </div>

    </div>
  );
};

export default Card;
