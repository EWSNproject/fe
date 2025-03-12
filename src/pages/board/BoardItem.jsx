import { useNavigate } from 'react-router-dom';

export default function BoardItem({ id, number, title, writer, date, views, type }) {
    const navigate = useNavigate(); 

    const handleCardClick = (id) => {
        navigate(`/board/${id}`); 
    };

    return (
      <div onClick={() => handleCardClick(id)} 
        className="h-[50px] flex bg-black-50 text-base font-medium border-gray-300 border-b-[0.5px] text-center hover:bg-gray-100 cursor-pointer">
        <p className="w-[70px] flex-col flex justify-center">{number}</p>
        <p className="w-[890px] text-left flex-col flex justify-center pl-3.5">{title}</p>
        <p className="w-[130px] flex-col flex justify-center">{writer}</p>
        <p className="w-[130px] flex-col flex justify-center">{date}</p>
        <p className="w-[80px] flex-col flex justify-center">{views}</p>
        <p className="w-[80px] flex-col flex justify-center">{type}</p>
      </div>
    );
}
