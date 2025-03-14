import { useParams } from 'react-router-dom';

function BoardDetail() {
  const { id } = useParams();  

  return (
    <div>
      <h1>게시물 상세 페이지 - ID: {id}</h1>
      {/* 상세 게시물 정보 표시 */}
    </div>
  );
}

export default BoardDetail;
