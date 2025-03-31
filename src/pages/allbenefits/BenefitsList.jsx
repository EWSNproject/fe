import React, { useState } from "react";
import Card from "../../components/Card";
import SideFilter from "../../components/filter/SideFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import Pagination from "../../components/Pagination";
import { cardData } from '../../data/cardData';
import InfoIcon from "../../assets/images/Info.svg";

const SortOptions = ({ selected, onSelect }) => {
  const options = ["최신순", "인기순", "북마크순"];

  return (
    <div className="flex justify-between items-center gap-4 mb-4 text-lg">
      <div className="relative group">
        <img src={InfoIcon} alt="Info" className="w-5 h-5 cursor-pointer" />
        <div className="absolute left-0 hidden min-w-[368px] min-h-[61px] p-4 mt-3 text-sm text-black-50 bg-black-900 rounded group-hover:block z-10">
          *나이와 지역은 회원가입한 정보를 바탕으로 두고 있습니다.
          <br />
          *수정 원하신다면 마이페이지 회원정보 수정을 이용해주세요.
        </div>
      </div>
      <div className="flex gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`${
              selected === option
                ? "text-black font-bold underline"
                : "text-gray-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const CardListPage = () => {
  const [sortOption, setSortOption] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const pageGroupSize = 5;

  // 현재 페이지에 해당하는 카드 데이터만 필터링
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cardData.slice(startIndex, endIndex);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 sm:p-6 max-w-[1680px] mx-auto">
      {/* 사이드 필터 */}
      <SideFilter />

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col flex-1">
        <span className="text-[24px] mb-5 font-semibold">
          복지혜택 전체보기
        </span>

        {/* 필터 및 검색창 */}
        <SearchFilter />

        {/* 정렬 옵션 */}
        <div className="w-full max-w-[1200px]">
          <SortOptions selected={sortOption} onSelect={setSortOption} />
        </div>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full max-w-[1200px]">
          {getCurrentPageData().map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8 max-w-[1200px]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageGroupSize={pageGroupSize}
          />
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
