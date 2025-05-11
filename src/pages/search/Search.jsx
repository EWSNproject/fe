import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import MyPostsList from "../../components/profile/PostList";
import SearchIcon from "../../assets/images/ic_search_white.svg";
import CancelIcon from "../../assets/images/Cancle.svg";
import { getPopularBenefits } from "../../api/main";
import { searchAllPosts } from "../../api/postApi";
import {searchBenefits, autocompleteSearch} from "../../api/BenefitsService"

const Search = () => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postResults, setPostResults] = useState([]);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setVisibleItems((prev) => prev + 4);
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
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    } else {
      setSearchTerm("");
    }
  }, [query]);

  const handleSearch = async (term) => {
    setIsLoading(true);
    setSearchResults([]);
    setPostResults([]);
  
    try {
      const benefits = await searchBenefits(term);
      setSearchResults(benefits);
      setVisibleItems(benefits.length);
    } catch (e) {
      console.warn("❌ 복지서비스 검색 실패:", e);
    }
  
    try {
      const posts = await searchAllPosts(term);
      setPostResults(posts);
    } catch (e) {
      console.warn("❌ 게시글 검색 실패:", e);
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

  const currentItems =
    searchResults.length > 0
      ? searchResults.slice(0, visibleItems)
      : popularBenefits.slice(0, visibleItems);

  return (
    <div className="flex flex-col items-center p-6 max-w-[1680px] mx-auto">
      <h1 className="text-[32px] font-bold mb-6">통합검색</h1>

      {/* 검색 입력 */}
      <div className="relative w-full max-w-[1180px] mb-8">
        <div className="flex items-center rounded-[10px] min-h-[72px] border bg-[#FAFAFA]">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 px-4 py-2 max-w-[1008px] max-h-[24px] bg-[#FAFAFA]"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(searchTerm)}
          />
          <img
            src={CancelIcon}
            alt="Cancel"
            className="w-6 h-6 mx-4 cursor-pointer"
            onClick={() => setSearchTerm("")}
          />
          <button
            className="flex items-center justify-center px-4 py-2 min-w-[94px] max-h-[40px] bg-yellow-700 text-black-50 rounded-[10px]"
            onClick={() => handleSearch(searchTerm)}
          >
            <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" />
            검색
          </button>
        </div>

        {/* Autocomplete Suggestions */}
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

      {/* 복지서비스 */}
      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl font-semibold">복지서비스</h2>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {currentItems.map((card) => (
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

        {visibleItems < searchResults.length && (
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