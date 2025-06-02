import { useState, useEffect } from "react";

const ReasonSelectModal = ({
  opened,
  onClose,
  onConfirm,
  title = "제목 없음",
  question = "이유를 선택해주세요.",
  options = [],
  confirmText = "확인",
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [etcText, setEtcText] = useState("");

  useEffect(() => {
    if (!opened) {
      setSelectedReason("");
      setEtcText("");
    }
  }, [opened]);

  if (!opened) return null;

  const handleSubmit = () => {
    if (selectedReason === "직접 입력") {
      onConfirm(etcText.trim() || "기타");
    } else {
      onConfirm(selectedReason);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900 bg-opacity-80">
      <div className="bg-black-50 p-10 rounded-2xl shadow-lg w-[450px]">
        <h2 className="text-[25px] font-bold text-center mb-2">{title}</h2>
        <p className="text-center mb-4 text-[18px] ml-3">{question}</p>

        <form className="space-y-4">
          {options.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 " 
            >
              <input
                type="radio"
                id={`reason-${idx}`}
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="w-4 h-4 "
              />
              <label
                htmlFor={`reason-${idx}`}
                className="text-[16px] cursor-pointer"
              >
                {reason}
              </label>
            </div>
          ))}

          {selectedReason === "직접 입력" && (
            <div className="mt-2">
              <textarea
                value={etcText}
                onChange={(e) => setEtcText(e.target.value)}
                placeholder="기타 사유를 입력해주세요"
                className="w-full h-24 p-2 text-sm border border-gray-300 rounded resize-none"
              />
            </div>
          )}
        </form>

        <div className="flex max-w-[376px] w-full gap-2 mt-6 mx-auto">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 max-w-[180px] min-h-[45px] w-full text-black rounded-2xl"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              !selectedReason ||
              (selectedReason === "직접 입력" && etcText.trim() === "")
            }
            className={`max-w-[180px] w-full px-4 py-2 rounded-2xl ${
              !selectedReason ||
              (selectedReason === "직접 입력" && etcText.trim() === "")
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-700 text-white"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonSelectModal;
