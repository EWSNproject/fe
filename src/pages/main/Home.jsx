import React, { useState } from "react";
import Card from "../../components/Card";
import { cardData } from "../../data/cardData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import InterestModal from "./InterestModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // 모달 초기 상태

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
    <div className="flex flex-col items-center p-6 max-w-[1920px]  mx-auto">
      <InterestModal isOpen={isModalOpen} onRequestClose={closeModal} />

      <div className="bg-yellow-300 w-full  min-h-[400px] mb-8"></div> {/* 상단 배너 */}
      
      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl font-semibold">혜택온만의 맞춤서비스</h2>
        <Slider {...settings}>
          {cardData.slice(0, 6).map((card) => (
            <div key={card.id}>
              <Card data={card} />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full max-w-[1236px] mb-8">
        <h2 className="mb-4 text-xl font-semibold">인기 혜택복지서비스</h2>
        <div className="grid grid-cols-3 gap-6">
          {cardData.slice(6,12).map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 