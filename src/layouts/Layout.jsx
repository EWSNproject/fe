import { Outlet } from "react-router-dom";
import Header from "../components/header";
import ChatbotContainer from "../components/chatbot/ChatbotContainer"; 

const Layout = ({ isLoggedIn, userData, handleLogout }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} userData={userData} handleLogout={handleLogout} />
      <main>
        <Outlet />
      </main>

      <ChatbotContainer />
    </div>
  );
};

export default Layout;
