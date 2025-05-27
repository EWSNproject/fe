import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Menu } from "lucide-react";
import { getFilterData } from "../../api/BenefitsService";
import Cookies from "js-cookie";

const SideFilter = ({ onFilterChange, initialFilters }) => {
  const isLoggedIn = !!Cookies.get("accessToken");
  const [menuOpen, setMenuOpen] = useState(false);

  const [filterCategories, setFilterCategories] = useState({
    "가구형태": [],
    "가구상황": [],
    "관심주제": []
  });

  const [tempFilters, setTempFilters] = useState({
    familyTypes: [],
    specialGroups: [],
    categories: []
  });

  const [openSections, setOpenSections] = useState({});

  const isAllSelected =
    tempFilters.familyTypes.length === filterCategories["가구형태"]?.length &&
    tempFilters.specialGroups.length === filterCategories["가구상황"]?.length &&
    tempFilters.categories.length === filterCategories["관심주제"]?.length;

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const data = await getFilterData();
        setFilterCategories({
          "가구형태": data.familyTypes || [],
          "가구상황": data.specialGroups || [],
          "관심주제": data.categories || []
        });

        if (isLoggedIn) {
          const savedFilters = sessionStorage.getItem("benefitsFilters");
          if (savedFilters) {
            setTempFilters(JSON.parse(savedFilters));
          }
        }
      } catch (error) {
        console.error("필터 데이터를 불러오는데 실패했습니다:", error);
      }
    };
    fetchFilterData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (
      initialFilters &&
      filterCategories["가구형태"].length &&
      filterCategories["가구상황"].length &&
      filterCategories["관심주제"].length
    ) {
      setTempFilters({
        familyTypes: initialFilters["가구형태"] || [],
        specialGroups: initialFilters["가구상황"] || [],
        categories: initialFilters["관심주제"] || []
      });
    }
  }, [initialFilters, filterCategories]);

  const handleSelectionChange = (category, selectedOptions) => {
    const selectedLabels = selectedOptions.map(option => option.label);
    const newTempFilters = {
      ...tempFilters,
      [category === "가구형태"
        ? "familyTypes"
        : category === "가구상황"
        ? "specialGroups"
        : "categories"]: selectedLabels
    };
    setTempFilters(newTempFilters);
  };

  const toggleAllSelections = () => {
    if (isAllSelected) {
      setTempFilters({
        familyTypes: [],
        specialGroups: [],
        categories: []
      });
    } else {
      setTempFilters({
        familyTypes: filterCategories["가구형태"].map(option => option.label),
        specialGroups: filterCategories["가구상황"].map(option => option.label),
        categories: filterCategories["관심주제"].map(option => option.label)
      });
    }
  };

  const handleSearch = () => {
    onFilterChange(tempFilters);
    if (isLoggedIn) {
      sessionStorage.setItem("benefitsFilters", JSON.stringify(tempFilters));
    }
  };

  const handleReset = () => {
    setTempFilters({
      familyTypes: [],
      specialGroups: [],
      categories: []
    });
    if (isLoggedIn) {
      sessionStorage.removeItem("benefitsFilters");
    }
    onFilterChange({
      familyTypes: [],
      specialGroups: [],
      categories: []
    });
  };

  const toggleSection = (title) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const FilterSection = ({
    title,
    options,
    selectedOptions,
    onSelectionChange,
    isOpen,
    onToggle
  }) => {
    const handleCheckboxChange = (option) => {
      const newSelectedOptions = selectedOptions.some(
        selected => selected.code === option.code
      )
        ? selectedOptions.filter(item => item.code !== option.code)
        : [...selectedOptions, option];
      onSelectionChange(title, newSelectedOptions);
    };

    return (
      <div className="p-4 mb-4 border rounded-lg bg-white">
        <div className="flex items-center justify-between cursor-pointer" onClick={onToggle}>
          <h3 className="text-[14px]">{title}</h3>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
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
                <label htmlFor={option.code} className="text-sm">
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* 데스크탑 메뉴 버튼 */}
      <div className="lg:flex hidden justify-start px-4 mb-2">
        <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-2">
          <Menu size={20} />
          <span className="text-sm font-semibold">
            {menuOpen ? "필터 닫기" : "필터 열기"}
          </span>
        </button>
      </div>

      {/* 데스크탑 필터 영역 */}
      {menuOpen && (
        <div className="lg:flex hidden flex-col p-4 border rounded-lg bg-gray-50 w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">필터</h2>
            <div className="flex gap-2">
              <button className="text-xs text-tag-red" onClick={handleReset}>
                초기화
              </button>
              <button className="text-xs text-tag-red" onClick={toggleAllSelections}>
                {isAllSelected ? "전체 해제" : "전체 선택"}
              </button>
            </div>
          </div>

          {Object.entries(filterCategories).map(([title, options]) => (
            <FilterSection
              key={title}
              title={title}
              options={options}
              selectedOptions={options.filter(option =>
                tempFilters[
                  title === "가구형태"
                    ? "familyTypes"
                    : title === "가구상황"
                    ? "specialGroups"
                    : "categories"
                ].includes(option.label)
              )}
              onSelectionChange={handleSelectionChange}
              isOpen={openSections[title]}
              onToggle={() => toggleSection(title)}
            />
          ))}

          <button
            onClick={handleSearch}
            className="w-full py-2 mt-4 bg-yellow-700 text-white rounded-lg text-sm font-semibold"
          >
            검색하기
          </button>
        </div>
      )}

      {/* 모바일 필터 영역 */}
      <div className="lg:hidden block w-[280px] bg-gray-50 border rounded-xl p-4 mr-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold">필터</h2>
          <div className="flex gap-2">
            <button className="text-xs text-tag-red" onClick={handleReset}>
              초기화
            </button>
            <button className="text-xs text-tag-red" onClick={toggleAllSelections}>
              {isAllSelected ? "전체 해제" : "전체 선택"}
            </button>
          </div>
        </div>

        {Object.entries(filterCategories).map(([title, options]) => (
          <FilterSection
            key={title}
            title={title}
            options={options}
            selectedOptions={options.filter(option =>
              tempFilters[
                title === "가구형태"
                  ? "familyTypes"
                  : title === "가구상황"
                  ? "specialGroups"
                  : "categories"
              ].includes(option.label)
            )}
            onSelectionChange={handleSelectionChange}
            isOpen={openSections[title]}
            onToggle={() => toggleSection(title)}
          />
        ))}

        <button
          onClick={handleSearch}
          className="w-full py-2 mt-4 bg-yellow-700 text-white rounded-lg"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SideFilter;
