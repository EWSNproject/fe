import React, { useState } from "react";
import Card from "../../components/card.jsx";
import UserInfoLevel from "../../components/profile/UserInfoLevel.jsx";

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("liked");
  const [showDetails, setShowDetails] = useState(false);

  const user = {
    name: "오채연",
    nickname: "혜택이",
    id: "abcd1234",
    age: 22,
    location: "용인시 기흥구",
    level: "알",
    points: 180,
  };

  const nextLevel = "병아리";
  const maxPoints = 300;

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <UserInfoLevel user={user} maxPoints={maxPoints} nextLevel={nextLevel} />

      <div className="w-full max-w-[1224px] flex justify-end">
        <button
          className="mt-2 text-blue-600 text-sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          등급별 상세보기 {showDetails ? "▲" : "▼"}
        </button>
      </div>

      {showDetails && (
        <div className="w-full max-w-[1224px]">
          <div className="my-2 px-10 py-20 bg-yellow-200 rounded-lg shadow-md text-sm">
            <div className="flex gap-10 items-center">
              {/* Level Progress Visualization */}
              <div className="relative w-[738px]">
                <div className="absolute w-full h-[2px] bg-gray-200 top-[18px]"></div>
                <div className="flex justify-between relative w-full">
                  {[
                    { level: 'Lv. 0', name: '?', points: '0' },
                    { level: 'Lv.1', name: '알', points: '100' },
                    { level: 'Lv.2', name: '병아리', points: '300' },
                    { level: 'Lv.3', name: '닭', points: '500' },
                    { level: 'Lv.4', name: '독수리', points: '700' },
                    { level: 'Lv.5', name: '구름', points: '1000' }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full ${index <= 1 ? 'bg-yellow-400' : 'bg-gray-200'} mb-2`}></div>
                      <span className="text-sm font-medium">{item.level}</span>
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm text-gray-500">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side Content */}
              <div className="flex-1 ">
                <div className="">
                <h3 className="font-bold text-lg ml-4">등급 및 포인트 시스템 안내</h3>
                <p className="text-gray-600 mb-[30px] ml-4">게시판에서 활동하며 포인트를 적립하면 등급이 상승합니다.</p>
                </div>
                <div className="rounded-lg">
                  <ul className="list-disc pl-5 space-y-2">
                    <li className="text-tag-red">가입 후 인사 게시판에 글을 작성하면 100점을 획득하여 바로 ‘알’ 단계로 승급됩니다.</li>
                    <li>일반 게시판에서 글을 작성하면 <span className="text-tag-red">20점을 획득</span>합니다.</li>
                    <li>다른 사용자의 게시글에 답변을 달면 <span className="text-tag-red">10점을 획득</span>합니다. 단, 한 개의 게시글에서 받을 수 있는 <span className="text-tag-red">최대 포인트는 50점</span>입니다.</li>
                    <li className="text-tag-red">단순한 답변(무의미한 내용, 복사/붙여넣기 등)으로 포인트를 얻는 경우, 관리자 확인 후 등급이 하락할 수 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 관심 복지 서비스 */}
      <div className="mt-10 w-full max-w-[1236px]">
        {/* 탭 메뉴 */}
        <div className="flex gap-6 border-b pb-2 text-lg">
          {[
            { key: "liked", label: "좋아요 표시한 복지서비스" },
            { key: "posts", label: "내가 쓴 게시판글" },
            { key: "comments", label: "댓글 단 글" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative pb-2 transition ${
                activeTab === tab.key ? "text-black" : "text-black-500"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
              )}
            </button>
          ))}
        </div>

        {/* 카드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <Card key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
