import eggLevel from "../../assets/images/egg.svg";
import React, { useState } from "react";
import UserInfoModal from "./UserInfoModal";
import InterestModal from '../modal/InterestModal';

const UserInfoLevel = ({ user, nextLevel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openInterestModal = () => setIsInterestModalOpen(true);
  const closeInterestModal = () => setIsInterestModalOpen(false);

  return (
    <div className="flex gap-[80px] w-full max-w-[1224px]">
      {/* 회원정보 */}
      <div className="flex flex-col w-full max-w-[341px]">
        <span className="mb-5 text-2xl font-bold">회원정보</span>
        <div className="flex flex-col items-start gap-4 bg-white p-6 rounded-lg shadow-md min-h-[230px] bg-black-50">
          <div className="flex gap-[30px]">
            <div className="flex flex-col items-center">
              <img
                className="border-2 border-gray-300 rounded-full max-w-[100px] max-h-[100px]"
                src={eggLevel}
                alt="프로필 이미지"
              />
              <button
                onClick={openModal}
                className="px-4 py-2 mt-5 text-white transition bg-yellow-500 rounded hover:bg-yellow-600"
              >
                개인정보 수정
              </button>
              <button
                className="px-4 py-2 mt-3 w-full text-white transition bg-yellow-500 rounded hover:bg-yellow-600"
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
                  <span className="text-black-400">닉네임:</span>{" "}
                  {user.nickname}
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
      <div className="flex flex-col w-full max-w-[803px]">
        <span className="mb-5 text-2xl font-bold">회원등급</span>
        <div className="bg-black-50 p-6 rounded-lg shadow-md flex flex-row items-center gap-6 min-h-[260px]">
          <img
            className="max-w-[150px] max-h-[150px]"
            src={eggLevel}
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
                style={{ width: `${(user.points / user.remainPoint) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-end mt-2 text-sm">
              <span className="flex gap-1">
                {user.remainPoint}포인트 모으면{" "}
                <span className="text-yellow-800">{nextLevel}</span> 등급으로
                승급!
              </span>
            </div>
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
