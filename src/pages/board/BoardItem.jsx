import { useNavigate } from 'react-router-dom';
import { Eye, ThumbsUp } from 'lucide-react';

export default function BoardItem({ id, number, title, writer, date, views, recommend, type }) {
    const navigate = useNavigate(); 

    const handleCardClick = (id) => {
        navigate(`/board/${id}`); 
    };

    return (
      <div onClick={() => handleCardClick(id)} 
        className="h-[50px] flex justify-between bg-black-50 text-base font-medium border-gray-300 border-b-[0.5px] text-center hover:bg-gray-100 cursor-pointer">
        <div className='flex'>
          <p className="w-[70px] flex-col flex justify-center">{number}</p>
          <p className="text-left flex-col flex justify-center pl-3.5">{title}</p>
        </div>
        <div className='flex'>
          <p className="w-[130px] flex-col flex justify-center">{writer}</p>
          <p className="w-[130px] flex-col flex justify-center">{date}</p>
          <p className="w-[80px] flex justify-center items-center gap-1">
            <Eye className="w-4 h-4 text-gray-500" /> {views}
          </p>
          <p className="w-[80px] flex justify-center items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-red-500" /> {recommend}
          </p>
          <p className="w-[80px] flex-col flex justify-center">{type}</p>
        </div>
      </div>
    );
}
