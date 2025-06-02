import { useEffect, useState } from "react";
import { getAllUser } from "../../api/admin";
import Pagination from "../../components/Pagination"; 

export default function UserCard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);   

  const fetchUsers = async (page) => {
    try {
      const data = await getAllUser(page - 1); 
      setUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("유저 목록 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">📋 유저 정보</h2>

      <table className="w-full mb-10 text-sm border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">아이디</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">닉네임</th>
            <th className="p-2 border">성별</th>
            <th className="p-2 border">나이</th>
            <th className="p-2 border">가입일</th>
            <th className="p-2 border">권한</th>
            <th className="p-2 border">상태</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const birthYear = new Date(user.birthAt).getFullYear();
            const age = new Date().getFullYear() - birthYear;
            const status = user.deletedAt
              ? "탈퇴"
              : user.suspendStartAt
              ? "정지"
              : "정상";

            return (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-2 border">{user.id}</td>
                <td className="p-2 border">{user.realId}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.nickname}</td>
                <td className="p-2 border">{user.gender}</td>
                <td className="p-2 border">{age}</td>
                <td className="p-2 border">{user.createdAt.split("T")[0]}</td>
                <td className={`p-2 border ${user.role === "ROLE_ADMIN" ? "text-red-500 font-semibold" : ""}`}>{user.role}</td>
                <td className="p-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      status === "탈퇴"
                        ? "border border-red-400 text-red-500"
                        : status === "정지"
                        ? "border border-orange-400 text-orange-500"
                        : "border border-green-400 text-green-500"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageGroupSize={5}
      />
    </div>
  );
}
