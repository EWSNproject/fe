import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import {
  getPopularBenefits,
  getMatchServices,
  getSearchHistory,
} from "../../api/main";
import { searchBenefits } from "../../api/BenefitsService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import InterestModal from "../../components/modal/InterestModal";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [cardData, setCardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryCards, setCategoryCards] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const categories = ["청년", "신혼부부", "장애인", "경력단절", "저소득층"];

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const currentUserId = Cookies.get("userId");
    const hasSeenInterestModal = Cookies.get("hasSeenInterestModal");

    if (accessToken && currentUserId && hasSeenInterestModal !== "true") {
      setIsModalOpen(true);
      Cookies.set("hasSeenInterestModal", "true", { expires: 1 });
    }
  }, []);

  useEffect(() => {
    const fetchPopularBenefits = async () => {
      try {
        const data = await getPopularBenefits();
        setPopularBenefits(data);
      } catch (error) {
        console.error("Error fetching popular benefits:", error);
      }
    };

    const fetchRecentSearches = async () => {
      try {
        const data = await getSearchHistory();
        setRecentSearches(data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchPopularBenefits();
    fetchRecentSearches();
  }, []);

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

  const closeModal = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    try {
      const data = await searchBenefits(category, 6);
      setCategoryCards(data);
    } catch (err) {
      console.error("카테고리 검색 실패:", err);
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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center min-w-[2000px] w-full">
      <InterestModal isOpen={isModalOpen} onRequestClose={closeModal} />

      {/* 카테고리 필터 섹션 */}
      <div className="w-full max-w-[1236px] mt-12 items-center flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🔍 빠른 복지 서비스 검색
        </h2>
        <ul className="flex gap-3 flex-wrap mb-6 justify-center">
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-2 rounded-full border text-sm transition duration-200 cursor-pointer shadow-sm
                ${
                  selectedCategory === category
                    ? "bg-yellow-400 border-yellow-500 font-semibold shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-100 hover:shadow-sm"
                }`}
            >
              #{category}
            </li>
          ))}
        </ul>

        {categoryCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-3 gap-6">
              {categoryCards.map((card) => (
                <div
                  key={card.publicServiceId}
                  className="transition-transform hover:scale-[1.03] hover:shadow-lg border border-gray-200 rounded-xl p-1"
                >
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
              ))}
            </div>
          </motion.div>
        )}
      </div>
      {/* 맞춤 복지 추천 섹션 */}
      {cardData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full max-w-[1236px] mb-16 mt-12"
        >
          <div className="bg-gradient-to-r from-yellow-300 via-white to-green-200 py-16 px-10 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-extrabold text-yellow-900 mb-2 ">
              ✨ 혜택온 맞춤 복지 추천
            </h2>
            <p className="text-lg text-gray-700 mb-4 ">
              관심 키워드, 회원정보, 검색어 기반으로 당신에게 꼭 맞는 복지
              서비스를 추천해드려요!
            </p>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="bg-yellow-100/60 backdrop-blur-sm p-5 rounded-xl mb-8 border border-yellow-300 shadow-inner">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-yellow-700 text-xl">🕐</span>
                  <p className="text-xl font-semibold text-yellow-900">
                    최근 검색어
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {recentSearches.map((search) => (
                    <span
                      key={search.id}
                      className="bg-yellow-300 text-yellow-900 px-4 py-2 rounded-full text-base font-medium transition hover:bg-yellow-400 hover:shadow-md"
                    >
                      #{search.searchTerm}
                    </span>
                  ))}
                </div>
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
          <div className="bg-gradient-to-r to-green-100 via-white from-yellow-100 py-10 px-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              현재 맞춤 복지 서비스가 없습니다.
            </h2>
            <p className="text-gray-600 mb-6">
              회원가입을 통해 관심 있는 서비스를 추천 받으세요!
            </p>
          </div>
        </div>
      )}

      {/* 인기 서비스 섹션 */}
      <div className="w-full max-w-[1236px] mt-12 mb-8">
        <h2 className="mb-4 text-2xl font-bold">인기 혜택복지서비스</h2>
        <div className="grid grid-cols-3 gap-6">
          {popularBenefits.map((card) => (
            <div
              key={card.publicServiceId}
              className="transition-transform hover:scale-[1.03] hover:shadow-md"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
