import React, { useState } from "react";
import Card from "../../components/Card";
import SideFilter from "../../components/filter/SideFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import Pagination from "../../components/Pagination";

const SortOptions = ({ selected, onSelect }) => {
  const options = ["최신순", "인기순", "북마크순"];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4 text-lg md:justify-end">
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
  );
};

const CardListPage = () => {
  const [sortOption, setSortOption] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const pageGroupSize = 5;

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
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Card key={index} />
            ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center max-w-[1200px]">
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
