import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { List, FilePen, Clock2, Eye, ThumbsUp, ExternalLink, Bell } from "lucide-react";
import { recommendPost, cancelRecommendPost } from "../../api/postApi"; 
import ReportModal from "../../components/modal/ReportModal";
import { REPORT_OPTIONS } from "../../constants/reportOptions";
import { reportUser } from "../../api/reportApi";
import { toast } from "react-toastify";

export default function BoardDetailitem({ item, userNickname, postAuthorId }) {
  const navigate = useNavigate();
  const isAuthor = item.nickName === userNickname;
  const [recommended, setRecommended] = useState(item.recommended);
  const [recommendCnt, setRecommendCnt] = useState(item.recommendCnt);
  const [reportModalOpen, setReportModalOpen] = useState(false);

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

  const handleReportSubmit = ({ reason, detail }) => {
    if (!postAuthorId) {
      toast.error("신고 대상 사용자의 ID가 없습니다.");
      return;
    }

    reportUser({
      reportedUserId: postAuthorId,
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
      });
  };

  return (
    <div className='w-full max-w-[1000px] mx-auto flex flex-col py-6 px-4 mt-8 lg:mt-6'>
      <div className='flex justify-between w-full gap-3 mb-8 text-xl font-medium text-gray-400 md:mb-6 md:text-lg md:flex-row md:justify-between'>
        <div className='flex gap-1.5 cursor-pointer' onClick={() => navigate('/board')}>
            <span className='border-gray-400 border-[3px]'><List /></span>
            목록
        </div>
        <div>
          {isAuthor ? (
            <button className="gap-1.5 flex" onClick={() => navigate(`/postEdit/${item.postId}`)}>
              <FilePen /> 수정하기
            </button>
          ) : (
            <button className="gap-1.5 flex" onClick={() => setReportModalOpen(true)}>
              <Bell /> 신고하기
            </button>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-4 mb-5'>
        <h1 className='text-3xl'>{item.title}</h1>
        <div className='flex flex-wrap gap-5 text-xl text-black-300 md:gap-3 md:text-base'>
            <span className='text-tag-green'>{item.nickName}</span>
            <div className='flex gap-[5px]'><Clock2 /><span>{item.createdAt.split('T')[0]}</span></div>
            <div className='flex gap-[5px]'><Eye /><span>{item.viewCnt}</span></div>
        </div>
      </div>
  
      <div className='mb-10 text-xl font-light'>
        {item.content}
      </div>

      {item.images && item.images.length > 0 && (
        <div className="flex flex-wrap gap-2.5 lg:gap-2 mt-4">
          {item.images.slice(0, 5).map((img, index) => (
            <img
              key={img.imageId || index}
              src={img.imageUrl}
              alt={`이미지 ${index + 1}`}
              className="w-[120px] h-[120px] border rounded border-black-800 object-cover bg-black-50"
            />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
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

      <div className='flex items-center justify-center gap-4 text-xl lg:gap-3 lg:text-base md:flex-row md:mt-2'>
        <button
          onClick={handleRecommendClick}
          className={`flex gap-1.5 px-5 py-2.5 rounded-full text-black-50 transition duration-150 
            active:scale-95 ${recommended ? "bg-yellow-700 font-bold" : "bg-black-400"}`}
        >
          <ThumbsUp /> {recommendCnt}
        </button>
        
          {item.urlTitle && (
            <a href={item.urlPath} target='_blank' rel='noopener noreferrer'>
              <button className='flex gap-1.5 px-5 py-2.5 rounded-full text-gray-400 bg-black-100'>
                {item.urlTitle} <ExternalLink />
              </button>
            </a>
          )}
      </div>

      {/* ✅ 게시글 신고 모달 */}
      <ReportModal
        opened={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onConfirm={handleReportSubmit}
        title="게시글 신고하기"
        confirmText="신고"
        options={REPORT_OPTIONS}
      />

    </div>
  );
}