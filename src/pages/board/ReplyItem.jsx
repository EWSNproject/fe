import { useState } from 'react';
import { CornerDownRight } from "lucide-react";
import { reportUser } from "../../api/reportApi";
import TwoSelectModal from "../../components/modal/TwoSelectModal";
import ReportModal from "../../components/modal/ReportModal";
import { REPORT_OPTIONS } from "../../constants/reportOptions";
import { toast } from 'react-toastify';

export default function ReplyItem({ reply, nickname, onDelete, postAuthor }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const formattedDate = new Date(reply.createdAt)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, ".");

  const handleConfirmDelete = async () => {
    await onDelete(reply.id); 
    setDeleteModalOpen(false);
  };

  const handleReportSubmit = ({ reason, detail }) => {
    if (!reply || !reply.userId) {
      toast.error("신고 대상 답변을 찾을 수 없습니다.");
      return;
    }

    reportUser({
      reportedUserId: reply.userId,
      reason,
      content: detail || "",
    })
      .then(() => {
        toast.success("신고가 성공적으로 접수되었습니다.");
      })
      .catch((err) => {
        toast.error("신고 처리 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setReportModalOpen(false);
      });
  };

  return (
    <div className="flex w-full gap-2.5 mt-2">
      <CornerDownRight className="text-gray-300" />
      <div className="w-full bg-gray-100 rounded-xl py-3.5 px-5 gap-1.5">
        <div className="flex justify-between text-sm font-normal">
          <span className="text-tag-green">
            {reply.nickname === postAuthor
              ? `${reply.nickname} (글쓴이)`
              : reply.nickname || "알 수 없음"}
          </span>
          <span className="text-gray-400">{formattedDate}</span>
        </div>
        <div className="w-full font-normal break-words text-black-950">{reply.content}</div>
        <div className="flex justify-between">
          <div className="text-black-500 flex gap-2.5 text-sm font-normal">
            {reply.userId === nickname && reply.content !== "사용자가 삭제한 댓글입니다." ? (
              <button 
                className="flex items-center hover:underline"
                onClick={() => setDeleteModalOpen(true)}
              >
                삭제
              </button>
            ) : (
              reply.userId !== nickname && reply.content !== "사용자가 삭제한 댓글입니다." && (
                <button
                  className="flex items-center hover:underline"
                  onClick={() => setReportModalOpen(true)}
                >
                  신고
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <TwoSelectModal
        isOpen={deleteModalOpen}
        message="대댓글을 삭제하시겠습니까?"
        subMessage="삭제되면 복원은 불가능합니다."
        button1Text="삭제"
        button1Action={handleConfirmDelete}
        button2Text="취소"
        button2Action={() => setDeleteModalOpen(false)}
      />
      
      <ReportModal
        opened={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onConfirm={handleReportSubmit}
        title="대댓글 신고하기"
        confirmText="신고"
        options={REPORT_OPTIONS}
      />
    </div>
  );
}
