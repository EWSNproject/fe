import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getInterestCategories } from '../../api/main';

const FilterSection = ({ title, options, selectedOptions, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];

    onSelectionChange(title, newSelectedOptions);
  };

  return (
    <div className="p-4 mb-4 bg-white border rounded-lg">
      {/* 필터 제목 */}
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleSection}>
        <h3 className="text-[14px]">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* 필터 목록 */}
      {isOpen && (
        <ul className="mt-2">
          {options.map((option) => (
            <li key={option} className="flex items-center gap-2 my-1">
              <input
                type="checkbox"
                id={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 accent-tag-green"
              />
              <label htmlFor={option} className="text-sm">{option}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SideFilter = ({ onFilterChange }) => {
  // 빈 배열로 초기화
  const [filterCategories, setFilterCategories] = useState({
    "가구형태": [],
    "가구상황": [],
    "관심주제": []
  });

  // 컴포넌트 마운트 시 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getInterestCategories();
        setFilterCategories(data);
      } catch (error) {
        console.error('카테고리 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchCategories();
  }, []);

  const [selectedFilters, setSelectedFilters] = useState({
    "가구형태": [],
    "가구상황": [],
    "관심주제": []
  });

  const isAllSelected = Object.values(selectedFilters).every(
    (selected) => selected.length > 0 && selected.length === filterCategories[Object.keys(selectedFilters).find((key) => selectedFilters[key] === selected)]?.length
  );

  const handleSelectionChange = (category, selectedOptions) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: selectedOptions,
    }));
  };

  const toggleAllSelections = () => {
    if (isAllSelected) {
      // 전체 해제
      setSelectedFilters(
        Object.fromEntries(Object.keys(filterCategories).map((key) => [key, []]))
      );
    } else {
      // 전체 선택
      setSelectedFilters(
        Object.fromEntries(Object.entries(filterCategories).map(([key, options]) => [key, options]))
      );
    }
  };

  return (
    <div className="w-[250px] p-4 mr-6 text-xs border rounded-lg h-full bg-gray-50">
      <div className="flex items-center justify-between mb-5 ml-1">
        <h2 className="text-sm font-semibold">필터</h2>
        <button className="text-xs text-tag-red" onClick={toggleAllSelections}>
          {isAllSelected ? "전체 해제" : "전체 선택"}
        </button>
      </div>

      {Object.entries(filterCategories).map(([title, options]) => (
        <FilterSection
          key={title}
          title={title}
          options={options}
          selectedOptions={selectedFilters[title]}
          onSelectionChange={handleSelectionChange}
        />
      ))}
    </div>
  );
};

export default SideFilter;
