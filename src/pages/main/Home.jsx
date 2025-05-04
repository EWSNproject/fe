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
  const [popularBenefits, setPopularBenefits] = useState([]); // 인기 혜택 상태 추가
  const [cardData, setCardData] = useState([]); // 카드 데이터를 저장할 상태

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const currentUserId = Cookies.get('userId'); // 현재 로그인한 사용자의 ID
    const lastSeenModalUserId = Cookies.get('lastSeenModalUserId'); // 마지막으로 모달을 본 사용자의 ID

    // 로그인 상태이고, 현재 사용자가 모달을 보지 않았거나 다른 사용자인 경우
    if (accessToken && currentUserId && currentUserId !== lastSeenModalUserId) {
      setIsModalOpen(true);
      // 현재 사용자 ID로 모달 표시 기록 업데이트
      Cookies.set('lastSeenModalUserId', currentUserId, { expires: 1 });
      Cookies.set('hasSeenInterestModal', 'true', { expires: 1 });
    }
  }, []);

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

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const data = await getMatchServices(); // API 호출
        setCardData(data); // 가져온 데이터 상태에 저장
      } catch (error) {
        console.error("카드 데이터를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchCardData(); // 데이터 가져오기
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <div className="flex flex-col items-center max-w-[1920px]  mx-auto">
      <InterestModal isOpen={isModalOpen} onRequestClose={closeModal} />

      <div className="bg-yellow-300 w-full  min-h-[400px] mb-8"></div> {/* 상단 배너 */}
      
      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl ">혜택온만의 맞춤서비스</h2>
        <Slider {...settings}>
          {cardData.map((card) => (
            <div key={card.publicServiceId}>
              <Card 
                data={{
                  id: card.publicServiceId,
                  title: card.serviceName,
                  description: card.summaryPurpose,
                  category: card.serviceCategory,
                  specialGroup: card.specialGroup,
                  familyType: card.familyType,
                  isBookmarked: card.bookmarked
                }} 
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl ">인기 혜택복지서비스</h2>
        <div className="grid grid-cols-3 gap-6">
          {popularBenefits.map((card) => (
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
      </div>
    </div>
  );
};

export default Home; 