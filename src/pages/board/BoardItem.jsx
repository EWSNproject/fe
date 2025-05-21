import { useNavigate } from 'react-router-dom';
import { Eye, ThumbsUp } from 'lucide-react';

export default function BoardItem({ id, number, title, writer, date, views, recommend, type }) {
    const navigate = useNavigate(); 

    const handleCardClick = (id) => {
        navigate(`/board/${id}`); 
    };

    return (
      <div onClick={() => handleCardClick(id)} 
        className="h-[50px] lg:min-h-[82px] lg:h-auto lg:flex-col flex justify-between bg-black-50 text-base font-medium border-gray-300 border-b-[0.5px] text-center hover:bg-gray-100 cursor-pointer lg:px-2.5 lg:py-[15px]">
        <div className='flex'>
          <p className="w-[70px] flex-col flex justify-center lg:hidden">{number}</p>
          <p className="lg:text-lg flex-1 text-left flex-col break-words w-full flex justify-center pl-3.5 lg:p-0">{title}</p>
        </div>
        <div className='flex lg:text-left lg:text-sm lg:gap-3'>
          <p className="w-[130px] flex-col flex justify-center lg:w-auto">{writer}</p>
          <p className="w-[130px] flex-col flex justify-center lg:w-auto">{date}</p>
          <p className="w-[80px] flex justify-center items-center gap-1 lg:w-auto">
            <Eye className="w-4 h-4 text-gray-500" /> {views}
          </p>
          <p className="w-[80px] flex justify-center items-center gap-1 lg:w-auto">
            <ThumbsUp className="w-4 h-4 text-red-500" /> {recommend}
          </p>
          <p className="w-[80px] flex-col flex justify-center lg:w-auto md:hidden">{type}</p>
        </div>
      </div>
    );
}
