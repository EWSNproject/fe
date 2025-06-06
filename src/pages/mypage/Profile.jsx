import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card.jsx";
import UserInfoLevel from "../../components/profile/UserInfoLevel.jsx";
import MyPostsList from "../../components/profile/PostList.jsx";
import { getUserInfo, deleteUser, logout } from "../../api/auth";
import { getbookmarked, getUserPosts, getliked } from "../../api/mypage";
import Pagination from "../../components/Pagination.jsx";
import Cookies from "js-cookie";
import ReasonSelectModal from "../../components/modal/ReasonSelectModal.jsx";
import DuplicateModal from "../../components/modal/DuplicateModal.jsx";
import TwoSelectModal from "../../components/modal/TwoSelectModal";
import { toast } from 'react-toastify';
import questionMark from "../../assets/images/questionMark.svg";
import eggLevel from "../../assets/images/egg.svg";
import chick from "../../assets/images/chick.svg";
import chicken from "../../assets/images/chicken.svg";
import eagle from "../../assets/images/eagle.svg";
import cloud from "../../assets/images/cloud.svg";

const Mypage = ({ handleLogout }) => {
  const [activeTab, setActiveTab] = useState("liked");
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [bookmarkedBenefits, setBookmarkedBenefits] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(6); 
  const pageGroupSize = 5;

  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const levelImages = [questionMark, eggLevel, chick, chicken, eagle, cloud];

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width < 768 ? 2 : 6);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

    const fetchData = async () => {
      try {
        const data = await getbookmarked();
        setBookmarkedBenefits(data);
        const userPosts = await getUserPosts();
        const likedPostsData = await getliked();
        setMyPosts(userPosts);
        setLikedPosts(likedPostsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const confirmLogout = async () => {
    try {
      await logout();
      handleLogout();
      toast.success("로그아웃 되었습니다.");
      sessionStorage.clear();
      Cookies.remove('userId');
      navigate("/");
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
      toast.error("로그아웃에 실패했습니다.");
    } finally {
      setIsLogoutConfirmOpen(false);
    }
  };

  const handleDeleteAccount = async (reason) => {
    try {
      await deleteUser(reason);
      setModalMessage("회원탈퇴가 완료되었습니다.");
      localStorage.removeItem('searchTerm');
      Cookies.remove('userId');
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
          className="mt-2 text-sm "
          onClick={() => setShowDetails(!showDetails)}
        >
          등급별 상세보기 {showDetails ? "▲" : "▼"}
        </button>
      </div>

      {showDetails && (
        <div className="w-full max-w-[1224px]">
          <div className="px-10 py-20 my-2 text-sm bg-yellow-200 rounded-lg shadow-md lg:px-4 lg:py-10">
            <div className="flex items-center gap-10 lg:flex-col lg:gap-6">
              <div className="relative w-[738px] lg:w-full">
                <div className="absolute w-full h-[2px] bg-black-300 top-[18px] lg:hidden"></div>
                <div className="relative flex justify-between w-full">
                  {[
                    { level: "Lv. 0", name: "?", points: "0" },
                    { level: "Lv.1", name: "알", points: "100" },
                    { level: "Lv.2", name: "병아리", points: "300" },
                    { level: "Lv.3", name: "닭", points: "500" },
                    { level: "Lv.4", name: "독수리", points: "700" },
                    { level: "Lv.5", name: "구름", points: "1000" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={levelImages[index]}
                        alt={item.name}
                        className="object-contain w-8 h-8 mb-2"
                      />
                      <span className="text-sm font-medium">{item.level}</span>
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="text-sm text-gray-500">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 lg:w-full">
                <h3 className="ml-4 text-lg font-bold lg:ml-0 lg:text-base">
                  등급 및 포인트 시스템 안내
                </h3>
                <p className="mb-[30px] ml-4 lg:ml-0 lg:text-sm lg:mb-4">
                  게시판에서 활동하며 포인트를 적립하면 등급이 상승합니다.
                </p>
                <div className="rounded-lg">
                  <ul className="pl-5 space-y-2 text-sm list-disc lg:text-xs">
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
                      채택시 포인트 50점 추가로 받을 수 있습니다.
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

        {activeTab === "comments" && <MyPostsList posts={likedPosts} />}

        {activeTab === "liked" && (
          <>
            {currentItems.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-6 mt-6 md:grid-cols-1">
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
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 mt-8 text-center text-gray-600 border rounded-xl bg-gray-50">
                <p className="text-lg font-semibold">북마크한 복지혜택이 없습니다.</p>
                <p className="text-sm">지금 복지혜택을 둘러보고 북마크해보세요!</p>
                <button
                  onClick={() => navigate("/benefitsList")}
                  className="px-4 py-2 mt-4 text-sm text-white transition bg-yellow-600 rounded-lg hover:bg-yellow-700"
                >
                  👉 복지혜택 보러가기
                </button>
              </div>
            )}
          </>
        )}

      </div>

      <div className="w-full max-w-[1236px] bg-yellow-400 flex items-center mt-6">
        <div className="items-center px-6 py-4 mx-auto">
          <div className="flex items-center gap-4 text-sm ">
            <button onClick={() => setIsLogoutConfirmOpen(true)}>로그아웃</button>
            <div className="w-[1px] h-3 bg-gray-300" />
            <button onClick={() => setIsWithdrawOpen(true)}>회원탈퇴</button>
            {user?.role === "ROLE_ADMIN" && (
              <>
                <div className="w-[1px] h-3 bg-gray-300" />
                <button onClick={() => navigate("/admin")}>관리자페이지</button>
              </>
            )}
          </div>
        </div>
      </div>

      <ReasonSelectModal
        opened={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        onConfirm={(reasonText) => {
          handleDeleteAccount(reasonText);
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

      <TwoSelectModal
        isOpen={isLogoutConfirmOpen}
        message="로그아웃하시겠습니까?"
        button1Text="로그아웃"
        button1Action={confirmLogout}
        button2Text="돌아가기"
        button2Action={() => {
          toast.info("로그아웃을 취소했습니다.");
          setIsLogoutConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default Mypage;
