import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const InterestModal = ({ isOpen, onRequestClose }) => {
  const [selected, setSelected] = useState({
    familyStatus: [],
    familyType: [],
    interestTopics: [],
  });

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
          <h3 className="text-[20px] mb-4">가구상황</h3>
          <div className="flex flex-wrap gap-8">
            {["다문화가족", "북한이탈주민", "한부모가정/조손가정", "1인가구", "장애인", "국가보훈대상자", "질병/환자"].map((item) => (
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
          <h3 className="text-[20px] mb-4">가구형태</h3>
          <div className="flex flex-wrap gap-5">
            {["다자녀가구", "무주택세대", "신규전입", "확대가족"].map((item) => (
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
            {["보육·교육", "주거·지원", "행정·안전", "농림축산어업", "고용·창업", "보건·의료", "문화·환경", "생활안정"].map((item) => (
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
        <button className="bg-gray-300 text-black-50 max-w-[159px] px-12 py-2 rounded-[10px]">건너뛰기</button>
        <button className="bg-yellow-700 text-black-50 px-12 py-2 max-w-[159px] rounded-[10px]">선택완료</button>
      </div>
    </Modal>
  );
};

export default InterestModal;