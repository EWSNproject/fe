import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import MyPostsList from "../../components/profile/PostList";
import SearchIcon from "../../assets/images/ic_search_white.svg";
import CancelIcon from "../../assets/images/Cancel.svg";
import { getPopularBenefits, deleteSearchHistory } from "../../api/main";
import { searchAllPosts } from "../../api/postApi";
import { searchBenefits, autocompleteSearch } from "../../api/BenefitsService";
import { getSearchHistory } from "../../api/main";
import Pagination from "../../components/Pagination";

const Search = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobilePage, setMobilePage] = useState(1);

  const loadMore = () => {
    setVisibleItems((prev) => Math.min(prev + 4, searchResults.length));
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    const fetchPopularBenefits = async () => {
      try {
        const data = await getPopularBenefits();
        setPopularBenefits(data);
      } catch (error) {
        console.error("Error fetching popular benefits:", error);
      }
    };

    fetchPopularBenefits();
  }, []);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const data = await getSearchHistory();
        setRecentSearches(data);
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchRecentSearches();
  }, []);

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    } else {
      setSearchTerm("");
    }
  }, [query]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setIsLoading(true);
    setSearchResults([]);
    setPostResults([]);
    setAutocompleteResults([]);

    try {
      const benefits = await searchBenefits(term, 10);
      setSearchResults(benefits);
      setVisibleItems(6);

      const posts = await searchAllPosts(term);
      setPostResults(posts);

      const updatedSearches = await getSearchHistory();
      setRecentSearches(updatedSearches);
    } catch (e) {
      console.warn("❌ 검색 실패:", e);
    }

    setIsLoading(false);
  };

  const handleInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      try {
        const suggestions = await autocompleteSearch(term);
        setAutocompleteResults(suggestions);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setAutocompleteResults([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setAutocompleteResults([]);
    handleSearch(suggestion);
  };

  const itemsPerPage = isMobile ? 3 : visibleItems;
  const totalItems = searchResults.length > 0 ? searchResults : popularBenefits;
  const totalPages = isMobile ? Math.ceil(totalItems.length / 3) : 1;

  const pagedItems = isMobile
    ? totalItems.slice((mobilePage - 1) * 3, mobilePage * 3)
    : totalItems.slice(0, visibleItems);

  return (
    <div className="flex flex-col items-center p-6 max-w-[1680px] mx-auto">
      <h1 className="text-[32px] font-bold mb-6">통합검색</h1>

      {/* 검색 입력 */}
      <div className="relative w-full max-w-[1236px] mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-[10px] min-h-[64px] border bg-[#FAFAFA] px-4 py-3 w-full">
          
          <div className="flex items-center w-full relative">
            {/* 입력창 */}
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="flex-1 px-3 py-2 bg-[#FAFAFA] text-sm focus:outline-none w-full md:px-0"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); 
                  handleSearch(searchTerm);
                }
              }}
            />

            {/* 취소 아이콘 */}
            {searchTerm && (
              <img
                src={CancelIcon}
                alt="Cancel"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setSearchTerm("")}
              />
            )}
          </div>

          {/* 검색 버튼 */}
          <button
            className="flex items-center justify-center px-4 py-2 bg-yellow-700 text-white text-sm rounded-[8px] whitespace-nowrap w-full sm:w-auto"
            onClick={() => handleSearch(searchTerm)}
          >
            <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-1" />
            검색
          </button>
        </div>

        {/* 자동완성 결과 */}
        {autocompleteResults.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10 mt-1 max-h-[240px] overflow-y-auto">
            {autocompleteResults.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 transition-colors duration-200 cursor-pointer hover:bg-yellow-100"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recent Searches */}
      <div className="mb-6 w-full max-w-[1236px]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold mb-3">최근 검색어</h2>
          {recentSearches.length > 0 && (
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={async () => {
                await deleteSearchHistory();
                setRecentSearches([]);
              }}
            >
              전체 삭제
            </button>
          )}
        </div>

        {/* 태그만 조건적으로 렌더링 */}
        {recentSearches.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((item) => (
              <span
                key={item.id}
                className="bg-black-100 text-black-900 px-3.5 py-1 rounded-full text-sm font-medium flex items-center shadow-sm cursor-pointer"
                onClick={() => {
                  setSearchTerm(item.searchTerm);
                  handleSearch(item.searchTerm);
                }}
              >
                {item.searchTerm}
                <img
                  src={CancelIcon}
                  alt="삭제"
                  className="w-5 h-5 cursor-pointer ml-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearchHistory(item.id);
                    setRecentSearches((prev) =>
                      prev.filter((i) => i.id !== item.id)
                    );
                  }}
                />
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">최근 검색어가 없습니다.</p>
        )}
      </div>

      {/* 복지서비스 */}
      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl font-semibold">복지서비스</h2>
        {isLoading ? (
          <p>검색한 키워드가 포함한 복지서비스를 찾는중입니다...</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-1 gap-6">
            {pagedItems.map((card) => (
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
        )}

        {/* 모바일에서만 페이지네이션 */}
        {isMobile && totalPages > 1 && (
          <Pagination
            currentPage={mobilePage}
            totalPages={totalPages}
            onPageChange={setMobilePage}
            pageGroupSize={3}
          />
        )}

        {/* PC에서는 기존 더보기 버튼 유지 */}
        {!isMobile && visibleItems < searchResults.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gray-400 text-black-50 font-semibold py-2 px-4 min-w-[216px] min-h-[48px] rounded-[10px]"
            >
              더보기
            </button>
          </div>
        )}
      </div>

      {/* 게시판 */}
      <div className="w-full max-w-[1236px]">
        <h2 className="mb-4 text-xl font-semibold">게시판</h2>
        <MyPostsList posts={postResults} />
      </div>
    </div>
  );
};

export default Search;
