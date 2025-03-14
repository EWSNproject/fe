import React, { useState } from "react";
import Card from "../../components/Card.jsx";
import UserInfoLevel from "../../components/profile/UserInfoLevel.jsx";
import MyPostsList from "../../components/profile/PostList.jsx";

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

  const posts = [
    {
      id: 1,
      title: "문화관심있는 사람 찾아요. 혜화주변에 사는데 문화관련 혜택 없나요.....???",
      content:
        "안녕하세요. 이번에 혜화로 이사했는데, 연극이나 문화생활 즐기는 걸 좋아하는 대학생입니다. 혹시 문화혜택을 받을 수 있는 곳이 있다면 어디서 혜택이 가능한지 궁금합니다.",
      likes: 4,
      comments: 2,
      author: "혜택이",
      date: "2025.03.03 13:16",
    },
    {
      id: 2,
      title: "용인시 청년지원 프로그램 궁금해요.",
      content:
        "용인시에 거주 중인데, 청년 대상 지원 프로그램이나 혜택이 있는지 알고 싶습니다. 추천해주실 만한 제도가 있나요?",
      likes: 5,
      comments: 3,
      author: "혜택이",
      date: "2025.03.05 10:20",
    },
    {
      id: 3,
      title: "소상공인 지원 혜택 문의드립니다.",
      content:
        "소규모 가게를 운영하고 있는데, 정부나 지자체에서 받을 수 있는 지원 혜택이 궁금합니다. 신청 방법이나 자격 조건을 알고 싶습니다.",
      likes: 3,
      comments: 1,
      author: "혜택이",
      date: "2025.03.06 09:15",
    },
    {
      id: 4,
      title: "장애인 복지 혜택 정보 공유 부탁드립니다.",
      content:
        "장애인 복지 관련 지원 제도가 있다면 알려주세요. 특히 문화, 의료 혜택 쪽 정보가 필요합니다.",
      likes: 6,
      comments: 4,
      author: "혜택이",
      date: "2025.03.07 14:45",
    },
    {
      id: 5,
      title: "주거비 지원 정책 궁금합니다.",
      content:
        "주거비 지원이나 월세 보조와 관련된 정책이 있는지 알고 싶어요. 대학생을 위한 제도가 있다면 공유 부탁드립니다.",
      likes: 2,
      comments: 2,
      author: "혜택이",
      date: "2025.03.08 11:30",
    },
    {
      id: 6,
      title: "문화 예술인 대상 지원 프로그램 있나요?",
      content:
        "문화 예술 활동을 하는 사람들을 위한 지원 제도나 프로그램이 있는지 궁금합니다. 관련 정보가 있다면 알려주세요.",
      likes: 7,
      comments: 5,
      author: "혜택이",
      date: "2025.03.09 16:50",
    },
  ];
  

  const sortOptions = ['최신순', '인기순', '북마크순'];
  const [selectedSort, setSelectedSort] = useState('최신순');

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <UserInfoLevel user={user} maxPoints={maxPoints} nextLevel={nextLevel} />

      <div className="w-full max-w-[1224px] flex justify-end">
        <button
          className="mt-2 text-sm text-blue-600"
          onClick={() => setShowDetails(!showDetails)}
        >
          등급별 상세보기 {showDetails ? "▲" : "▼"}
        </button>
      </div>

      {showDetails && (
        <div className="w-full max-w-[1224px]">
          <div className="px-10 py-20 my-2 text-sm bg-yellow-200 rounded-lg shadow-md">
            <div className="flex items-center gap-10">
              <div className="relative w-[738px]">
                <div className="absolute w-full h-[2px] bg-gray-200 top-[18px]"></div>
                <div className="relative flex justify-between w-full">
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

              <div className="flex-1">
                <h3 className="ml-4 text-lg font-bold">등급 및 포인트 시스템 안내</h3>
                <p className="text-gray-600 mb-[30px] ml-4">게시판에서 활동하며 포인트를 적립하면 등급이 상승합니다.</p>
                <div className="rounded-lg">
                  <ul className="pl-5 space-y-2 list-disc">
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

      <div className="mt-10 w-full max-w-[1236px]">
        <div className="flex items-center justify-between pb-2 text-lg border-b">
          <div className="flex gap-6">
            {['liked', 'posts', 'comments'].map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative pb-2 transition ${
                  activeTab === key ? "text-black" : "text-gray-500"
                }`}
              >
                {key === "liked" && "좋아요 표시한 복지서비스"}
                {key === "posts" && "내가 쓴 게시판글"}
                {key === "comments" && "댓글 단 글"}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
                )}
              </button>
            ))}
          </div>
          {activeTab === 'posts' && (
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="p-2 text-sm bg-white border rounded shadow-sm"
            >
              {sortOptions.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>

        {activeTab === "posts" && (
            <MyPostsList posts={posts} />
        )}

        {activeTab !== "posts" && (
          <div className="grid grid-cols-3 gap-6 mt-6">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <Card key={index} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypage;
