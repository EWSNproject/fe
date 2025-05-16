import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BoardDetailitem from './BoardDetailitem';
import CommentItem from './CommentItem';
import AnswerItem from './AnswerItem';
import { getPostById } from '../../api/postApi';
import { getCommentsByPostId } from "../../api/commentApi";
import { getAnswersByPostId } from "../../api/answerApi";
import { getUserInfo } from '../../api/auth'; 
import Cookies from 'js-cookie'; 

export default function BoardDetail() {
  const { id } = useParams();  
  const [item, setItem] = useState(null);
  const [userNickname, setUserNickname] = useState(""); 
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(0);
  const [comments, setComments] = useState([]);

  const isQuestionBoard = item?.postType === "질문";

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const post = await getPostById(id);
        setItem(post);

        const token = Cookies.get("accessToken");
        if (token) {
          const user = await getUserInfo(token);
          setUserNickname(user.nickname); 
          setUserId(user.id); 
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndUser();
  }, [id])
  
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const post = await getPostById(id);
        setItem(post);

        const token = Cookies.get("accessToken");
        if (token) {
          const user = await getUserInfo(token);
          setUserNickname(user.nickname);
          setUserId(user.id);
        }

        const commentApi = post.postType === "질문" ? getAnswersByPostId : getCommentsByPostId;
        const res = await commentApi(id);
        setComments(res.content);
        setCommentCount(res.totalElements);
      } catch (error) {
        console.error("로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [id]);
  
  if (loading) return <div className='mt-20 text-center'>로딩 중...</div>;
  if (!item) return <div className='mt-20 text-center'>해당 게시글을 찾을 수 없습니다.</div>;

  return (
    <div className='w-full mb-10'>
      <BoardDetailitem item={item} userNickname={userNickname} postAuthorId={item.userId}/>
      <div className='w-[1000px] mx-auto flex flex-col gap-[30px]'>
      <span className='text-xl font-semibold'>댓글 ({commentCount})</span>
        {isQuestionBoard ? (
          <AnswerItem 
            postId={id} 
            answers={comments} 
            userId={userId}
            nickname={userNickname}
            setCommentCount={setCommentCount}
            setComments={setComments}
            postAuthor={item.nickName}
          />
        ) : (
          <CommentItem 
            postId={id} 
            comments={comments} 
            postType={item.postType}
            userId={userId}
            nickname={userNickname}
            setCommentCount={setCommentCount}
            setComments={setComments}
            postAuthor={item.nickName}
          />
        )}
      </div>
    </div>
  );
}