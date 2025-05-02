import { useParams } from 'react-router-dom';
import BoardDetailitem from './BoardDetailitem';
import CommentItem from './CommentItem';
import { TextInput } from "@mantine/core";
import { dummyBoardList } from './data';


export default function BoardDetail() {
  const { id } = useParams();  
  const item = dummyBoardList.find((el) => el.postId === Number(id));

  if (!item) {
    return <div className='mt-20 text-center'>해당 게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className='w-full'>
      <BoardDetailitem item={item} />
      <div className='w-[1000px] mx-auto flex flex-col gap-[30px]'>
        <span className='text-xl font-semibold'>댓글 (3)</span>
        <div className='flex items-end gap-5'>
          <span className='flex items-center justify-center w-10 h-10 text-xl font-semibold text-yellow-800 bg-yellow-400 rounded-full'>
            채
          </span>
          <TextInput
              placeholder="댓글추가..."
              classNames={{
                input: "h-[40px] w-full flex-grow bg-[#FAFAFA] border-0 text-base rounded-none font-normal focus:ring-0 focus:outline-none ",
              }}
              className="flex-grow border-b border-gray-400"
            />
          <button className='font-semibold rounded px-4 h-[30px] text-sm bg-gray-300 text-black-50'>
            저장
          </button>
        </div>
        <CommentItem postType={item.postType}/>
      </div>
    </div>
  );
}