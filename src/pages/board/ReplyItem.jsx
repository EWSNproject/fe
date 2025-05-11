import { CornerDownRight } from "lucide-react";

// 자유게시판을 택했을 경우, 대댓글 관련 코드
export default function ReplyItem({ reply, nickname }) {
  const formattedDate = new Date(reply.createdAt)
    .toISOString()
    .split("T")[0]
    .replace(/-/g, ".");

  const isAuthor = reply.nickname === nickname;

  return (
    <div className="flex w-full gap-2.5 mt-2">
      <CornerDownRight className="text-gray-300" />
      <div className="w-full bg-gray-100 rounded-xl py-3.5 px-5 gap-1.5">
        <div className="flex justify-between text-sm font-normal">
          <span className="text-tag-green">{reply.nickname || "알 수 없음"}</span>
          <span className="text-gray-400">{formattedDate}</span>
        </div>
        <div className="font-normal text-black-950">{reply.content}</div>
        <div className="flex justify-between">
          <div className="text-black-500 flex gap-2.5 text-sm font-normal">
            {isAuthor ? (
              <button className="flex items-center hover:underline">삭제</button>
            ) : (
              <button className="flex items-center hover:underline">신고</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
