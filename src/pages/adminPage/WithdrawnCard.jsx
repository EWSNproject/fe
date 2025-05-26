import { useEffect, useState } from "react";
import { getCancelUser } from "../../api/admin";
import Pagination from "../../components/Pagination";

export default function WithdrawnCard() {
  const [withdrawnUsers, setWithdrawnUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWithdrawnUsers = async (page = 1) => {
    try {
      const data = await getCancelUser(page - 1); 
      setWithdrawnUsers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("탈퇴 회원 목록 조회 실패", error);
    }
  };

  useEffect(() => {
    fetchWithdrawnUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">🚪 탈퇴한 회원 목록</h2>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">아이디</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">닉네임</th>
            <th className="p-2 border">성별</th>
            <th className="p-2 border">나이</th>
            <th className="p-2 border">탈퇴일</th>
            <th className="p-2 border">사유</th>
          </tr>
        </thead>
        <tbody>
          {withdrawnUsers.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">탈퇴한 회원이 없습니다.</td>
            </tr>
          ) : (
            withdrawnUsers.map((user) => {
              const birthYear = new Date(user.birthAt).getFullYear();
              const age = new Date().getFullYear() - birthYear;

              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.realId}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.nickname}</td>
                  <td className="p-2 border">{user.gender}</td>
                  <td className="p-2 border">{age}</td>
                  <td className="p-2 border">{user.deletedAt?.split("T")[0]}</td>
                  <td className="p-2 border">{user.deleteReason || "-"}</td>
                </tr>
              );
            })
          )}
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
