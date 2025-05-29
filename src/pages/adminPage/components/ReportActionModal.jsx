import { useState, useEffect } from "react";

const reasons = [
  "음란/선정적인 내용",
  "스팸 및 홍보/광고",
  "부적절한 언어/욕설",
  "폭력성/위협",
  "개인 정보 노출",
  "잘못된 정보 및 허위 사실 유포",
  "도배/복제/악성 행위",
  "기타",
];

const reasonDurationMap = {
  "음란/선정적인 내용": 10,
  "스팸 및 홍보/광고": 5,
  "부적절한 언어/욕설": 3,
  "폭력성/위협": 15,
  "개인 정보 노출": 7,
  "잘못된 정보 및 허위 사실 유포": 4,
  "도배/복제/악성 행위": 6,
};

export default function ReportActionModal({ isOpen, onClose, onSubmit }) {
  const [approve, setApprove] = useState(false);
  const [reject, setReject] = useState(false);
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);

  const getDuration = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(0, Math.round((end - start) / (1000 * 60 * 60 * 24)));
  };

  const handleSubmit = () => {
    onSubmit({
      approve,
      reject,
      reason: reason === "기타" ? customReason : reason,
      startDate,
      endDate,
      duration: approve ? getDuration() : 0,
    });
    onClose();
  };

  const resetForm = () => {
    setApprove(false);
    setReject(false);
    setReason("");
    setCustomReason("");
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  };


  // ✅ 사유 선택 시 자동 정지 기간 설정
  useEffect(() => {
    if (approve && reason && reason !== "기타") {
      const days = reasonDurationMap[reason];
      const newEndDate = new Date();
      newEndDate.setDate(newEndDate.getDate() + days);
      setEndDate(newEndDate.toISOString().split("T")[0]);
    }
  }, [reason, approve]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900 bg-opacity-80">
      {/* 모달 */}
      <div className="relative z-10 w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">신고 처리</h2>

        {/* 승인 / 거부 선택 */}
        <div className="mb-4 space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={approve}
              onChange={() => {
                setApprove(true);
                setReject(false);
              }}
            />
            신고 승인 처리
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reject}
              onChange={() => {
                setApprove(false);
                setReject(true);
              }}
            />
            신고 승인 거부
          </label>
        </div>

        {/* 승인일 때만 정지 사유/기간 */}
        {approve && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">정지 사유</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">선택하세요</option>
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* 기타 사유 입력 */}
            {reason === "기타" && (
              <div className="mb-4">
                <label className="block mb-1 text-sm font-medium">기타 사유 입력</label>
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="예: 운영정책 위반 등"
                />
              </div>
            )}

            <div className="mb-2">
              <label className="text-sm">정지 시작 날짜</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="text-sm">정지 종료 날짜</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2 text-sm text-right text-gray-500">
              정지기간: {getDuration()}일
            </div>
          </>
        )}

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-yellow-600 rounded hover:bg-yellow-700"
          >
            처리하기
          </button>
        </div>
      </div>
    </div>
  );
}
