import React, { useState, useEffect, useCallback } from "react";
import Card from "../../components/Card";
import SideFilter from "../../components/filter/SideFilter";
import SearchFilter from "../../components/filter/SearchFilter";
import Pagination from "../../components/Pagination";
import { getFilteredBenefits, searchBenefits } from "../../api/BenefitsService";
import InfoIcon from "../../assets/images/Info.svg";
import CurveLoading from '../../components/Loading/CurveLoading'; 

const SortOptions = ({ selected, onSelect }) => {
  const options = ["가나다순", "인기순", "방문순"];

  return (
    <div className="flex items-center justify-between gap-4 mb-4 text-lg">
      <div className="relative group">
        <img src={InfoIcon} alt="Info" className="w-5 h-5 cursor-pointer" />
        <div className="absolute left-0 hidden min-w-[380px] p-4 mt-3 text-sm text-black-50 bg-black-900 rounded group-hover:block z-10 shadow-md">
          * 나이와 지역은 회원가입한 정보를 바탕으로 두고 있습니다.
          <br />* 수정 원하신다면 마이페이지 회원정보 수정을 이용해주세요.
        </div>
      </div>
      <div className="flex">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-gray-100 ${
              selected === option ? "text-black font-bold underline" : "text-gray-400"
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const mediaQuery = window.matchMedia("(max-width: 767px)");

  const handleResize = (e) => {
    setIsMobile(e.matches);
  };

  mediaQuery.addEventListener("change", handleResize);

  return () => {
    mediaQuery.removeEventListener("change", handleResize);
  };
}, []);

  const [sortOption, setSortOption] = useState("가나다순");
  const [currentPage, setCurrentPage] = useState(1);
  const [benefits, setBenefits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({
    가구형태: [],
    가구상황: [],
    관심주제: [],
  });

  const sortParam =
    sortOption === "인기순" ? "bookmark" : sortOption === "방문순" ? "view" : "";

  const fetchFilteredData = useCallback(
    async (page = 1) => {
      try {
        setIsLoading(true);
        const size = isMobile ? 3 : null;
        const data = await getFilteredBenefits(selectedFilters, sortParam, page - 1, size);
        setBenefits(data?.content || []);
        setTotalPages(data?.totalPages || 1);
      } catch (error) {
        console.error("Filtered fetch error:", error);
        setBenefits([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedFilters, sortParam, isMobile]
  );

  const fetchSearchedData = useCallback(
    async (keyword, page = 1) => {
      try {
        setIsLoading(true);
        const size = isMobile ? 3 : null;
        const data = await searchBenefits(keyword, page - 1, size);
        setBenefits(data?.content || []);
        setTotalPages(data?.totalPages || 1);
      } catch (error) {
        console.error("Search fetch error:", error);
        setBenefits([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
      }
    },
    [isMobile]
  );

  const handleSearch = async (keyword) => {
    const trimmed = keyword.trim();
    setSearchKeyword(trimmed);
    setCurrentPage(1);
    if (trimmed) {
      fetchSearchedData(trimmed, 1);
    } else {
      fetchFilteredData(1);
    }
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    setSearchKeyword("");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedFilters({ 가구형태: [], 가구상황: [], 관심주제: [] });
    setSearchKeyword("");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (searchKeyword) {
      fetchSearchedData(searchKeyword, currentPage);
    } else {
      fetchFilteredData(currentPage);
    }
  }, [
    currentPage,
    sortOption,
    selectedFilters,
    searchKeyword,
    fetchSearchedData,
    fetchFilteredData,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CurveLoading size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:p-4 p-6 max-w-[1600px] mx-auto">
      <span className="text-[32px] mb-8 font-semibold text-center">복지혜택 전체보기</span>
      <div className="flex lg:flex-col lg:gap-2">
        <div>
          <SideFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="flex flex-col flex-1">
          <SearchFilter onSearch={handleSearch} onReset={handleReset} />
          <div className="w-full max-w-[1200px]">
            <SortOptions selected={sortOption} onSelect={handleSortChange} />
          </div>
          <div
            key={`card-list-${isMobile}`}
            className="grid md:grid-cols-1 grid-cols-3 md:gap-4 lg:gap-6 gap-5 w-full max-w-[1200px]"
          >
            {benefits.length > 0 ? (
              benefits.map((card) => (
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
              ))
            ) : (
              <div className="col-span-3 py-8 text-center">검색 결과가 없습니다.</div>
            )}
          </div>
          {benefits.length > 0 && (
            <div className="flex justify-center mt-8 max-w-[1200px]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageGroupSize={isMobile ? 3 : 5}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardListPage;
