import React from "react";
import Card from "../../components/card";

const CardListPage = () => {
  return (
    <div className="p-6 min-h-screen flex">
      {/* 사이드 필터 */}
      <div className="w-1/6 p-2 mr-4 border rounded text-xs">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold">필터</h2>
          <button className="text-red-500 text-xs">전체선택</button>
        </div>
        <select className="border p-1 rounded w-full mb-1">
          <option>생애주기</option>
        </select>
        <select className="border p-1 rounded w-full mb-1">
          <option>가구상황</option>
        </select>
        <select className="border p-1 rounded w-full">
          <option>관심주제</option>
        </select>
      </div>

      <div className="flex-1">
        {/* 제목 */}
        <h1 className="text-xl font-semibold mb-4 text-center">복지혜택 전체보기</h1>
{/* 필터 및 검색창 */}
<div className="border rounded p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-500 mr-2">나이</span>
            <input type="text" placeholder="나이를 입력하세요" className="border p-1 rounded w-1/5 text-right focus:outline-none" />
            <span className="text-gray-500 mx-4">지역</span>
            <select className="border p-1 rounded w-1/5">
              <option>시/도 선택</option>
            </select>
            <select className="border p-1 rounded w-1/5">
              <option>시/군/구 선택</option>
            </select>
          </div>
          {/* 검색창 */}
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-500 mr-2">검색</span>
              <input type="text" placeholder="검색어 입력" className="border p-1 rounded flex-1 w-1/3" />
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-300 text-black px-3 py-1 rounded">초기화</button>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded">검색</button>
            </div>
          </div>
        </div>
        {/* 카드 리스트 */}
        <div className="grid grid-cols-3 gap-4">
          {Array(9).fill(0).map((_, index) => (
            <Card key={index} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-6">
          <button className="px-2 py-1 border rounded mx-1 bg-yellow-500 text-white">1</button>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button key={num} className="px-2 py-1 border rounded mx-1">{num}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
