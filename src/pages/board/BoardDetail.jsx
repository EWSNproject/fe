import { List, FilePen, Clock2, Eye, ThumbsUp, ExternalLink } from "lucide-react";

function BoardDetail() {

  return (
    <div className='w-full'>
      <div className='w-[1000px] mx-auto flex flex-col py-8 mt-8'>
        <div className='flex justify-between w-full mb-8 text-xl font-medium text-gray-400'>
          <div className='flex gap-1.5'>
            <span className='border-gray-400 border-[3px]'><List /></span>
            목록
          </div>
          <div className='gap-1.5 flex'>
            <FilePen /> 수정하기
          </div>
        </div>

        <div className='flex flex-col gap-4 mb-5'>
          <h1 className='text-3xl'>성북구에 사는데 문화관련된 복지가 더 많이 있으면 좋겠네요.</h1>
          <div className='flex gap-5 text-xl text-black-300'>
            <span className='text-tag-green'>채택이</span>
            <div className='flex gap-[5px]'><Clock2 /><span>2025.02.03</span></div>
            <div className='flex gap-[5px]'><Eye /><span>19</span></div>
          </div>
        </div>
      
        <div className='mb-16 text-xl font-light'>
          안녕하세요. 이번에 성북구로 이사왔는데 문화관련된 복지가 없는것 같아서요.
          저는 20대여서 문화생활 관심있는 사람있으면 추천받고 싶어요.
        </div>

        <div className='flex justify-center gap-4 text-xl'>
          <button className='flex gap-1.5 px-5 py-2.5 rounded-full text-black-50 bg-black-400'><ThumbsUp /> 9 </button>
          <button className='flex gap-1.5 px-5 py-2.5 rounded-full text-gray-400 bg-black-100'>문화 생활<ExternalLink/></button>
        </div>
        
      </div>
    </div>
  );
}

export default BoardDetail;
