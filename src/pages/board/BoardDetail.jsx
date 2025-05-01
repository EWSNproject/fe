import { useParams } from 'react-router-dom';
import BoardDetailitem from './BoardDetailitem';
import CommentItem from './CommentItem';
import { dummyBoardList } from './data';


export default function BoardDetail() {
  const { id } = useParams();  
  const item = dummyBoardList.find((el) => el.id === Number(id));

  if (!item) {
    return <div className='mt-20 text-center'>해당 게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className='w-full'>
      <BoardDetailitem item={item} />
      <CommentItem />
    </div>
  );
}