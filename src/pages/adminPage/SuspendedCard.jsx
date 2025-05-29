import { useEffect, useState } from "react";
import { getSuspendedUser } from "../../api/admin";
import Pagination from "../../components/Pagination";

export default function SuspendedCard() {
  const [suspendedUsers, setSuspendedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const usersPerPage = 10;
  useEffect(() => {
    const fetchSuspendedUsers = async () => {
      try {
        const data = await getSuspendedUser();     
        setSuspendedUsers(data.content);          
        setTotalPages(data.totalPages);            
      } catch (error) {
        console.error("정지 회원 목록 조회 실패", error);
      }
    };

    fetchSuspendedUsers();
  }, []);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 현재 페이지에 맞는 유저만 필터링
  const paginatedUsers = suspendedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">⛔ 정지된 회원 목록</h2>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">아이디</th>
            <th className="p-2 border">이름</th>
            <th className="p-2 border">닉네임</th>
            <th className="p-2 border">성별</th>
            <th className="p-2 border">나이</th>
            <th className="p-2 border">정지 시작일</th>
            <th className="p-2 border">정지 종료일</th>
            <th className="p-2 border">정지 사유</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan="9" className="p-4 text-center text-gray-500">정지된 회원이 없습니다.</td>
            </tr>
          ) : (
            paginatedUsers.map((user) => {
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
                  <td className="p-2 border">{user.suspendStartAt?.split("T")[0]}</td>
                  <td className="p-2 border">{user.suspendEndAt?.split("T")[0]}</td>
                  <td className="p-2 border">{user.suspendReason || "-"}</td>
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
