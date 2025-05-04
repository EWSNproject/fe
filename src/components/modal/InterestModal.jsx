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

  // 컴포넌트 마운트 시 관심사 카테고리 데이터 가져오기
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
      className="bg-black-50 pt-12 pb-12 pr-[90px] pl-[90px] max-w-[1016px] min-h-[800px] rounded-lg outline-none"
      overlayClassName="fixed inset-0 bg-black-900 bg-opacity-80 flex items-center justify-center"
    >
      <div className="flex flex-col">
        <h2 className="text-[40px] font-bold mb-2">당신의 요즘 관심사는 무엇입니까?</h2>
        <p className="text-[18px]">
          선택한 키워드가 포함된 복지 혜택을 알려드리는 데 도움이 됩니다.
        </p>
        <p className="text-[18px] mb-10">
          관심 있는 복지 키워드를 선택하세요. 최대 5개까지 선택 가능합니다.
        </p>
      </div>

      <div className="flex flex-col gap-[30px]">
        <div className="pt-5 pb-5 pr-10 pl-10 rounded-[8px] max-w-[816px] outline outline-1 outline-black-200">
          <h3 className="text-[20px] mb-4">가구형태</h3>
          <div className="flex flex-wrap gap-8">
            {categories["가구형태"].map((item) => (
              <button
                key={item}
                onClick={() => toggleSelection("familyStatus", item)}
                className={`${
                  isSelected("familyStatus", item)
                    ? "bg-tag-bg-checkorange"
                    : "bg-tag-bg-orange"
                } text-tag-orange border border-tag-orange px-3 py-1 rounded-full`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-5 pb-5 pr-10 pl-10 rounded-[8px] max-w-[816px] outline outline-1 outline-black-200">
          <h3 className="text-[20px] mb-4">가구상황</h3>
          <div className="flex flex-wrap gap-5">
            {categories["가구상황"].map((item) => (
              <button
                key={item}
                onClick={() => toggleSelection("familyType", item)}
                className={`${
                  isSelected("familyType", item)
                    ? "bg-tag-bg-checkgreen"
                    : "bg-tag-bg-green"
                } text-tag-green border border-tag-green px-3 py-1 rounded-full`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-5 pb-5 pr-10 pl-10 max-w-[816px] rounded-[8px] outline outline-1 outline-black-200">
          <h3 className="text-[20px] mb-4">관심주제</h3>
          <div className="flex flex-wrap gap-5">
            {categories["관심주제"].map((item) => (
              <button
                key={item}
                onClick={() => toggleSelection("interestTopics", item)}
                className={`${
                  isSelected("interestTopics", item)
                    ? "bg-tag-bg-checkblue"
                    : "bg-tag-bg-blue"
                } text-tag-blue border border-tag-blue px-3 py-1 rounded-full`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-9">
        <button 
          onClick={handleSkip}
          className="bg-gray-300 text-black-50 max-w-[159px] px-12 py-2 rounded-[10px]"
        >
          건너뛰기
        </button>
        <button 
          onClick={handleSubmit}
          className="bg-yellow-700 text-black-50 px-12 py-2 max-w-[159px] rounded-[10px]"
        >
          선택완료
        </button>
      </div>
    </Modal>
  );
};

export default InterestModal;