import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to read URL parameters
import Card from "../../components/Card";
import MyPostsList from "../../components/profile/PostList";
import SearchIcon from "../../assets/images/ic_search_white.svg";
import CancelIcon from "../../assets/images/Cancle.svg";
import { getPopularBenefits } from "../../api/main"; 
import { searchBenefits } from "../../api/BenefitsService"

const Search = () => {
  const [visibleItems, setVisibleItems] = useState(6); 
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [searchResults, setSearchResults] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  const loadMore = () => {
    setVisibleItems(prev => prev + 4); 
  };

  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const query = queryParams.get('query'); 

  useEffect(() => {
    const fetchPopularBenefits = async () => {
      try {
        const data = await getPopularBenefits(); // Fetch popular benefits
        setPopularBenefits(data); // Update state
      } catch (error) {
        console.error("Error fetching popular benefits:", error);
      }
    };

    fetchPopularBenefits(); // Fetch data on component mount
  }, []);

  useEffect(() => {
    if (query) {
      setSearchTerm(query); // Set the search term from the query
      handleSearch(query); // Trigger search with the query
    }
  }, [query]);

  const handleSearch = async (term) => {
    setIsLoading(true); // Set loading state
    try {
      const results = await searchBenefits(term,9); // Fetch search results
      setSearchResults(results); // Update search results state
      setVisibleItems(results.length); // Show all results
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Filter benefits based on the search term
  const currentItems = searchResults.length > 0 ? searchResults : popularBenefits.slice(0, visibleItems);

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
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)} 
        />
        <img src={CancelIcon} alt="Cancel" className="w-6 h-6 mx-4 cursor-pointer" onClick={() => setSearchTerm('')} />
        <button
          className="flex items-center justify-center px-4 py-2 min-w-[94px] max-h-[40px] bg-yellow-700 text-black-50 rounded-[10px]"
          onClick={() => handleSearch(searchTerm)} 
        >
          <img src={SearchIcon} alt="Search" className="w-4 h-4 mr-2" />
          검색
        </button>
      </div>

      {/* 복지서비스 */}
      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl font-semibold">복지서비스</h2>
        {isLoading ? (
          <p>로딩 중...</p> 
        ) : (
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
        )}

        {/* 더보기 버튼 - 보여줄 항목이 더 있을 때만 표시 */}
        {visibleItems < searchResults.length && (
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
        {/*<MyPostsList posts={myPosts} />*/}
      </div>
    </div>
  );
};

export default Search;
