import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import Search from "../../assets/images/ic_search.svg";

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  return (
    <header className="w-full bg-white border-b">
      <div className="flex items-center justify-between px-6 py-3 h-20 max-w-[1680px] mx-auto">
        <div className="flex items-center gap-8">
        {/* 혜택 온 버튼 */}
        <button>
        <img
            src={Logo}
            alt="로고"
            style={{ right: "15px", width: "120px", zIndex: 0 }}
          />
        </button>

        {/* 네비게이션 메뉴 (클릭 시 페이지 이동) */}
        <nav className="flex items-center gap-10 text-gray-800">
          <button onClick={() => navigate("/benefitsList")} className="cursor-pointer hover:text-black-950">복지혜택 전체보기</button>
          <button onClick={() => navigate("/boardList")} className="cursor-pointer hover:text-black-950">게시판</button>
        </nav>
      </div>

      {/* 검색창 & 로그인 */}
      <div className="flex items-center gap-12">
        <div className="relative text-black-400">
        <span className="absolute text-black-400 left-3 top-3"> <img
            src={Search}
            alt="로고"
            style={{ color : "#767676" }}
          /></span>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-[260px] pl-8 py-2 px-4 text-sm border placeholder-black-400 rounded-2xl bg-black-100 h-10 shadow-inner [box-shadow:inset_-1px_-1px_1px_0px_rgb(255,255,255),inset_1px_1px_1px_0px_rgba(0,0,0,0.1)]"
          />
          
        </div>
        <div className="flex items-center gap-3 text-black-500">
          <button onClick={() => navigate("/login")} className="cursor-pointer hover:text-black-950">로그인</button>
          <span className="text-black-400">|</span>
          <button onClick={() => navigate("/signup")} className="cursor-pointer hover:text-black-950">회원가입</button>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
