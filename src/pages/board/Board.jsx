import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from '@mantine/core';
import { FilePen } from "lucide-react";
import Search from "../../assets/images/ic_search.svg";
import BoardItem from "./BoardItem";
import Pagination from '../../components/Pagination';
import SortDropdown from '../../components/SortDropdown';
import { getPostsByType } from "../../api/postApi";

export default function Boardlist() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const sortOptions = ["최신순", "인기순", "조회수"];
  const itemsPerPage = 10;
  const [postList, setPostList] = useState([]); 
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedBoardList = [...postList].sort((a, b) => {
    if (selectedSort === "최신순") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (selectedSort === "조회수") {
      return b.viewCnt - a.viewCnt;
    } else if (selectedSort === "인기순"){
      return b.recommendCnt - a.recommendCnt;
    }
    return 0; 
  });
  
  const filteredBoardList = sortedBoardList.filter((item) => {
    const isCategoryMatch = activeButton === '전체' || item.postType === activeButton.replace('게시판', '');
    const isSearchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return isCategoryMatch && isSearchMatch;
  });  

  useEffect(() => {
    const fetchData = async () => {
      const postType = activeButton === '전체' ? '전체' : activeButton.replace('게시판', '');
      try {
        const data = await getPostsByType({
          postType,
          page: currentPage - 1,
          size: itemsPerPage
        });
        setPostList(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
      }
    };

    fetchData();
  }, [activeButton, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredBoardList;

  return (
    <div className="flex justify-center bg-black-50">
      <div className="mt-20 flex flex-col gap-[30px]">
        <h1 className="text-4xl font-semibold text-center text-black-950">게시판</h1>

        {/* 게시판 종류 */}
        <div className="flex justify-center">
          <div className="space-x-3 text-lg text-black-400">
            {['전체', '질문게시판', '자유게시판', '인사게시판'].map((buttonName) => (
              <button
                key={buttonName}
                className={`${activeButton === buttonName ? 'pb-2.5 border-b-4 border-yellow-700 text-black-950 font-medium' : ''}`}
                onClick={() => handleButtonClick(buttonName)}
              >
                {buttonName}
              </button>
            ))}
          </div>
        </div>

        {/* 상단 정보 및 검색 */}
        <div className="mt-[30px] w-[1380px]">
          <div className="flex justify-between">
            <div className="flex items-end gap-4 text-base font-medium text-black-500">
              <div className="flex gap-1">
                <FilePen className="text-black-300"/>
                <p>총 게시물 <span className="text-tag-red">{totalElements}</span>건</p>
              </div>
              <p className="flex-col justify-end">현재 페이지 <span className="text-tag-red">{currentPage}/{totalPages}</span></p>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center border rounded h-[40px] border-black-300 bg-black-50 border-r-0">
                <img src={Search} alt="검색" className="w-4 h-4 ml-2" />
                <TextInput
                  placeholder="검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  classNames={{
                    root: "ml-2 flex-1 mr-2",
                    input: "border-0 focus:ring-0 focus:border-0 hover:border-0 shadow-none outline-none",
                  }}
                />
                <button className="px-4 py-2 font-bold bg-yellow-700 rounded-r text-black-50 w-[94px]">
                  검색
                </button>
              </div>
              {/* 정렬 드롭다운 */}
              <SortDropdown
                options={sortOptions}
                selected={selectedSort}
                setSelected={setSelectedSort}
              />
            </div>
          </div>

          {/* 게시판글 시작부분 */}
          <div className="mt-5">
            <div className="h-[60px] flex bg-yellow-200 text-lg font-medium border-black-300 border-x-0 border-2 text-center justify-between">
              <div className="flex">
                <p className="w-[70px] flex-col flex justify-center">번호</p>
                <p className="w-[890px] text-left flex-col flex justify-center pl-3.5">제목</p>
              </div>
              <div className="flex">
                <p className="w-[130px] flex-col flex justify-center">작성자</p>
                <p className="w-[130px] flex-col flex justify-center">작성일</p>
                <p className="w-[80px] flex-col flex justify-center">조회수</p>
                <p className="w-[80px] flex-col flex justify-center">종류</p>
              </div>
            </div>

            {currentItems.map((item, idx) => (
              <BoardItem
                key={item.postId}
                id={item.postId}
                number={totalElements - (startIndex + idx)}
                title={item.title}
                writer={item.nickName}
                date={item.createdAt.split('T')[0]}
                views={item.viewCnt}
                type={item.postType}
              />
            ))}
          </div>

          <div className="flex justify-end text-center mt-[15px]">
            <button onClick={() => navigate("/post")} 
            className="w-[94px] h-[40px] text-base font-bold bg-yellow-900 text-black-50 rounded-xl transition-transform duration-200 transform hover:scale-105">글쓰기</button>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageGroupSize={10}
          />
        </div>
      </div>
    </div>
  );
}