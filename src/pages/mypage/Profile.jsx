import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card.jsx";
import UserInfoLevel from "../../components/profile/UserInfoLevel.jsx";
import MyPostsList from "../../components/profile/PostList.jsx";
import { getUserInfo, deleteUser } from "../../api/auth";
import { getbookmarked } from "../../api/mypage";
import Pagination from "../../components/Pagination.jsx";
import Cookies from "js-cookie";
import { myPosts, commentedPosts } from "./data.js";
import DuplicateModal from "../../components/modal/DuplicateModal.jsx";
import ReasonSelectModal from "../../components/modal/ReasonSelectModal.jsx";

const Mypage = ({ handleLogout }) => {
  const [activeTab, setActiveTab] = useState("liked");
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const pageGroupSize = 5;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [bookmarkedBenefits, setBookmarkedBenefits] = useState([]);

  const totalPages = Math.ceil(bookmarkedBenefits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = bookmarkedBenefits.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      getUserInfo(token)
        .then((userInfo) => {
          const age =
            new Date().getFullYear() - new Date(userInfo.birthAt).getFullYear();
          const cityState = `${userInfo.city} ${userInfo.state}`;
          const points = userInfo.point;

          setUser({
            ...userInfo,
            age,
            cityState,
            points,
          });
        })
        .catch((err) => {
          console.error("사용자 정보를 가져오는 데 실패했습니다.", err);
        });
    }

    const fetchBookmarkedBenefits = async () => {
      try {
        const data = await getbookmarked();
        setBookmarkedBenefits(data);
      } catch (error) {
        console.error("북마크된 복지서비스를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchBookmarkedBenefits();
  }, []);

  const handleLogoutClick = () => {
    handleLogout();
    setModalMessage("로그아웃 되었습니다.");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleDeleteAccount = async (reason) => {
    try {
      await deleteUser(reason);
      setModalMessage("회원탈퇴가 완료되었습니다.");
      setIsModalOpen(true);
      handleLogout();
    } catch (error) {
      console.error(error.message);
      setModalMessage("회원탈퇴에 실패했습니다.");
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {user && <UserInfoLevel user={user} />}

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
                <div className="absolute w-full h-[2px] bg-black-300 top-[18px]"></div>
                <div className="relative flex justify-between w-full">
                  {[
                    { level: "Lv. 0", name: "?", points: "0" },
                    { level: "Lv.1", name: "알", points: "100" },
                    { level: "Lv.2", name: "병아리", points: "300" },
                    { level: "Lv.3", name: "닭", points: "500" },
                    { level: "Lv.4", name: "독수리", points: "700" },
                    { level: "Lv.5", name: "구름", points: "1000" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full ${
                          index <= 1 ? "bg-yellow-700" : "bg-black-300"
                        } mb-2`}
                      ></div>
                      <span className="text-sm font-medium">{item.level}</span>
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm text-gray-500">
                        {item.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="ml-4 text-lg font-bold">
                  등급 및 포인트 시스템 안내
                </h3>
                <p className=" mb-[30px] ml-4">
                  게시판에서 활동하며 포인트를 적립하면 등급이 상승합니다.
                </p>
                <div className="rounded-lg">
                  <ul className="pl-5 space-y-2 list-disc">
                    <li className="text-tag-red">
                      가입 후 인사 게시판에 글을 작성하면 100점을 획득하여 바로
                      '알' 단계로 승급됩니다.
                    </li>
                    <li>
                      일반 게시판에서 글을 작성하면{" "}
                      <span className="text-tag-red">20점을 획득</span>합니다.
                    </li>
                    <li>
                      다른 사용자의 게시글에 답변을 달면{" "}
                      <span className="text-tag-red">10점을 획득</span>합니다.
                      단, 한 개의 게시글에서 받을 수 있는{" "}
                      <span className="text-tag-red">최대 포인트는 50점</span>
                      입니다.
                    </li>
                    <li className="text-tag-red">
                      단순한 답변(무의미한 내용, 복사/붙여넣기 등)으로 포인트를
                      얻는 경우, 관리자 확인 후 등급이 하락할 수 있습니다.
                    </li>
                    <li className="text-tag-red">
                      채택시 포인트 50점 추가로 받을 수 있습니다.{" "}
                    </li>
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
            {["liked", "posts", "comments"].map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative pb-2 transition ${
                  activeTab === key ? "text-black" : "text-gray-500"
                }`}
              >
                {key === "liked" && "북마크 표시한 복지서비스"}
                {key === "posts" && "내가 쓴 게시판글"}
                {key === "comments" && "좋아요 한 게시판글"}
                {activeTab === key && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "posts" && <MyPostsList posts={myPosts} />}

        {activeTab === "comments" && <MyPostsList posts={commentedPosts} />}

        {activeTab === "liked" && (
          <>
            <div className="grid grid-cols-3 gap-6 mt-6">
              {currentItems.map((benefit) => (
                <Card
                  key={benefit.publicServiceId}
                  data={{
                    id: benefit.publicServiceId,
                    title: benefit.serviceName,
                    description: benefit.summaryPurpose,
                    isBookmarked: benefit.bookmarked,
                    category: benefit.serviceCategory,
                    specialGroup: benefit.specialGroup,
                    familyType: benefit.familyType,
                  }}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageGroupSize={pageGroupSize}
              />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="w-full max-w-[1224px] bg-yellow-400 flex items-center mt-6">
        <div className="items-center px-6 py-4 mx-auto">
          <div className="flex items-center gap-4 text-sm ">
            <button onClick={handleLogoutClick}>로그아웃</button>
            <div className="w-[1px] h-3 bg-gray-300" />
            <button onClick={() => setIsWithdrawOpen(true)}>회원탈퇴</button>
            <div className="w-[1px] h-3 bg-gray-300" />
            <button>관리자페이지</button>
          </div>
        </div>
      </div>

      <ReasonSelectModal
        opened={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onConfirm={(reasonText) => {
          handleDeleteAccount(reasonText); // reasonText = '서비스 불만족' 또는 '직접 입력한 기타 사유'
          setIsWithdrawOpen(false);
        }}
        title="회원탈퇴"
        question="탈퇴 사유를 선택해주세요."
        options={[
          "서비스 불만족",
          "탈퇴 후 재가입",
          "이용 빈도 낮음",
          "직접 입력",
        ]}
        confirmText="탈퇴하기"
      />

      <DuplicateModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Mypage;
