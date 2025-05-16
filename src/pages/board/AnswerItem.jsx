import { useState, useEffect } from "react";
import { TextInput } from "@mantine/core";
import { Check } from "lucide-react";
import { postAnswer, selectAnswer, deleteAnswer } from "../../api/answerApi";
import { getOtherUserInfo } from "../../api/auth";
import { reportUser } from "../../api/reportApi";
import TwoSelectModal from "../../components/modal/TwoSelectModal";
import ReportModal from "../../components/modal/ReportModal";
import { REPORT_OPTIONS } from "../../constants/reportOptions";
import { toast } from 'react-toastify';

// 질문게시판을 택했을 경우, 답변 관련 코드
export default function AnswerItem({ postId, answers, userId, nickname, setComments, setCommentCount, postAuthor }) {
  const [answer, setAnswer] = useState("");
  const [userMap, setUserMap] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetId, setReportTargetId] = useState(null);

  // 답변 작성
  const handleSaveAnswer = async () => {
    if (!answer.trim()) return;
    try {
      const res = await postAnswer(postId, answer, userId);
      setComments(prev => [...prev, res]);
      setAnswer("");
      setCommentCount(prev => prev + 1);
    } catch (err) {
      console.error("답변 등록 실패", err);
    }
  };

  // 채택
  const handleSelect = async (answerId) => {
    try {
      const res = await selectAnswer(postId, answerId); 
      console.log("✅ 채택 성공:", res);
    } catch (error) {
      console.error("❌ 채택 실패:", error.response?.data || error.message);
      console.log("채택 API 호출", { postId, answerId });
    }
  };

  // 답변 삭제
  const handleDelete = async (answerId) => {
    try {
      await deleteAnswer(postId, answerId);  
      setComments((prev) =>
        prev.map((a) =>
          a.id === answerId
            ? { ...a, content: "삭제된 댓글입니다.", deleted: true }
            : a
        )
      );
    } catch (error) {
      console.error("❌ 삭제 실패:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    await handleDelete(deleteTargetId);
    setDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  // 답변 작성한 사용자의 닉네임 조회
  useEffect(() => {
    const loadNicknames = async () => {
      const uniqueIds = [...new Set(answers.map(a => a.userId))];
      for (const id of uniqueIds) {
        if (!userMap[id]) {
          try {
            const user = await getOtherUserInfo(id);
            setUserMap(prev => ({ ...prev, [id]: user.nickname }));
          } catch (e) {
            setUserMap(prev => ({ ...prev, [id]: "알 수 없음" }));
          }
        }
      }
    };
    loadNicknames();
  }, [answers, userMap]);

  // 신고
  const handleReportSubmit = ({ reason, detail }) => {
    const reportedAnswer = answers.find((a) => a.id === reportTargetId);

    if (!reportedAnswer) {
      toast.error("신고 대상 답변을 찾을 수 없습니다.");
      return;
    }

    reportUser({
      reportedUserId: reportedAnswer.userId,
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
        setReportTargetId(null);
      });
  };

  return (
    <div className='flex flex-col gap-[30px]'>
      {/* 답변 입력 UI */}
      <div className='flex items-end gap-5'>
        <span className='flex items-center justify-center w-10 h-10 text-xl font-semibold text-yellow-800 bg-yellow-400 rounded-full'>
          {nickname?.charAt(0) || "?"}
        </span>
        <TextInput
          placeholder="답변을 입력하세요..."
          value={answer}
          onChange={(e) => setAnswer(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && answer.trim()) {
              handleSaveAnswer();
            }
          }}
          classNames={{
            input: "h-[40px] w-full flex-grow bg-[#FAFAFA] border-0 text-base rounded-none font-normal focus:ring-0 focus:outline-none ",
          }}
          className="flex-grow border-b border-gray-400"
        />
        <button
          onClick={handleSaveAnswer}
          disabled={!answer.trim()}
          className={`font-semibold rounded px-4 h-[30px] text-sm text-black-50 transition 
            ${answer.trim() ? 'bg-yellow-700 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          저장
        </button>
      </div>

      {/* 답변 목록 */}
      <div className='w-[1000px] mx-auto flex flex-col gap-1.5'>
        {answers.map((comment) => {
          const date = new Date(comment.createdAt);
          const formattedDate = date.toISOString().split("T")[0].replace(/-/g, ".");
          const isAnySelected = answers.some((c) => c.selected); 

          return (
            <div
              key={comment.id}
              className={`flex flex-col gap-2 py-3.5 px-5 border border-gray-200 ${
                comment.selected ? 'bg-[#E2F1F9]' : ''
              }`}
            >
              <div className='flex justify-between text-sm font-normal'>
                <span className='text-tag-green'>
                  {userMap[comment.userId] === postAuthor
                    ? `${userMap[comment.userId]} (글쓴이)`
                    : userMap[comment.userId] || "로딩 중..."}
                </span>
                <span className='text-gray-400'>{formattedDate}</span>
              </div>
              <div className='font-normal text-black-950'>{comment.content}</div>
              <div className='flex justify-between'>
                <div className='text-black-500 flex gap-2.5 text-sm font-normal'>
                  {userMap[comment.userId] === nickname ? (
                    <button
                      onClick={() => {
                        setDeleteTargetId(comment.id);
                        setDeleteModalOpen(true);
                      }}
                      className='flex items-center hover:underline'
                    >
                      삭제
                    </button>
                  ) : (
                    <button
                      className="flex items-center hover:underline"
                      onClick={() => {
                        setReportTargetId(comment.id);
                        setReportModalOpen(true);
                      }}
                    >
                      신고
                    </button>
                  )}
                </div>
                {/* 하나라도 채택된 댓글이 있으면 모두 숨김 */}
                {!isAnySelected && (
                  <button 
                    onClick={() => handleSelect(comment.id)}
                    className='flex px-2 border-4 rounded-full hover:bg-tag-blue hover:text-black-50 border-tag-blue text-tag-blue'
                  >
                    채택 <Check size={16} className="mt-[3px]" />
                  </button>
                )}
              </div>
              {/* 채택된 경우에만 안내 문구 출력 */}
              {comment.selected && (
                <div className="px-3 py-1 text-sm font-bold border-2 rounded-lg bg-black-50 border-tag-blue text-tag-blue">
                  채택된 댓글입니다.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ✅ 삭제 확인 모달 */}
      <TwoSelectModal
        isOpen={deleteModalOpen}
        message="답변을 삭제하시겠습니까?"
        subMessage="삭제되면 복원은 불가능합니다."
        button1Text="삭제"
        button1Action={handleConfirmDelete}
        button2Text="취소"
        button2Action={() => setDeleteModalOpen(false)}
      />

      {/* ✅ 신고 상세내용 모달 */}
      <ReportModal
        opened={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onConfirm={handleReportSubmit}
        title="답변 신고하기"
        confirmText="신고"
        options={REPORT_OPTIONS}
      />

    </div>
  );
}
