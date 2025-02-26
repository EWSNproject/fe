import React from "react";
import Card from "../../components/card";

const CardListPage = () => {
  return (
    <div className="flex min-h-screen p-6">
      {/* 사이드 필터 */}
      <div className="w-1/6 p-2 mr-4 text-xs border rounded">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold">필터</h2>
          <button className="text-xs text-red-500">전체선택</button>
        </div>
        <select className="w-full p-1 mb-1 border rounded">
          <option>생애주기</option>
        </select>
        <select className="w-full p-1 mb-1 border rounded">
          <option>가구상황</option>
        </select>
        <select className="w-full p-1 border rounded">
          <option>관심주제</option>
        </select>
      </div>

      <div className="flex-1">
        {/* 필터 및 검색창 */}
        <div className=" pt-[40px] pb-[40px] pr-[30px] pl-[30px] mb-6 border rounded w-[1200px] h-[250px]">
          <div className=" flex flex-col gap-[30px] w-[1140px] h-[110px]">
          <div className="flex items-center gap-[150px] w-[1140px] h-[40px]">
            <div className="w-[300px] h-[40px] gap-[30px] flex items-center">
              <span className="text-[16px] ">나이</span>
              <input type="text" placeholder="만 0세" className="p-2 w-[240px] border rounded-[12px] " />
            </div>
            <div className="w-[690px] h-[40px] gap-[30px] flex items-center">
              <span className="text-[16px] ">지역</span>
              <div className="w-[630px] gap-[10px] flex items-center">
                <select className="w-[300px] p-1 border rounded">
                  <option>시/도 선택</option>
                </select>
                <select className="w-[320px] p-1 border rounded">
                  <option>시/군/구 선택</option>
                </select>
              </div>
            </div>
          </div>
          {/* 검색창 */}
          <div className="flex items-center gap-[30px] w-[1140px] h-[40px]">
            <span className="text-[16px]">검색</span>
            <input type="text"
              placeholder="검색어 입력"
              className="w-[1080px] p-2 rounded-[12px] border" />
          </div>
          </div>
          <div className="flex justify-end mt-[20px]">
            <div className="flex gap-2.5 w-[296px] h-[40px]">
              <button className="w-[143px] text-black-50 bg-gray-500 rounded-[10px]">초기화</button>
              <button className="w-[143px] text-black-50 bg-yellow-700 rounded-[10px]">검색</button>
            </div>
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-3 gap-3 w-[1236px]">
          {Array(9).fill(0).map((_, index) => (
            <Card key={index} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-6">
          <button className="px-2 py-1 mx-1 text-white bg-yellow-500 border rounded">1</button>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button key={num} className="px-2 py-1 mx-1 border rounded">{num}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
