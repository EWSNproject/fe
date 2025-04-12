import "./index.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./pages/main";
import Signup from "./pages/signup/SignupForm";
import LoginForm from "./pages/login/LoginForm";
import BenefitsList from "./pages/allbenefits/BenefitsList";
import Search from "./pages/search/Search";
import BoardList from "./pages/board/BoardList";
import BoardDetail from "./pages/board/BoardDetail";  
import PostList from "./pages/post/PostList";
import Mypage from "./pages/mypage/Profile";
import Layout from "./layouts/Layout";
import BenefitsDetail from "./pages/allbenefits/BenefitsDetail"
import Cookies from 'js-cookie';
import {getUserInfo} from './api/auth'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = Cookies.get('accessToken'); // 쿠키에서 토큰 가져오기
    if (token) {
      getUserInfo(token)
        .then(userInfo => {
          setIsLoggedIn(true);
          setUserData(userInfo);
        })
        .catch(err => {
          console.error("사용자 정보를 가져오는 데 실패했습니다.", err);
        });
    }
  }, []);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUserData(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    Cookies.remove('accessToken');
  };

  return (
    <Routes>
      <Route path="/" element={<Layout isLoggedIn={isLoggedIn} userData={userData} handleLogout={handleLogout} />}>
        <Route index element={<Main />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="benefitsList" element={<BenefitsList />} />
        <Route path="benefitsList/:id" element={<BenefitsDetail />} />
        <Route path="search" element={<Search />} />
        <Route path="boardList" element={<BoardList />} />
        <Route path="board/:id" element={<BoardDetail />} /> 
        <Route path="post" element={<PostList />} />
        <Route path="mypage" element={<Mypage handleLogout={handleLogout} />} />
      </Route>
    </Routes>
  );
}

export default App;
