import { useState } from "react";
import Sidebar from "./sidebar";
import UserCard from "./UserCard"; 
import ReportCard from "./ReportCard";
import SuspendedCard from "./SuspendedCard";
import WithdrawnCard from "./WithdrawnCard";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("user-info"); 

  return (
    <div className="flex bg-[#FAFAFA] w-full">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        <header className="w-full border-b bg-black-50 h-[70px] flex items-center">
          <span className="flex ml-10 text-xl font-semibold">관리자페이지</span>
        </header>
        <div className="p-6">
          {activeTab === "user-info" && <UserCard />}
          {activeTab === "report" && <ReportCard />}
          {activeTab === "suspended" && <SuspendedCard />}
          {activeTab === "withdrawn" && <WithdrawnCard />}
        </div>
      </div>
    </div>
  );
}
