import Logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { BookUser, TriangleAlert, UserMinus, UserX } from 'lucide-react';

function SidebarItem({ icon, label, onClick, active }) {
  return (
    <span
      onClick={onClick}
      className={`flex gap-2.5 px-3 py-2 w-full rounded-lg cursor-pointer
        ${active ? "bg-yellow-700 text-white" : "hover:bg-yellow-400"}`}
    >
      {icon}
      {label}
    </span>
  );
}

export default function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-black-50 w-[220px] h-screen border-r">
      <div className="pt-2 ml-4">
        <button onClick={() => navigate("/")}>
            <img src={Logo} alt="로고" className="w-32 md:w-24" />
        </button>
      </div>

      <div className="mx-[22px] mt-[32px] text-black-600 text-base w-[170px] flex flex-col gap-10">
        <div className="flex flex-col gap-2.5">
          <span className="text-xs text-black-400">User</span>
          <div>
            <SidebarItem
              icon={<BookUser />}
              label="회원정보"
              active={activeTab === "user-info"}
              onClick={() => setActiveTab("user-info")}
            />
            <SidebarItem
              icon={<TriangleAlert />}
              label="신고내역"
              active={activeTab === "report"}
              onClick={() => setActiveTab("report")}
            />
            <SidebarItem
              icon={<UserMinus />}
              label="정지된 회원"
              active={activeTab === "suspended"}
              onClick={() => setActiveTab("suspended")}
            />
            <SidebarItem
              icon={<UserX />}
              label="탈퇴한 회원"
              active={activeTab === "withdrawn"}
              onClick={() => setActiveTab("withdrawn")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
