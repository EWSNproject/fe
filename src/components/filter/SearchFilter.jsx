import React, { useState, useEffect } from "react";
import { autocompleteSearch } from "../../api/BenefitsService";
import Cookies from "js-cookie"; 

const SearchFilter = ({ onSearch, onReset, initialKeyword = "" }) => {
  const isLoggedIn = !!Cookies.get("accessToken"); 

  const [searchInput, setSearchInput] = useState(() => {
    if (isLoggedIn) {
      const savedKeyword = sessionStorage.getItem("benefitsSearchKeyword");
      return savedKeyword || initialKeyword;
    }
    return initialKeyword;
  });

  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    onSearch(searchInput);
    if (isLoggedIn) {
      sessionStorage.setItem("benefitsSearchKeyword", searchInput); 
    }
    setSuggestions([]);
  };

  const handleReset = () => {
    setSearchInput("");
    if (isLoggedIn) {
      sessionStorage.removeItem("benefitsSearchKeyword"); 
    }
    onReset();
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (isLoggedIn) {
      sessionStorage.setItem("benefitsSearchKeyword", value);
    }

    if (value) {
      try {
        const results = await autocompleteSearch(value);
        setSuggestions(results);
      } catch (error) {
        console.error("Failed to fetch autocomplete suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    if (isLoggedIn) {
      sessionStorage.setItem("benefitsSearchKeyword", suggestion);
    }
    setSuggestions([]);
    onSearch(suggestion);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const savedKeyword = sessionStorage.getItem("benefitsSearchKeyword");
      if (savedKeyword) {
        setSearchInput(savedKeyword);
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="pt-6 pb-6 px-[30px] mb-6 border rounded max-w-[1200px] min-h-[180px] bg-black-50 relative">
      <div className="flex flex-col w-full gap-4">
        <div className="relative w-full">
          <div className="flex items-center w-full gap-[30px]">
            <span className="text-[16px] whitespace-nowrap">검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              className="flex-1 px-3 py-2 h-10 border rounded-[12px] w-full"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>

          {suggestions.length > 0 && (
  <ul className="absolute left-[60px] w-[calc(100%-60px)] top-full mt-2 bg-white border border-gray-300 rounded-xl shadow-xl z-10 max-w-[700px] md:max-w-[calc(100vw-32px)] max-h-[300px] overflow-y-auto">
    {suggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion)}
        title={suggestion}
        className="flex items-center gap-2 p-3 transition-colors duration-150 rounded-md cursor-pointer hover:bg-yellow-200 hover:text-black hover:font-medium"
      >
        <span className="text-gray-500">🔍</span>
        <span className="truncate">{suggestion}</span>
      </li>
    ))}
  </ul>
)}

        </div>
      </div>

      <div className="flex justify-end mt-9">
        <div className="flex gap-2.5 w-full max-w-[300px] min-h-[40px]">
          <button
            className="flex-1 text-black-50 bg-gray-500 rounded-[10px] px-3 py-2 text-sm md:text-base h-10"
            onClick={handleReset}
          >
            초기화
          </button>
          <button
            className="flex-1 text-black-50 bg-yellow-700 rounded-[10px] px-3 py-2 text-sm md:text-base h-10"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
