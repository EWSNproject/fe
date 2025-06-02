import questionMark from "../../assets/images/questionMark.svg";
import eggLevel from "../../assets/images/egg.svg";
import chick from "../../assets/images/chick.svg";
import chicken from "../../assets/images/chicken.svg";
import eagle from "../../assets/images/eagle.svg";
import cloud from "../../assets/images/cloud.svg";
import React, { useState, useEffect } from "react";
import UserInfoModal from "./UserInfoModal";
import InterestModal from "../modal/InterestModal";

const UserInfoLevel = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [levelImage, setLevelImage] = useState(questionMark);

  const levels = ["물음표", "알", "병아리", "닭", "독수리", "구름"];
  const levelRanges = {
    "물음표": [0, 100],
    "알": [100, 300],
    "병아리": [300, 500],
    "닭": [500, 700],
    "독수리": [700, 1000],
    "구름": [1000, 1500],
  };

  const getNextLevel = (currentLevel) => {
    const currentIndex = levels.indexOf(currentLevel);
    return currentIndex !== -1 && currentIndex < levels.length - 1
      ? levels[currentIndex + 1]
      : null;
  };

  const getLevelProgress = () => {
    const [min, max] = levelRanges[user.levelName] || [0, 1];
    const progress = ((user.point - min) / (max - min)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const nextLevel = getNextLevel(user.levelName);

  useEffect(() => {
    const points = user.point;
    if (points < 100) {
      setLevelImage(questionMark);
    } else if (points < 300) {
      setLevelImage(eggLevel);
    } else if (points < 500) {
      setLevelImage(chick);
    } else if (points < 700) {
      setLevelImage(chicken);
    } else if (points < 1000) {
      setLevelImage(eagle);
    } else {
      setLevelImage(cloud);
    }
  }, [user.point]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openInterestModal = () => setIsInterestModalOpen(true);
  const closeInterestModal = () => setIsInterestModalOpen(false);

  return (
    <div className="flex flex-row md:flex-col gap-[80px] w-full max-w-[1224px]">
      {/* 회원정보 */}
      <div className="flex flex-col w-full max-w-[341px] md:max-w-full">
        <span className="mb-5 text-2xl font-bold">회원정보</span>
        <div className="flex flex-col items-start gap-4 p-6 rounded-lg shadow-md min-h-[230px] bg-black-50">
          <div className="flex gap-[30px]">
            <div className="flex flex-col items-center">
              <img
                className="border-2 border-gray-300 rounded-full max-w-[100px] max-h-[100px]"
                src={levelImage}
                alt="프로필 이미지"
              />
              <button
                onClick={openModal}
                className="px-4 py-2 mt-5 transition bg-yellow-500 rounded hover:bg-yellow-600"
              >
                개인정보 수정
              </button>
              <button
                className="w-full px-4 py-2 mt-3 transition bg-yellow-500 rounded hover:bg-yellow-600"
                onClick={openInterestModal}
              >
                키워드 수정
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-7">
              <div>
                <p className="text-sm text-black-400">환영합니다</p>
                <h3 className="text-xl font-bold">{user.name} 님</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1 text-sm">
                  <span className="text-black-400">닉네임:</span> {user.nickname}
                </div>
                <div className="flex gap-1 text-sm">
                  <span className="text-black-400">나이:</span> {user.age}
                </div>
                <div className="flex gap-1 text-sm">
                  <span className="text-black-400">지역:</span> {user.cityState}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회원등급 */}
      <div className="flex flex-col w-full max-w-[803px] md:max-w-full">
        <span className="mb-5 text-2xl font-bold">회원등급</span>
        <div className="bg-black-50 p-6 rounded-lg shadow-md flex flex-row items-center gap-6 min-h-[260px]">
          <img
            className="max-w-[150px] max-h-[150px]"
            src={levelImage}
            alt="회원 등급"
          />
          <div className="flex flex-col w-full">
            <p>{user.name}님의 등급은</p>
            <div className="flex gap-1">
              <p className="font-bold">{user.levelName}</p> 단계입니다.
            </div>
            <div className="w-full bg-yellow-400 rounded-full h-2.5 mt-4">
              <div
                className="bg-yellow-700 h-2.5 rounded-full"
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
            {nextLevel && (
              <div className="flex justify-end mt-2 text-sm">
                <div className="flex flex-row flex-wrap items-center w-full max-w-full gap-1 break-keep">
                  <span>{user.remainPoint}포인트 모으면</span>
                  <span className="text-yellow-800">{nextLevel}</span>
                  <span>등급으로 승급!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <UserInfoModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        user={user}
      />
      <InterestModal
        isOpen={isInterestModalOpen}
        onRequestClose={closeInterestModal}
        categorizedInterests={user.categorizedInterests}
      />
    </div>
  );
};

export default UserInfoLevel;
