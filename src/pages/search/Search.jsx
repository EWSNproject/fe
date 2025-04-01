import React, { useState } from "react";
import Card from "../../components/Card";
import MyPostsList from "../../components/profile/PostList";
import Pagination from "../../components/Pagination";
import { cardData } from "../../data/cardData";
import { myPosts } from "../../pages/mypage/data";
import SearchIcon from "../../assets/images/ic_search_white.svg";
import CancelIcon from "../../assets/images/Cancle.svg"

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  // 현재 페이지에 해당하는 카드 데이터만 필터링
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cardData.slice(startIndex, endIndex);
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-[1680px] mx-auto">
      <h1 className="text-[32px] font-bold mb-6">통합검색</h1>

      {/* 검색 입력 */}
      <div
        className="flex items-center w-full rounded-[10px] min-h-[72px] max-w-[1180px] mb-8 border"
        style={{ backgroundColor: '#FAFAFA' }}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="flex-1 px-4 py-2 max-w-[1008px] max-h-[24px]"
          style={{ backgroundColor: '#FAFAFA' }}
        />
        <img src={CancelIcon} alt="Cancel" className="w-6 h-6 mx-4 cursor-pointer" />
        <button className="flex items-center justify-center px-4 py-2 min-w-[94px] max-h-[40px] bg-yellow-700 text-black-50 rounded-[10px]">
          <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" />
          검색
        </button>
      </div>

      {/* 인기 복지서비스 */}
      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="text-xl font-semibold mb-4">인기 혜택복지서비스</h2>
        <div className="grid grid-cols-3 gap-6">
          {getCurrentPageData().map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              pageGroupSize={5}
            />
          </div>
        )}
      </div>

      {/* 게시판 */}
      <div className="w-full max-w-[1236px]">
        <h2 className="text-xl font-semibold mb-4">게시판</h2>
        <MyPostsList posts={myPosts} />
      </div>
    </div>
  );
};

export default Search;
