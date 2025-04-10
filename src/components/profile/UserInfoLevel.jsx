import React, { useState } from "react";
import eggLevel from "../../assets/images/egg.svg";
import UserInfoModal from "./UserInfoModal";

const UserInfoLevel = ({ user, maxPoints, nextLevel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
              <button className="px-4 py-2 mt-3 w-full text-white transition bg-yellow-500 rounded hover:bg-yellow-600">
                로그아웃
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-7">
              <div>
                <p className="text-sm text-black-400">환영합니다</p>
                <h3 className="text-xl font-bold">{user.name} 님</h3>
              </div>
              <div className="flex flex-col gap-2">
                <p className="flex gap-1 text-sm">
                  <p className="text-black-400">닉네임:</p> {user.nickname}
                </p>
                <p className="flex gap-1 text-sm">
                  <p className="text-black-400">나이:</p> {user.age}
                </p>
                <p className="flex gap-1 text-sm">
                  <p className="text-black-400">지역:</p> {user.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회원등급 */}
      <div className="flex flex-col w-full max-w-[803px]">
        <span className="mb-5 text-2xl font-bold">회원등급</span>
        <div className="bg-black-50 p-6 rounded-lg shadow-md flex flex-row items-center gap-6 min-h-[260px]">
          <img className="max-w-[150px] max-h-[150px]" src={eggLevel} alt="회원 등급" />
          <div className="flex flex-col w-full">
            <p>{user.name}님의 등급은</p>
            <div className="flex gap-1">
            <p className="font-bold">{user.level}</p> 단계입니다.</div>
            <div className="w-full bg-yellow-400 rounded-full h-2.5 mt-4">
              <div
                className="bg-yellow-700 h-2.5 rounded-full"
                style={{ width: `${(user.points / maxPoints) * 100}%` }}
              ></div>
            </div>
            <p className="flex justify-end mt-2 text-sm">
            <div className="flex gap-1">{maxPoints - user.points}포인트 모으면 <p className="text-yellow-800">{nextLevel}</p>등급으로 승급!</div>
            </p>
          </div>
        </div>
      </div>
      <UserInfoModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default UserInfoLevel;
