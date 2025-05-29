import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import MyPostsList from "../../components/profile/PostList";
import SearchIcon from "../../assets/images/ic_search_white.svg";
import CancelIcon from "../../assets/images/Cancel.svg";
import { getPopularBenefits, deleteSearchHistory } from "../../api/main";
import { searchAllPosts } from "../../api/postApi";
import { getsearchBenefits, autocompleteSearch } from "../../api/BenefitsService";
import { getSearchHistory } from "../../api/main";
import LineLoading from "../../components/Loading/LineLoading";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [postResults, setPostResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      handleSearch(query, false); 
    }
  }, [query]);


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

  const handleSearch = async (term, updateUrl = true) => {
    if (!term.trim()) return;

    if (updateUrl) {
      navigate(`/search?query=${encodeURIComponent(term)}`);
    }

    setIsLoading(true);
    setSearchResults([]);
    setPostResults([]);
    setAutocompleteResults([]);
    setCurrentPage(0);
    setHasMore(true);

    try {
      const result = await getsearchBenefits(term);
      setSearchResults(result.content);
      
      if (result.content.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(!result.last);
      }

      const posts = await searchAllPosts(term);
      setPostResults(posts);
      localStorage.setItem("searchTerm", term);

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

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    try {
      const result = await  getsearchBenefits(searchTerm, 6, nextPage);
      setSearchResults((prev) => [...prev, ...result.content]);
      setCurrentPage(nextPage);
      setHasMore(!result.last); 
    } catch (e) {
      console.error("❌ 더보기 실패:", e);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-[1680px] mx-auto">
      <h1 className="text-[32px] font-bold mb-6">통합검색</h1>

      {/* 검색 입력 */}
      <div className="relative w-full max-w-[1236px] mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-[10px] min-h-[64px] border bg-[#FAFAFA] px-4 py-3 w-full">
          
          <div className="relative flex items-center w-full">
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

      {/* 최근 검색어 */}
      <div className="mb-6 w-full max-w-[1236px]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="mb-3 text-xl font-semibold">최근 검색어</h2>
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
                  className="w-5 h-5 ml-1 cursor-pointer"
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
          <div className="flex flex-col items-center justify-center gap-3 min-h-[60px]">
            <LineLoading />
            <p>검색한 키워드가 포함한 복지서비스를 찾는중입니다...</p>
          </div>
        ) : (
          searchResults.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
              {searchResults.map((card) => (
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
          ) : (
            <p className="mt-4 font-semibold text-center text-gray-400">검색 결과가 없습니다.</p>
          )
        )}

        {/* 모바일/PC 공통 더보기 버튼 */}
        {hasMore && searchResults.length > 0 && (
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
      <div className="w-full max-w-[1236px] mb-4">
        <h2 className="mb-4 text-xl font-semibold">게시판</h2>
        <MyPostsList posts={postResults} />
      </div>
    </div>
  );
};

export default Search;
