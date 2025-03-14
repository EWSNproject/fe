import "./index.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Signup from "./pages/signup/SignupForm";
import Login from "./pages/login/LoginForm";
import BenefitsList from "./pages/allbenefits/BenefitsList";
import Search from "./pages/search/Search";
import BoardList from "./pages/board/BoardList";
import BoardDetail from "./pages/board/BoardDetail";  
import PostList from "./pages/post/PostList";
import Mypage from "./pages/mypage/Profile";
import Layout from "./layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="benefitsList" element={<BenefitsList />} />
        <Route path="search" element={<Search />} />
        <Route path="boardList" element={<BoardList />} />
        <Route path="board/:id" element={<BoardDetail />} /> 
        <Route path="post" element={<PostList />} />
        <Route path="mypage" element={<Mypage />} />
      </Route>
    </Routes>
  );
}

export default App;
