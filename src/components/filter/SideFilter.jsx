import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FilterSection = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="p-4 mb-4 bg-white border rounded-lg">
      {/* 필터 제목 */}
      <div className="flex items-center justify-between cursor-pointer" onClick={toggleSection}>
        <h3 className="text-[14px] font-bold">{title}</h3>
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

const SideFilter = () => {
  return (
    <div className="w-[250px] p-4 mr-6 text-xs border rounded-lg h-full bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">필터</h2>
        <button className="text-xs text-tag-red">전체선택</button>
      </div>

      <FilterSection title="생애주기" options={["임신, 출산", "영유아", "아동", "청소년", "청년", "중장년", "노년"]} />
      <FilterSection title="가구상황" options={["저소득", "장애인", "한부모, 조손", "다자녀", "다문화, 탈북민", "보훈대상자"]} />
      <FilterSection title="관심주제" options={["신체건강", "생활지원", "일자리", "안전, 위기", "보육", "임차, 위탁", "에너지", "정신건강", "주거", "문화, 여가", "임신, 출산", "교육", "보호, 돌봄", "법률"]} />
    </div>
  );
};

export default SideFilter;
