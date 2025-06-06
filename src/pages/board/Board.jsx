import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput } from '@mantine/core';
import { FilePen } from "lucide-react";
import Search from "../../assets/images/ic_search.svg";
import BoardItem from "./BoardItem";
import Pagination from '../../components/Pagination';
import SortDropdown from '../../components/SortDropdown';
import { getPostsByType, searchPosts } from "../../api/postApi";
import { categoryMap, reverseCategoryMap } from "../../constants/postCategory";

export default function Boardlist() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("최신순");
  const sortOptions = ["최신순", "인기순", "조회수"];
  const itemsPerPage = 10;
  const [allPosts, setAllPosts] = useState([]);

  const fetchAllData = useCallback(async () => {
    const rawType = activeButton.replace('게시판', ''); 
    const postType = categoryMap[rawType] || 'ALL';    
    const fetchFn = searchTerm.trim() ? searchPosts : getPostsByType;
    let page = 0, all = [], hasNext = true;

    while (hasNext) {
      const data = searchTerm.trim()
        ? await fetchFn(searchTerm, page, 50)
        : await fetchFn({ postType, page, size: 50 });

      all.push(...data.content);
      hasNext = !data.last;
      page++;
    }
    setAllPosts(all);
  }, [activeButton, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
    fetchAllData();
  }, [fetchAllData]);

  const sortedPosts = [...allPosts].sort((a, b) => {
    if (selectedSort === "최신순") return new Date(b.createdAt) - new Date(a.createdAt);
    if (selectedSort === "조회수") return b.viewCnt - a.viewCnt;
    if (selectedSort === "인기순") return b.recommendCnt - a.recommendCnt;
    return 0;
  });

  const filteredPosts = sortedPosts.filter((item) => {
    const isCategoryMatch = activeButton === '전체' || item.postType === activeButton.replace('게시판', '');
    return isCategoryMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex justify-center w-full bg-black-50">
      <div className="mt-20 flex flex-col gap-[30px] w-[1280px] lg:w-full">
        <h1 className="text-4xl font-semibold text-center text-black-950">게시판</h1>

        <div className="flex justify-center">
          <div className="space-x-3 text-lg text-black-400">
            {['전체', '질문게시판', '자유게시판', '인사게시판'].map((buttonName) => (
              <button
                key={buttonName}
                className={`${activeButton === buttonName ? 'pb-2.5 border-b-4 border-yellow-700 text-black-950 font-medium' : ''}`}
                onClick={() => setActiveButton(buttonName)}
              >
                {buttonName}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-[30px] w-full px-10 md:px-4 lg:mt-[15px] md:mt-0">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex items-end gap-4 text-base font-medium text-black-500 md:w-full md:order-2">
              <div className="flex gap-1">
                <FilePen className="text-black-300"/>
                <p>총 게시물 <span className="text-tag-red">{filteredPosts.length}</span>건</p>
              </div>
              <p className="flex-col justify-end">현재 페이지 <span className="text-tag-red">{currentPage}/{totalPages}</span></p>
            </div>

            <div className="flex items-center gap-5 ml-auto md:w-full md:flex-wrap md:order-1">
              <div className="flex items-center w-[341px] md:w-full lg:flex-1 border rounded h-[40px] border-black-300 bg-black-50 border-r-0">
                <img src={Search} alt="검색" className="w-4 h-4 ml-2" />
                <TextInput
                  placeholder="제목검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchAllData()}
                  classNames={{
                    root: "ml-2 flex-1 mr-2",
                    input: "border-0 focus:ring-0 focus:border-0 hover:border-0 shadow-none outline-none",
                  }}
                />
                <button 
                  onClick={fetchAllData}
                  className="px-4 py-2 font-bold bg-yellow-700 rounded-r text-black-50 w-[94px]">
                  검색
                </button>
              </div>

              <div className="md:left">
                <SortDropdown
                  options={sortOptions}
                  selected={selectedSort}
                  setSelected={setSelectedSort}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className=" lg:hidden h-[60px] flex bg-yellow-200 text-lg font-medium border-black-300 border-x-0 border-2 text-center justify-between">
              <div className="flex">
                <p className="w-[70px] flex-col flex justify-center">번호</p>
                <p className="text-left flex-col flex justify-center pl-3.5">제목</p>
              </div>
              <div className="flex">
                <p className="w-[130px] flex-col flex justify-center">작성자</p>
                <p className="w-[130px] flex-col flex justify-center">작성일</p>
                <p className="w-[80px] flex-col flex justify-center">조회수</p>
                <p className="w-[80px] flex-col flex justify-center">추천수</p> 
                <p className="w-[80px] flex-col flex justify-center">종류</p>
              </div>
            </div>

            <div className="lg:w-full lg:border-black-300 lg:border-x-0 lg:border">
              {currentItems.map((item, idx) => (
                <BoardItem
                  key={item.postId}
                  id={item.postId}
                  number={filteredPosts.length - (startIndex + idx)}
                  title={item.title}
                  writer={item.nickName}
                  date={item.createdAt.split('T')[0]}
                  recommend={item.recommendCnt}
                  views={item.viewCnt}
                  type={reverseCategoryMap[item.postType] || item.postType}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-[15px]">
            <button
              onClick={() => navigate("/post")}
              className="w-[94px] h-[40px] text-base font-bold bg-yellow-900 text-black-50 rounded-xl transition-transform duration-200 hover:scale-105"
            >
              글쓰기
            </button>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            pageGroupSize={10}
          />
        </div>
      </div>
    </div>
  );
}