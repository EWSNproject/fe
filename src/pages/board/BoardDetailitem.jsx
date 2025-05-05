import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { List, FilePen, Clock2, Eye, ThumbsUp, ExternalLink, Bell } from "lucide-react";
import { recommendPost, cancelRecommendPost } from "../../api/postApi"; 

export default function BoardDetailitem({ item, userNickname }) {
  const navigate = useNavigate();
  const isAuthor = item.nickName === userNickname;
  const [recommended, setRecommended] = useState(item.recommended);
  const [recommendCnt, setRecommendCnt] = useState(item.recommendCnt);

  const handleRecommendClick = async () => {
    try {
      if (!recommended) {
        await recommendPost(item.postId);
        setRecommendCnt(prev => prev + 1);
        setRecommended(true);
      } else {
        await cancelRecommendPost(item.postId);
        setRecommendCnt(prev => prev - 1);
        setRecommended(false);
      }
    } catch (error) {
      console.error("추천 실패:", error);
    }
  };

  return (
    <div className='w-[1000px] mx-auto flex flex-col py-8 mt-8'>
      <div className='flex justify-between w-full mb-8 text-xl font-medium text-gray-400'>
        <div className='flex gap-1.5 cursor-pointer' onClick={() => navigate('/boardList')}>
            <span className='border-gray-400 border-[3px]'><List /></span>
            목록
        </div>
        <div>
          {isAuthor ? (
            <button className="gap-1.5 flex">
              <FilePen /> 수정하기
            </button>
          ) : (
            <button className="gap-1.5 flex">
              <Bell /> 신고하기
            </button>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-4 mb-5'>
        <h1 className='text-3xl'>{item.title}</h1>
        <div className='flex gap-5 text-xl text-black-300'>
            <span className='text-tag-green'>{item.nickName}</span>
            <div className='flex gap-[5px]'><Clock2 /><span>{item.createdAt.split('T')[0]}</span></div>
            <div className='flex gap-[5px]'><Eye /><span>{item.viewCnt}</span></div>
        </div>
      </div>
  
      <div className='mb-16 text-xl font-light'>
        {item.content}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {item.tags
          ?.split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0) 
          .map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm rounded-full bg-black-100 text-black-500"
            >
              #{tag}
            </span>
          ))}
      </div>

      <div className='flex justify-center gap-4 text-xl'>
      <button
        onClick={handleRecommendClick}
        className={`flex gap-1.5 px-5 py-2.5 rounded-full text-black-50 transition duration-150 
          active:scale-95 ${recommended ? "bg-yellow-700 font-bold" : "bg-black-400"}`}
      >
        <ThumbsUp /> {recommendCnt}
      </button>
      
        {item.uriTitle && (
        <a href={item.urlPath} target='_blank' rel='noopener noreferrer'>
            <button className='flex gap-1.5 px-5 py-2.5 rounded-full text-gray-400 bg-black-100'>
            {item.uriTitle} <ExternalLink />
            </button>
        </a>
        )}
      </div>
    </div>
  );
}