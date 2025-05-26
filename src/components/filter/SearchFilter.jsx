import React, { useState } from "react";
import { autocompleteSearch } from "../../api/BenefitsService";

const SearchFilter = ({ onSearch, onReset }) => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    onSearch(searchInput);
    setSearchInput("");
    setSuggestions([]);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

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
    setSuggestions([]);
    onSearch(suggestion);
  };

  return (
    <div className="pt-6 pb-6 px-[30px] mb-6 border rounded max-w-[1200px] min-h-[180px] bg-black-50 relative">
      <div className="flex flex-col w-full gap-4">
        {/* 검색창 */}
        <div className="relative w-full">
          <div className="flex items-center w-full gap-[30px]">
            <span className="text-[16px] whitespace-nowrap">검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              className="flex-1 px-3 py-2 h-10 border rounded-[12px] w-full"
              value={searchInput}
              onChange={handleInputChange}
            />
          </div>

          {/* 자동완성 목록 */}
          {suggestions.length > 0 && (
    <ul className="absolute left-[60px] w-[calc(100%-60px)] top-full mt-2 bg-white border border-gray-300 rounded shadow-lg z-10 max-w-[500px] md:max-w-[calc(100vw-32px)]">
        {suggestions.map((suggestion, index) => (
            <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-3 transition-colors duration-200 rounded cursor-pointer hover:bg-yellow-100 truncate"
            >
                {suggestion}
            </li>
        ))}
    </ul>
)}
        </div>
      </div>

      {/* 검색 및 초기화 버튼 */}
      <div className="flex justify-end mt-9 ">
        <div className="flex gap-2.5 w-full max-w-[300px] min-h-[40px]">
          <button
            className="flex-1 text-black-50 bg-gray-500 rounded-[10px] px-3 py-2 text-sm md:text-base h-10"
            onClick={onReset}
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
