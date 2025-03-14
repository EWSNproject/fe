import React from "react";
import eggLevel from "../../assets/images/egg.svg";

const UserInfoLevel = ({ user, maxPoints, nextLevel }) => {
  return (
    <div className="flex gap-[80px] w-full max-w-[1224px]">
      {/* 회원정보 */}
      <div className="flex flex-col w-full max-w-[341px]">
        <span className="mb-5 text-2xl font-bold">회원정보</span>
        <div className="flex flex-col items-start gap-4 bg-white p-6 rounded-lg shadow-md max-h-[230px] bg-black-50">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <img
                className="w-20 h-20 border-2 border-gray-300 rounded-full"
                src={eggLevel}
                alt="프로필 이미지"
              />
              <button className="px-[23px] py-2 mt-3 text-white transition bg-yellow-500 rounded hover:bg-yellow-600">
                프로필 변경
              </button>
              <button className="px-4 py-2 mt-3 text-white transition bg-yellow-500 rounded hover:bg-yellow-600">
                개인정보 수정
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm text-black-400">환영합니다</p>
                <h3 className="text-xl font-bold">{user.name} 님</h3>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">
                  <strong>닉네임:</strong> {user.nickname}
                </p>
                <p className="text-sm">
                  <strong>아이디:</strong> {user.id}
                </p>
                <p className="text-sm">
                  <strong>나이:</strong> {user.age}
                </p>
                <p className="text-sm">
                  <strong>지역:</strong> {user.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 회원등급 */}
      <div className="flex flex-col w-full max-w-[803px]">
        <span className="mb-5 text-2xl font-bold">회원등급</span>
        <div className="bg-black-50 p-6 rounded-lg shadow-md flex flex-row items-center gap-6 min-h-[230px]">
          <img className="w-20" src={eggLevel} alt="회원 등급" />
          <div className="flex flex-col w-full">
            <p className="font-semibold">{user.name}님의 등급은</p>
            <p className="text-gray-700">{user.level} 단계입니다.</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
              <div
                className="bg-yellow-400 h-2.5 rounded-full"
                style={{ width: `${(user.points / maxPoints) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {maxPoints - user.points}포인트 모으면 {nextLevel}로 승급!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoLevel;
