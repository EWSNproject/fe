import React, { useState } from "react";
import Card from "../../components/card";
import SideFilter from "../../components/filter/SideFilter";
import SearchFilter from "../../components/filter/SearchFilter";

const SortOptions = ({ selected, onSelect }) => {
  const options = ["최신순", "인기순", "북마크순"];

  return (
    <div className="flex justify-center md:justify-end gap-4 mb-4 text-lg flex-wrap">
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-6 gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 text-gray-600 disabled:opacity-50"
      >
        ≪
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 text-gray-600 disabled:opacity-50"
      >
        ＜
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-yellow-400 text-white font-bold"
                : "text-black"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 text-gray-600 disabled:opacity-50"
      >
        ＞
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2 text-gray-600 disabled:opacity-50"
      >
        ≫
      </button>
    </div>
  );
};

const CardListPage = () => {
  const [sortOption, setSortOption] = useState("최신순");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

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
        <div className="flex justify-center max-w-[1200px] mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
