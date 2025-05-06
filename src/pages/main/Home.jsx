import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { getPopularBenefits, getMatchServices } from "../../api/main";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import InterestModal from "../../components/modal/InterestModal";
import Cookies from "js-cookie";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popularBenefits, setPopularBenefits] = useState([]);
  const [cardData, setCardData] = useState([]);

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

    fetchPopularBenefits();
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

      {cardData.length > 0 ? (
        <div className="w-full max-w-[1236px] mb-8 mt-8">
          <div className="bg-gradient-to-r to-green-100 via-white from-yellow-100 py-10 px-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              혜택온만의 맞춤 복지 서비스
            </h2>
            <p className="text-gray-600 mb-6">
              내 관심사와 상황에 꼭 맞는 복지 혜택만 쏙쏙 골라드립니다!
            </p>
            <Slider {...settings}>
              {cardData.map((card) => (
                <div key={card.publicServiceId}>
                  <div className="transition-transform hover:scale-[1.03] hover:shadow-lg">
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
        </div>
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

      <div className="w-full max-w-[1236px] mt-4 mb-8">
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
