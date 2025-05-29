import  { useState, useEffect } from "react";
import Card from "../../components/Card";
import {
  getPopularBenefits,
  getMatchServices,
  getSearchHistory,
  getInterestUser,
} from "../../api/main";
import { getUserInfo } from "../../api/auth";
import { getsearchBenefits, getRecentService } from "../../api/BenefitsService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import InterestModal from "../../components/modal/InterestModal";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CurveLoading from '../../components/Loading/CurveLoading'; 

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCards, setCategoryCards] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [interestKeywords, setInterestKeywords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const categories = ["청년", "신혼부부", "장애인", "경력단절", "저소득층"];

  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    const currentUserId = Cookies.get("userId");
    const hasSeenInterestModal = Cookies.get("hasSeenInterestModal");

    if (accessToken && currentUserId && hasSeenInterestModal !== "true") {
      setIsModalOpen(true);
      Cookies.set("hasSeenInterestModal", "true", { expires: 1 });
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popular, recent, recentServices] = await Promise.all([
          getPopularBenefits(),
          accessToken ? getSearchHistory() : Promise.resolve([]),
          accessToken ? getRecentService() : Promise.resolve([]),
        ]);
        setPopularBenefits(popular);
        setRecentSearches(recent.slice(0, 5));
        setRecentServices(recentServices);
      } catch (error) {
        console.error("초기 데이터 로딩 오류:", error);
      }
    };
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const data = await getMatchServices();
        setCardData(data);
      } catch (error) {
        console.error("카드 데이터를 가져오는 데 실패했습니다.", error);
      }
    };
    fetchCardData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("accessToken");
        const user = await getUserInfo(token);
        const interests = await getInterestUser();
        setUserInfo(user);
        const selected = [];
        Object.entries(interests).forEach(([category, items]) => {
          items.forEach((item) => {
            if (item.selected) selected.push(item.name);
          });
        });
        setInterestKeywords(selected);
      } catch (error) {
        console.error("맞춤 정보 불러오기 실패:", error);
      }
    };
    if (accessToken) fetchUserData();
  }, [accessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % popularBenefits.length);
      setRecentIndex((prev) => (prev + 1) % recentServices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [popularBenefits.length, recentServices.length]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryClick = async (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setCategoryCards([]); 
      return; 
    }

    setSelectedCategory(category);
    setIsLoading(true);

    try {
      const data = await getsearchBenefits(category, 6);
      setCategoryCards(data.content);
    } catch (err) {
      console.error("카테고리 검색 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };


  return (
    <div className="flex flex-col items-center justify-center w-full lg:px-4 md:px-1">
      <InterestModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />

      {/* 🔍 빠른 복지 서비스 검색 */}
      <div className="w-full max-w-[1236px] mt-12 items-center flex flex-col">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">🔍 빠른 복지 서비스 검색</h2>
        <ul className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-2 rounded-full border text-sm transition duration-200 cursor-pointer shadow-sm ${
                selectedCategory === category
                  ? "bg-yellow-400 border-yellow-500 font-semibold shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100 hover:shadow-sm"
              }`}
            >
              #{category}
            </li>
          ))}
        </ul>
        {isLoading ? (
          <CurveLoading size={40}/>
        ) : (
          categoryCards.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-3 gap-6 md:grid-cols-1">
                {(isMobile ? categoryCards.slice(0, 3) : categoryCards).map((card) => (
                  <div key={card.publicServiceId} className="transition-transform hover:scale-[1.03] hover:shadow-lg border border-gray-200 rounded-xl p-1">
                    <Card data={{
                      id: card.publicServiceId,
                      title: card.serviceName,
                      description: card.summaryPurpose,
                      category: card.serviceCategory,
                      specialGroup: card.specialGroup,
                      familyType: card.familyType,
                      isBookmarked: card.bookmarked,
                    }} />
                  </div>
                ))}
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* 🔥 인기 복지 & 최근 본 서비스 */}
      {popularBenefits.length > 0 && (
        <div className="w-full max-w-[1236px] mt-8 mb-5 mx-auto flex md:flex-col flex-row gap-4">
          <div className="flex-1 bg-yellow-100 border border-yellow-300 rounded-xl shadow-inner px-6 py-5 h-[64px] flex items-center gap-4 overflow-hidden relative">
            <span className="text-base font-bold text-yellow-900 whitespace-nowrap">🔥 인기 복지 혜택</span>
            <div className="relative flex-1 overflow-hidden h-[28px]">
              <div className="absolute transition-all duration-500" style={{ top: `-${currentIndex * 28}px` }}>
                {popularBenefits.slice(0, 10).map((item) => (
                  <div 
                  key={item.publicServiceId} 
                  className="h-[28px] leading-[28px] text-yellow-900 font-medium cursor-pointer hover:underline 
                              overflow-hidden whitespace-nowrap text-ellipsis"
                  onClick={() => navigate(`/benefitsList/${item.publicServiceId}`)}
                  title={item.serviceName}
                >
                  #{item.serviceName}
                </div>
                ))}
              </div>
            </div>
          </div>

          {recentServices.length > 0 && (
            <div className="flex-1 bg-yellow-100 border border-yellow-300 rounded-xl shadow-inner px-6 py-5 h-[64px] flex items-center gap-4 overflow-hidden relative">
              <span className="text-base font-bold text-yellow-900 whitespace-nowrap">🕘 최근 본 서비스</span>
              <div className="relative flex-1 overflow-hidden h-[28px]">
                <div className="absolute transition-all duration-500" style={{ top: `-${recentIndex * 28}px` }}>
                  {recentServices.slice(0, 10).map((item) => (
                    <div 
                      key={item.publicServiceId} 
                      className="h-[28px] leading-[28px] text-yellow-900 font-medium cursor-pointer hover:underline 
                                  overflow-hidden whitespace-nowrap text-ellipsis"
                      onClick={() => navigate(`/benefitsList/${item.publicServiceId}`)}
                      title={item.serviceName}
                    >
                      #{item.serviceName}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {/* ✨ 맞춤 복지 추천 */}
      {cardData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-[1236px] mb-16 "
        >
          <div className="px-10 py-16 shadow-xl bg-gradient-to-r from-yellow-300 via-white to-green-200 rounded-2xl">
            <h2 className="mb-2 text-3xl font-extrabold text-yellow-900 ">
              ✨ 혜택온 맞춤 복지 추천
            </h2>
            <p className="mb-4 text-lg text-gray-700 ">
              관심 키워드, 회원정보, 검색어 기반으로 당신에게 꼭 맞는 복지
              서비스를 추천해드려요!
            </p>

            {/* Recent Searches */}
            {(recentSearches.length > 0 ||
              (userInfo && interestKeywords.length > 0)) && (
              <div className="flex flex-row gap-4 mb-8 md:flex-col">
                {/* 최근 검색어 */}
                {recentSearches.length > 0 && (
                  <div className="flex-1 p-5 border border-yellow-300 shadow-inner bg-yellow-100/60 backdrop-blur-sm rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl text-yellow-700">🕐</span>
                      <p className="text-lg font-semibold text-yellow-900">
                        최근 검색어
                      </p>
                    </div>
                    {recentSearches.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((search) => (
                          <button
                            key={search.id}
                            onClick={() => navigate(`/search?query=${encodeURIComponent(search.searchTerm)}`)}
                            className="px-3 py-1 text-sm font-medium text-yellow-900 transition bg-white border border-yellow-700 rounded-full shadow-sm hover:bg-yellow-100"
                          >
                            #{search.searchTerm}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 관심 키워드 */}
                {userInfo && interestKeywords.length > 0 && (
                  <div className="flex-1 p-5 border border-green-200 shadow-inner bg-green-70 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl text-yellow-700">💡</span>
                      <p className="text-lg font-semibold text-yellow-900">
                        관심 키워드 & 회원정보
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {interestKeywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium text-green-900 bg-white border border-green-300 rounded-full shadow-sm"
                        >
                          #{keyword}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 mb-3">
                      {/* 출생연도 */}
                      {userInfo.birthAt && (
                        <span className="px-3 py-1 text-sm font-medium text-green-900 bg-white border border-green-300 rounded-full shadow-sm ">
                          {userInfo.birthAt.slice(0, 4)}년생
                        </span>
                      )}

                      {/* 지역 */}
                      {userInfo.city && userInfo.state && (
                        <span className="px-3 py-1 text-sm font-medium text-green-900 bg-white border border-green-300 rounded-full shadow-sm ">
                          {userInfo.city} {userInfo.state}
                        </span>
                      )}

                      {/* 직업 */}
                      {userInfo.job && (
                        <span className="px-3 py-1 text-sm font-medium text-green-900 bg-white border border-green-300 rounded-full shadow-sm">
                          {userInfo.job}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Slider */}
            <Slider {...settings}>
              {cardData.map((card) => (
                <div key={card.publicServiceId}>
                  <div className="transition-transform rounded-xl">
                    <Card
                      data={{
                        id: card.publicServiceId,
                        title: card.serviceName,
                        description: card.summaryPurpose,
                        category: card.serviceCategory,
                        specialGroup: card.specialGroup,
                        familyType: card.familyType,
                        isBookmarked: card.bookmarked,
                      }}
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      ) : (
        <div className="w-full max-w-[1236px] mb-8 mt-8 text-center">
          <div className="px-6 py-10 shadow-md bg-gradient-to-r to-green-100 via-white from-yellow-100 rounded-2xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              현재 맞춤 복지 서비스가 없습니다.
            </h2>
            <p className="mb-6 text-gray-600">
              회원가입을 통해 관심 있는 서비스를 추천 받으세요!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
