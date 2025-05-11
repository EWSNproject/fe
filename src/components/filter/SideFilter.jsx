import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getFilterData } from '../../api/BenefitsService';

const FilterSection = ({ title, options, selectedOptions, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    const newSelectedOptions = selectedOptions.some(selected => selected.code === option.code)
      ? selectedOptions.filter((item) => item.code !== option.code)
      : [...selectedOptions, option];

    onSelectionChange(title, newSelectedOptions);
  };

  return (
    <div className="p-4 mb-4 border rounded-lg">
      {/* 필터 제목 */}
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleSection}>
        <h3 className="text-[14px]">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {/* 필터 목록 */}
      {isOpen && (
        <ul className="mt-2">
          {options.map((option) => (
            <li key={option.code} className="flex items-center gap-2 my-1">
              <input
                type="checkbox"
                id={option.code}
                checked={selectedOptions.some(selected => selected.code === option.code)}
                onChange={() => handleCheckboxChange(option)}
                className="w-4 h-4 accent-tag-green"
              />
              <label htmlFor={option.code} className="text-sm">{option.label}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SideFilter = ({ onFilterChange }) => {
  const [filterCategories, setFilterCategories] = useState({
    "가구형태": [],
    "가구상황": [],
    "관심주제": []
  });

  // 컴포넌트 마운트 시 필터 데이터 가져오기
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const data = await getFilterData();
        setFilterCategories({
          "가구형태": data.familyTypes || [],
          "가구상황": data.specialGroups || [],
          "관심주제": data.categories || []
        });
      } catch (error) {
        console.error('필터 데이터를 불러오는데 실패했습니다:', error);
      }
    };

    fetchFilterData();
  }, []);

  const [selectedFilters, setSelectedFilters] = useState({
    familyTypes: [],
    specialGroups: [],
    categories: []
  });

  const isAllSelected = Object.values(selectedFilters).every(
    (selected) => selected.length > 0 && selected.length === filterCategories[Object.keys(selectedFilters).find((key) => selectedFilters[key] === selected)]?.length
  );

  const handleSelectionChange = (category, selectedOptions) => {
    // 현재 선택된 옵션의 label 값만 추출
    const selectedLabels = selectedOptions.map(option => option.label);

    // 새로운 필터 상태 생성
    const newSelectedFilters = {
      ...selectedFilters,
      [category === "가구형태" ? "familyTypes" : 
       category === "가구상황" ? "specialGroups" : 
       "categories"]: selectedLabels
    };

    setSelectedFilters(newSelectedFilters);
    onFilterChange(newSelectedFilters);
  };

  const toggleAllSelections = () => {
    if (isAllSelected) {
      // 전체 해제
      const emptyFilters = {
        familyTypes: [],
        specialGroups: [],
        categories: []
      };
      setSelectedFilters(emptyFilters);
      onFilterChange(emptyFilters);
    } else {
      // 전체 선택
      const allSelected = {
        familyTypes: filterCategories["가구형태"].map(option => option.label),
        specialGroups: filterCategories["가구상황"].map(option => option.label),
        categories: filterCategories["관심주제"].map(option => option.label)
      };
      setSelectedFilters(allSelected);
      onFilterChange(allSelected);
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
          selectedOptions={options.filter(option => 
            selectedFilters[
              title === "가구형태" ? "familyTypes" : 
              title === "가구상황" ? "specialGroups" : 
              "categories"
            ].includes(option.label)
          )}
          onSelectionChange={handleSelectionChange}
        />
      ))}
    </div>
  );
};

export default SideFilter;
