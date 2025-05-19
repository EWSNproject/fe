import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { saveUserInterests, getInterestCategories } from "../../api/main";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const InterestModal = ({ isOpen, onRequestClose }) => {
  const [selected, setSelected] = useState({
    familyStatus: [],
    familyType: [],
    interestTopics: [],
  });

  const [categories, setCategories] = useState({
    "가구형태": [],
    "가구상황": [],
    "관심주제": []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getInterestCategories();
        setCategories(data);
      } catch (error) {
        toast.error("관심사 목록을 불러오는데 실패했습니다.");
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const toggleSelection = (category, item) => {
    setSelected((prev) => {
      const isSelected = prev[category].includes(item);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((i) => i !== item)
          : [...prev[category], item],
      };
    });
  };

  const isSelected = (category, item) => selected[category].includes(item);

  const handleSubmit = async () => {
    try {
      await saveUserInterests(selected);
      toast.success("관심사가 성공적으로 저장되었습니다.");
      onRequestClose();
    } catch (error) {
      toast.error(error.message || "관심사 저장에 실패했습니다.");
    }
  };

  const handleSkip = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Interest Selection"
      className={`
        bg-black-50 
        pt-12 pb-12 px-[90px]   
        max-w-[1016px] min-h-[800px] 
        rounded-lg outline-none
        md:px-6 md:max-w-[420px] md:min-h-[560px]  
      `}
      overlayClassName="fixed inset-0 bg-black-900 bg-opacity-80 flex items-center justify-center px-2"
    >
      <div className="flex flex-col mb-6">
        <h2 className="text-[40px] md:text-xl font-bold mb-2 text-center md:text-left">
          당신의 요즘 관심사는 무엇입니까?
        </h2>
        <p className="text-[18px] md:text-sm text-center md:text-left">
          선택한 키워드가 포함된 복지 혜택을 알려드리는 데 도움이 됩니다.
        </p>
        <p className="text-[18px] md:text-sm mb-10 md:mb-6 text-center md:text-left">
          관심 있는 복지 키워드를 선택하세요. 최대 5개까지 선택 가능합니다.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:gap-4">
        {[
          { title: "가구형태", key: "familyStatus", color: "orange" },
          { title: "가구상황", key: "familyType", color: "green" },
          { title: "관심주제", key: "interestTopics", color: "blue" },
        ].map(({ title, key, color }) => (
          <div
            key={key}
            className="p-5 md:p-4 w-full max-w-[816px] md:max-w-full mx-auto rounded-[8px] outline outline-1 outline-black-200"
          >
            <h3 className="text-[20px] md:text-sm mb-4">{title}</h3>
            <div className="flex flex-wrap gap-4 justify-center md:gap-2 md:justify-start">
              {categories[title].map((item) => (
                <button
                  key={item}
                  onClick={() => toggleSelection(key, item)}
                  className={`px-3 py-1 text-sm md:text-xs rounded-full border text-tag-${color} border-tag-${color} ${
                    isSelected(key, item)
                      ? `bg-tag-bg-check${color}`
                      : `bg-tag-bg-${color}`
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-10 md:mt-6">
        <button
          onClick={handleSkip}
          className="bg-gray-300 text-black-50 py-2 rounded-[10px] w-full sm:w-[120px] text-sm"
        >
          건너뛰기
        </button>
        <button
          onClick={handleSubmit}
          className="bg-yellow-700 text-white py-2 rounded-[10px] w-full sm:w-[120px] text-sm"
        >
          선택완료
        </button>
      </div>
    </Modal>
  );
};

export default InterestModal;
