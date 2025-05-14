import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import Search from "../../assets/images/ic_search.svg";
import { Menu } from "lucide-react";
import UserIcon from "../../assets/images/UserIcon.svg";
import { searchBenefits } from "../../api/BenefitsService"; 
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const Header = ({ isLoggedIn, userData }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        await searchBenefits(searchTerm,9); 
        navigate("/search"); 
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        Cookies.remove("accessToken");
        window.location.reload(); // 새로고침으로 상태 반영
      }
    }
  }, []);
  return (
    <header className="w-full border-b">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 h-16 sm:h-20 max-w-[1680px] mx-auto">
        {/* 왼쪽 로고 & 메뉴 버튼 */}
        <div className="flex items-center gap-4 sm:gap-8">
          <button onClick={() => navigate("/")}>
            <img src={Logo} alt="로고" className="w-24 sm:w-32" />
          </button>

          {/* 데스크탑 네비게이션 메뉴 */}
          <nav className="items-center hidden gap-6 text-gray-800 md:flex sm:gap-10">
            <button
              onClick={() => navigate("/benefitsList")}
              className="hover:text-black-950"
            >
              복지혜택 전체보기
            </button>
            <button
              onClick={() => navigate("/search")}
              className="hover:text-black-950"
            >
              통합검색
            </button>
            <button
              onClick={() => navigate("/board")}
              className="hover:text-black-950"
            >
              게시판
            </button>
            
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>

        {/* 검색창 & 로그인 */}
        <div className="flex items-center gap-6 sm:gap-12">
          {/* 검색창 */}
          <div className="relative hidden text-black-400 sm:block">
            <span className="absolute left-3 top-3">
              <img src={Search} alt="검색" className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-[160px] sm:w-[220px] lg:w-[260px] pl-8 py-2 px-4 text-sm border placeholder-black-400 rounded-2xl bg-black-100 h-10 shadow-inner"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} 
            />
          </div>

          {/* 로그인 & 회원가입 또는 사용자 정보 */}
          <div className="items-center hidden gap-3 sm:flex text-black-500">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/mypage")}>
                  <div className="flex flex-row gap-1">
                    <img src={UserIcon} alt="User Icon" className="w-6 h-6" />
                    <span className="text-black-500">{userData.nickname}</span>
                  </div>
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:text-black-950"
                >
                  로그인
                </button>
                <span className="text-black-400">|</span>
                <button
                  onClick={() => navigate("/signup")}
                  className="hover:text-black-950"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 모바일 네비게이션 메뉴 (햄버거 메뉴) */}
      {menuOpen && (
        <div className="flex flex-col items-center p-4 space-y-4 border-t md:hidden">
          <button
            onClick={() => navigate("/benefitsList")}
            className="w-full text-center hover:text-black-950"
          >
            복지혜택 전체보기
          </button>
          <button
              onClick={() => navigate("/search")}
              className="hover:text-black-950"
            >
              통합검색
            </button>
          <button
            onClick={() => navigate("/board")}
            className="w-full text-center hover:text-black-950"
          >
            게시판
          </button>
          
          <button
            onClick={() => navigate("/login")}
            className="w-full text-center hover:text-black-950"
          >
            로그인
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full text-center hover:text-black-950"
          >
            회원가입
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
