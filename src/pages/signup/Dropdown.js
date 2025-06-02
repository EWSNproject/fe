import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Dropdown({
  label,
  options,
  selected,
  setSelected,
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={`flex items-center justify-between w-full h-12 px-4 py-2 border border-2.5 cursor-pointer rounded-xl text-base ${
          selected ? "text-black-700" : "text-[#9FA6B2]"
        } bg-black-50`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected || placeholder}</span>
        <span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      </div>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 border border-gray-300 rounded-lg shadow-md bg-black-50 max-h-[150px] overflow-y-auto">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 border rounded-lg cursor-pointer border-black-50 hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
