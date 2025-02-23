import React from "react";
import { useNavigate } from "react-router-dom";
import feLogo from "../../assets/images/fe_logo.png";

const Header = () => {
  const navigate = useNavigate(); // 페이지 이동 함수

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <div className="flex items-center space-x-6">
        {/* 혜택 온 버튼 */}
        <div style={{ position: "relative", display: "inline-block", zIndex: 1 }}>
          <button 
            onClick={() => navigate("/")} // 클릭 시 이동
            style={{ border: "1px solid black", borderRadius: "50px", padding: "6px 35px", fontSize: "24px", position: "relative", zIndex: 1 }}
          >
            혜택<span style={{ color: "#E3B23C" }}>온</span>
          </button>
          <img
            src={feLogo}
            alt="클릭 아이콘"
            style={{ position: "absolute", bottom: "-12px", right: "-15px", width: "60px", zIndex: 0 }}
          />
        </div>

        {/* 네비게이션 메뉴 (클릭 시 페이지 이동) */}
        <nav className="flex items-center space-x-2 text-gray-800">
          <button onClick={() => navigate("/benefitsList")} className="hover:text-black cursor-pointer">복지혜택 전체보기</button>
          <button onClick={() => navigate("/boardList")} className="hover:text-black cursor-pointer">게시판</button>
        </nav>
      </div>

      {/* 검색창 & 로그인 */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="border rounded-md px-4 py-2 text-gray-700 w-64"
          />
          <span className="absolute right-3 top-2 text-gray-500">🔍</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <button onClick={() => navigate("/login")} className="hover:text-black cursor-pointer">로그인</button>
          <span>|</span>
          <button onClick={() => navigate("/signup")} className="hover:text-black cursor-pointer">회원가입</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
