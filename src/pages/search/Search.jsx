import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import MyPostsList from "../../components/profile/PostList";
import { myPosts } from "../../pages/mypage/data";
import SearchIcon from "../../assets/images/ic_search_white.svg";
import CancelIcon from "../../assets/images/Cancle.svg"
import { getPopularBenefits } from "../../api/main"; // API 호출 추가

const Search = () => {
  const [visibleItems, setVisibleItems] = useState(6); // 초기에 보여줄 아이템 수
  const [popularBenefits, setPopularBenefits] = useState([]); // 인기 혜택 상태 추가

  const loadMore = () => {
    setVisibleItems(prev => prev + 4); // 더보기 클릭시 4개씩 추가
  };

  useEffect(() => {
    const fetchPopularBenefits = async () => {
      try {
        const data = await getPopularBenefits(); // API 호출
        setPopularBenefits(data); // 상태 업데이트
      } catch (error) {
        console.error("Error fetching popular benefits:", error);
      }
    };

    fetchPopularBenefits(); // 컴포넌트 마운트 시 데이터 가져오기
  }, []);

  // 현재 보여질 아이템들만 필터링
  const currentItems = popularBenefits.slice(0, visibleItems);

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
        <h2 className="mb-4 text-xl font-semibold">인기 혜택복지서비스</h2>
        <div className="grid grid-cols-3 gap-6">
          {currentItems.map((card) => (
            <Card key={card.publicServiceId} data={{
              id: card.publicServiceId,
              title: card.serviceName,
              description: card.summaryPurpose,
              category: card.serviceCategory,
              specialGroup: card.specialGroup,
              familyType: card.familyType,
              isBookmarked: card.bookmarked
            }} />
          ))}
        </div>

        {/* 더보기 버튼 - 보여줄 항목이 더 있을 때만 표시 */}
        {visibleItems < popularBenefits.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-gray-400 text-black-50 font-semibold py-2 px-4 min-w-[216px] min-h-[48px] rounded-[10px]"
            >
              더보기
            </button>
          </div>
        )}
      </div>

      {/* 게시판 */}
      <div className="w-full max-w-[1236px]">
        <h2 className="mb-4 text-xl font-semibold">게시판</h2>
        <MyPostsList posts={myPosts} />
      </div>
    </div>
  );
};

export default Search;
