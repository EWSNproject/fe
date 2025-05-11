import { useState, useEffect } from 'react';
import { TextInput } from "@mantine/core";
import { postReply } from "../../api/commentApi"; 
import ReplyItem from "./ReplyItem";
import { postComment, deleteComment } from "../../api/commentApi";
import { getOtherUserInfo } from "../../api/auth";

// 자유&인사게시판을 택했을 경우, 댓글 관련 코드
export default function CommentItem({ postId, postType, comments, userId, nickname, setComments, setCommentCount }) {
  const [comment, setComment] = useState("");
  const [replyOpenId, setReplyOpenId] = useState(null); 
  const [replyText, setReplyText] = useState("");

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
      console.log("✅ 대댓글 등록 성공:", res);
      setReplyOpenId(null);
      setReplyText("");

      // ✅ 대댓글을 comments 상태에 바로 추가
      setComments(prev => [...prev, res]);

      setCommentCount(prev => prev + 1); // 선택사항
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
            ? { ...c, content: "삭제된 댓글입니다.", deleted: true }
            : c
        )
      );
    } catch (err) {
      console.error("❌ 댓글 삭제 실패:", err);
    }
  };

  useEffect(() => {
    const fetchMissingNicknames = async () => {
      const targets = comments.filter(c => !c.nickname?.trim());
      const uniqueIds = [...new Set(targets.map(c => c.userId))];

      for (const id of uniqueIds) {
        try {
          const user = await getOtherUserInfo(id);
          setComments(prev =>
            prev.map(c =>
              c.userId === id && !c.nickname?.trim()
                ? { ...c, nickname: user.nickname }
                : c
            )
          );
        } catch (err) {
          console.error(`닉네임 조회 실패: userId=${id}`, err);
        }
      }
    };

    fetchMissingNicknames();
  }, [comments, setComments]);

  return (
    <div className='flex flex-col gap-[30px]'>
      {/* 댓글 입력 UI */}
      <div className='flex items-end gap-5'>
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
          className={`font-semibold rounded px-4 h-[30px] text-sm text-black-50 transition 
            ${comment.trim() ? 'bg-yellow-700 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          저장
        </button>
      </div>
      
      {/* 댓글 목록 */}
      <div className='w-[1000px] mx-auto flex flex-col gap-1.5'>
        {comments
          .filter(comment => comment.parentId === null) 
          .map((comment) => {
            const date = new Date(comment.createdAt);
            const formattedDate = date.toISOString().split("T")[0].replace(/-/g, ".");

            return (
              <div
                key={comment.id}
                className='flex flex-col gap-1.5 py-3.5 px-5 border border-gray-200'
              >
                <div className='flex justify-between text-sm font-normal'>
                  <span className="text-tag-green">{comment.nickname || "알 수 없음"}</span>
                  <span className='text-gray-400'>{formattedDate}</span>
                </div>
                <div className='font-normal text-black-950'>{comment.content}</div>
                <div className='flex justify-between'>
                  <div className='text-black-500 flex gap-2.5 text-sm font-normal'>
                    {postType === '자유' && (
                      <button
                        className='flex items-center hover:underline'
                        onClick={() =>
                          setReplyOpenId(replyOpenId === comment.id ? null : comment.id) 
                        }
                      >
                        대댓글
                      </button>
                    )}
                    {comment.nickname === nickname ? (
                      <button
                        className='flex items-center hover:underline'
                        onClick={() => handleDelete(comment.id)}
                      >
                        삭제
                      </button>
                    ) : (
                      <button className='flex items-center hover:underline'>
                        신고
                      </button>
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
                {comments
                  .filter(reply => reply.parentId === comment.id)
                  .map(reply => (
                    <ReplyItem
                      key={reply.id}
                      reply={reply}
                      nickname={nickname}
                    />
                ))}
              </div>
            );
        })}
      </div>
    </div>
  );
}