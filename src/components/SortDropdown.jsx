import { useState, useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function SortDropdown({ options, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* 드롭다운 버튼 */}
      <button
        className="w-[108px] h-[40px] border rounded-md flex items-center justify-between px-4 text-black-700 border-gray-300 bg-black-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* 드롭다운 목록 영역 */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full border rounded-md bg-black-50 shadow-md px-[6px] py-[6px]">
          {options.map((option) => (
            <div
              key={option}
              className={`px-[10px] py-[8px] text-sm cursor-pointer rounded-md text-left bg-black-50 ${
                selected === option
                  ? ' text-yellow-800 font-bold bg-yellow-400'
                  : 'text-black-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
