import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

const Layout = ({ isLoggedIn, userData, handleLogout }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} userData={userData} handleLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
