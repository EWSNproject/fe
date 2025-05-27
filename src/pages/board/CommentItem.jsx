import { useState, useEffect } from 'react';
import { TextInput } from "@mantine/core";
import { postReply } from "../../api/commentApi"; 
import { reportUser } from "../../api/reportApi"; 
import ReplyItem from "./ReplyItem";
import { postComment, deleteComment, getRepliesByCommentId } from "../../api/commentApi";
import TwoSelectModal from "../../components/modal/TwoSelectModal";
import ReportModal from "../../components/modal/ReportModal";
import { REPORT_OPTIONS } from "../../constants/reportOptions";
import { toast } from 'react-toastify';

// 자유&인사게시판을 택했을 경우, 댓글 관련 코드
export default function CommentItem({ postId, postType, comments, userId, nickname, setComments, setCommentCount, postAuthor }) {
  const [comment, setComment] = useState("");
  const [replyOpenId, setReplyOpenId] = useState(null); 
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState({}); 
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); 
  const [deleteTargetId, setDeleteTargetId] = useState(null); 
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetId, setReportTargetId] = useState(null);

  const handleSaveComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await postComment(postId, comment, userId, nickname);
      setComments(prev => [...prev, res]);
      setComment("");
      setCommentCount(prev => prev + 1);
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyText.trim()) return;
    try {
      const res = await postReply(postId, parentId, replyText, userId, nickname);
      setReplyOpenId(null);
      setReplyText("");

      // ✅ 대댓글을 comments 상태에 바로 추가
      setComments(prev => [...prev, res]);

      // ✅ replies 상태에도 대댓글 추가
      setReplies(prev => ({
        ...prev,
        [parentId]: [...(prev[parentId] || []), res],
      }));

      setCommentCount(prev => prev + 1);
    } catch (error) {
      console.error("❌ 대댓글 등록 실패:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteComment(postId, commentId);

      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId
            ? { ...c, content: "사용자가 삭제한 댓글입니다.", deleted: true }
            : c
        )
      );

      setReplies((prev) => {
        const updated = {};
        for (const parentId in prev) {
          updated[parentId] = prev[parentId].map((reply) =>
            reply.id === commentId
              ? { ...reply, content: "사용자가 삭제한 댓글입니다.", deleted: true }
              : reply
          );
        }
        return updated;
      });

    } catch (err) {
      console.error("❌ 댓글 삭제 실패:", err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;
    await handleDelete(deleteTargetId);
    setDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  const fetchReplies = async (commentId) => {
    try {
      const res = await getRepliesByCommentId(postId, commentId);
      setReplies(prev => ({ ...prev, [commentId]: res }));
    } catch (err) {
      console.error("대댓글 조회 실패", err);
    }
  };

  useEffect(() => {
    const fetchAllReplies = async () => {
      const parents = comments.filter(c => c.parentId === null);
      for (const comment of parents) {
        try {
          const res = await getRepliesByCommentId(postId, comment.id);
          setReplies(prev => ({
            ...prev,
            [comment.id]: res,
          }));
        } catch (err) {
          console.error(`대댓글 조회 실패: commentId=${comment.id}`, err);
        }
      }
    };

    if (comments.length > 0) {
      fetchAllReplies();
    }
  }, [comments, postId]);

  const handleReportSubmit = ({ reason, detail }) => {
    const reportedComment = comments.find((c) => c.id === reportTargetId);

    if (!reportedComment) {
      toast.error("신고 대상 답변을 찾을 수 없습니다.");
      return;
    }

    reportUser({
      reportedUserId: reportedComment.userId,
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
      {/* 댓글 입력 UI */}
      <div className='flex items-end gap-5 md:gap-2'>
        <span className='flex items-center justify-center w-10 h-10 text-xl font-semibold text-yellow-800 bg-yellow-400 rounded-full'>
          {nickname?.charAt(0) || "?"}
        </span>
        <TextInput
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChange={(e) => setComment(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && comment.trim()) {
              handleSaveComment();
            }
          }}
          classNames={{
            input: "h-[40px] w-full flex-grow bg-[#FAFAFA] border-0 text-base rounded-none font-normal focus:ring-0 focus:outline-none ",
          }}
          className="flex-grow border-b border-gray-400"
        />
        <button
          onClick={handleSaveComment}
          disabled={!comment.trim()}
          className={`font-semibold md:font-medium rounded px-4 h-[30px] md:px-2 text-sm text-black-50 transition 
            ${comment.trim() ? 'bg-yellow-700 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          저장
        </button>
      </div>
      
      {/* 댓글 목록 */}
      <div className='w-full max-w-[1000px] mx-auto px-4 flex flex-col gap-1.5 md:px-0'>
        {comments
          .filter(comment => comment.parentId === null) 
          .map((comment) => {
            const date = new Date(comment.createdAt);
            const formattedDate = date.toISOString().split("T")[0].replace(/-/g, ".");

            return (
              <div
                key={comment.id}
                className='flex flex-col gap-1.5 py-3.5 px-5 md:px-3 border border-gray-200 h-auto'
              >
                <div className='flex justify-between text-sm font-normal'>
                  <span className="text-tag-green">
                    {comment.nickname === postAuthor
                      ? `${comment.nickname} (글쓴이)`
                      : comment.nickname || "알 수 없음"}
                  </span>
                  <span className='text-gray-400'>{formattedDate}</span>
                </div>
                <div className='w-full font-normal break-words text-black-950'>{comment.content}</div>
                <div className='flex justify-between'>
                  <div className='text-black-500 flex gap-2.5 text-sm font-normal'>
                    {postType === '자유' && (
                      <button
                        className='flex items-center hover:underline'
                        onClick={() => {
                          if (replyOpenId !== comment.id) {
                            fetchReplies(comment.id);
                          }
                          setReplyOpenId(replyOpenId === comment.id ? null : comment.id);
                        }}
                      >
                        대댓글
                      </button>
                    )}
                    {comment.userId === userId && comment.content !== "사용자가 삭제한 댓글입니다." ? (
                      <button
                        className='flex items-center hover:underline'
                        onClick={() => {
                          setDeleteTargetId(comment.id);
                          setDeleteModalOpen(true);
                        }}
                      >
                        삭제
                      </button>
                    ) : (
                      comment.userId !== userId && comment.content !== "사용자가 삭제한 댓글입니다." && (
                        <button
                          className="flex items-center hover:underline"
                          onClick={() => {
                            setReportTargetId(comment.id);
                            setReportModalOpen(true);
                          }}
                        >
                          신고
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* 대댓글 입력창 */}
                {replyOpenId === comment.id && (
                  <TextInput
                    placeholder="대댓글을 입력하세요..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.currentTarget.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                        handleReplySubmit(comment.id);
                      }
                    }}
                    classNames={{
                      input:
                        "h-[40px] w-full flex-grow bg-[#FAFAFA] border-0 text-base rounded-none font-normal focus:ring-0 focus:outline-none ",
                    }}
                    className="flex-grow border-b border-gray-400"
                  />
                )}

                {/* 대댓글 목록 렌더링 */}
                {(replies[comment.id] || []).map(reply => (
                  <ReplyItem 
                    key={reply.id} 
                    reply={reply} 
                    nickname={nickname} 
                    postId={postId} 
                    onDelete={handleDelete} 
                    postAuthor={postAuthor}
                  />
                ))}
              </div>
            );
        })}
      </div>

      {/* ✅ 삭제 확인 모달 */}
      <TwoSelectModal
        isOpen={deleteModalOpen}
        message="댓글을 삭제하시겠습니까?"
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
        title="댓글 신고하기"
        confirmText="신고"
        options={REPORT_OPTIONS}
      />

    </div>
  );
}