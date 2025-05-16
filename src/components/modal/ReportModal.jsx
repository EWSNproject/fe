import { useState, useEffect } from "react";

const ReportModal = ({
  opened,
  onClose,
  onConfirm,
  title = "제목 없음",
  question = "어떤 문제인가요?",
  options = [],
  confirmText = "확인",
}) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [detailText, setDetailText] = useState("");

  useEffect(() => {
    if (!opened) {
      setSelectedReason("");
      setDetailText("");
    }
  }, [opened]);

  if (!opened) return null;

  const handleSubmit = () => {
    onConfirm({
      reason: selectedReason,
      detail: detailText.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900 bg-opacity-80">
      <div className="bg-black-50 p-10 rounded-2xl shadow-lg w-[450px]">
        <p className="text-[18px] text-center mb-2">{title}</p>
        <h2 className="text-center mb-4 font-semibold text-[24px] ml-3">{question}</h2>

        <form className="space-y-4">
          {options.map((reason, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2">
              <input
                type="radio"
                id={`reason-${idx}`}
                name="reason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="w-4 h-4"
              />
              <label
                htmlFor={`reason-${idx}`}
                className="text-[16px] cursor-pointer"
              >
                {reason}
              </label>
            </div>
          ))}
        </form>

        {/* ✅ 상세 내용 입력란 (항상 표시, 선택사항) */}
        <div className="mt-4">
          <textarea
            value={detailText}
            onChange={(e) => setDetailText(e.target.value)}
            placeholder="(선택 사항) 선택한 사유에 대한 상세 내용을 자유롭게 입력해주세요"
            className="w-full h-24 p-2 text-sm border border-gray-300 rounded resize-none"
          />
        </div>

        <div className="flex max-w-[376px] w-full gap-2 mt-6 mx-auto">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 max-w-[180px] min-h-[45px] w-full text-black rounded-2xl"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason}
            className={`max-w-[180px] w-full px-4 py-2 rounded-2xl ${
              !selectedReason
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

export default ReportModal;
