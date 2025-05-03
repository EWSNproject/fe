import { ThumbsUp, Check } from "lucide-react";

export default function CommentItem({ postType }) {
  return(
  <div className='w-[1000px] mx-auto flex flex-col gap-1.5 py-3.5 px-5 border border-gray-200'>
    <div className='flex justify-between text-sm font-normal'>
      <span className='text-tag-green'>채택이(글쓴이)</span>
      <span className='text-gray-400'>2025.02.03</span>
    </div>
    <div className='font-normal text-black-950'>많은 관심과 댓글 부탁드려요ㅜㅜ</div>
    <div className='flex justify-between'>
      <div className='text-black-500 flex gap-2.5 text-sm font-normal'>
        <span className='flex items-center gap-1 text-tag-orange'>
          <ThumbsUp strokeWidth={1.5} size={18} className="relative mb-[1px]"/> 1
        </span>
        <button className='flex items-center gap-1 hover:underline'>
          <ThumbsUp strokeWidth={1.5} size={18} className="relative mb-[1px]"/> 공감
        </button>
        {postType === '자유' && (
            <button className='flex items-center hover:underline'>대댓글</button>
          )}
        <button className='flex items-center hover:underline'>삭제</button>
      </div>
      {postType === '질문' && (
          <button className='flex px-2 border-4 rounded-full hover:bg-tag-blue hover:text-black-50 border-tag-blue text-tag-blue'>
            채택 <Check size={16} className="mt-[3px]" />
          </button>
      )}
    </div>
  </div>
  )
}