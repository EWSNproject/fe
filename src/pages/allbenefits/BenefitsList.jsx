import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import SideFilter from "../../components/filter/SideFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import Pagination from "../../components/Pagination";
import { getFilteredBenefits, searchBenefits } from "../../api/BenefitsService";
import InfoIcon from "../../assets/images/Info.svg";

const SortOptions = ({ selected, onSelect }) => {
  const options = ["가나다순", "인기순", "방문순"];

  return (
    <div className="flex items-center justify-between gap-4 mb-4 text-lg">
      <div className="relative group">
        <img src={InfoIcon} alt="Info" className="w-5 h-5 cursor-pointer" />
        <div className="absolute left-0 hidden min-w-[380px] min-h-[61px] p-4 mt-3 text-sm text-black-50 bg-black-900 rounded group-hover:block z-10">
          * 나이와 지역은 회원가입한 정보를 바탕으로 두고 있습니다.
          <br />
          * 수정 원하신다면 마이페이지 회원정보 수정을 이용해주세요.
          <br />* 사이드 필터 선택 후 검색 버튼 클릭 시 해당하는 복지혜택만
          나타납니다.
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
  const [sortOption, setSortOption] = useState("가나다순");
  const [currentPage, setCurrentPage] = useState(1);
  const [benefits, setBenefits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 9;
  const pageGroupSize = 5;

  const [selectedFilters, setSelectedFilters] = useState({
    가구형태: [],
    가구상황: [],
    관심주제: [],
  });

  const fetchFilteredData = async (filters = selectedFilters, sort = "") => {
    try {
      setIsLoading(true);
      const filteredData = await getFilteredBenefits(filters, sort);
      setBenefits(filteredData);
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to fetch filtered benefits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (keyword) => {
    const trimmed = keyword.trim();
    if (trimmed) {
      try {
        setIsLoading(true);
        const searchedData = await searchBenefits(trimmed,30);
        setBenefits(searchedData);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch searched benefits:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      fetchFilteredData();
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortParam = "";

    if (option === "인기순") {
      sortParam = "bookmark";
    } else if (option === "조회수 높은순") {
      sortParam = "view";
    }

    fetchFilteredData(selectedFilters, sortParam);
  };

  const handleReset = () => {
    const resetFilters = {
      가구형태: [],
      가구상황: [],
      관심주제: [],
    };
    setSelectedFilters(resetFilters);
    fetchFilteredData(resetFilters);
  };

  useEffect(() => {
    fetchFilteredData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return benefits.slice(startIndex, startIndex + itemsPerPage);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex md:flex-col flex-row min-h-screen md:p-4 p-6 max-w-[1680px] mx-auto">
      <SideFilter onFilterChange={handleFilterChange} />

      <div className="flex flex-col flex-1">
        <span className="text-[24px] mb-5 font-semibold">
          복지혜택 전체보기
        </span>

        <SearchFilter onSearch={handleSearch} onReset={handleReset} />

        <div className="w-full max-w-[1200px]">
          <SortOptions selected={sortOption} onSelect={handleSortChange} />
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-cols-3 xl:grid-cols-3 md:gap-4 lg:gap-6 gap-10 w-full max-w-[1200px]">
          {getCurrentPageData().map((card) => (
            <Card
              key={card.publicServiceId}
              data={{
                id: card.publicServiceId,
                title: card.serviceName,
                description: card.summaryPurpose,
                category: card.serviceCategory,
                specialGroup: card.specialGroup,
                familyType: card.familyType,
                isBookmarked: card.bookmarked,
              }}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 max-w-[1200px]">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(benefits.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            pageGroupSize={pageGroupSize}
          />
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
