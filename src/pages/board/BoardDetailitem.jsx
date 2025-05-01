import { List, FilePen, Clock2, Eye, ThumbsUp, ExternalLink } from "lucide-react";
import { useNavigate } from 'react-router-dom';

export default function BoardDetailitem({ item }) {
  const navigate = useNavigate();

  return (
    <div className='w-[1000px] mx-auto flex flex-col py-8 mt-8'>
      <div className='flex justify-between w-full mb-8 text-xl font-medium text-gray-400'>
        <div className='flex gap-1.5 cursor-pointer' onClick={() => navigate('/boardList')}>
            <span className='border-gray-400 border-[3px]'><List /></span>
            목록
        </div>
        <div className='gap-1.5 flex'>
            <FilePen /> 수정하기
        </div>
      </div>

      <div className='flex flex-col gap-4 mb-5'>
        <h1 className='text-3xl'>{item.title}</h1>
        <div className='flex gap-5 text-xl text-black-300'>
            <span className='text-tag-green'>{item.author}</span>
            <div className='flex gap-[5px]'><Clock2 /><span>{item.date}</span></div>
            <div className='flex gap-[5px]'><Eye /><span>{item.views}</span></div>
        </div>
      </div>
  
      <div className='mb-16 text-xl font-light'>
        {item.content}
      </div>

      <div className='flex justify-center gap-4 text-xl'>
        <button className='flex gap-1.5 px-5 py-2.5 rounded-full text-black-50 bg-black-400'>
            <ThumbsUp /> {item.good}
        </button>

        {item.link && item.link.url && (
        <a href={item.link.url} target='_blank' rel='noopener noreferrer'>
            <button className='flex gap-1.5 px-5 py-2.5 rounded-full text-gray-400 bg-black-100'>
            {item.link.label} <ExternalLink />
            </button>
        </a>
        )}
      </div>
    </div>
  );
}