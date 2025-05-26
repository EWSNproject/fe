// ReportCard.jsx
import { useEffect, useState } from "react";
import { getReports, getReportType } from "../../api/admin";
import Pagination from "../../components/Pagination";

export default function ReportCard() {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchReports = async (page = 1) => {
    try {
      let data;
      if (filterStatus === "ALL") {
        data = await getReports(page - 1);
      } else {
        data = await getReportType(filterStatus, page - 1);
      }
      setReports(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("신고 내역 불러오기 실패", error);
    }
  };

  useEffect(() => {
    fetchReports(currentPage);
  }, [filterStatus, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // 필터 바뀌면 첫 페이지로 이동
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded ${filterStatus === "ALL" ? "bg-yellow-600 text-white" : "bg-gray-100 text-black"}`}
          onClick={() => handleFilterChange("ALL")}
        >
          전체
        </button>
        <button
          className={`px-4 py-2 rounded ${filterStatus === "PENDING" ? "bg-yellow-600 text-white" : "bg-gray-100 text-black"}`}
          onClick={() => handleFilterChange("PENDING")}
        >
          처리 대기중
        </button>
        <button
          className={`px-4 py-2 rounded ${filterStatus === "RESOLVED" ? "bg-yellow-600 text-white" : "bg-gray-100 text-black"}`}
          onClick={() => handleFilterChange("RESOLVED")}
        >
          처리 완료
        </button>
        <button
          className={`px-4 py-2 rounded ${filterStatus === "REJECTED" ? "bg-yellow-600 text-white" : "bg-gray-100 text-black"}`}
          onClick={() => handleFilterChange("REJECTED")}
        >
          거부됨
        </button>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-2 border">번호</th>
            <th className="p-2 border">신고자</th>
            <th className="p-2 border">피신고자</th>
            <th className="p-2 border">사유</th>
            <th className="p-2 border">내용</th>
            <th className="p-2 border">신고일</th>
            <th className="p-2 border">처리 상태</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">신고 내역이 없습니다.</td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="p-2 border">{report.id}</td>
                <td className="p-2 border">{report.reporterNickname}</td>
                <td className="p-2 border">{report.reportedNickname}</td>
                <td className="p-2 border">{report.reason}</td>
                <td className="p-2 border">{report.content || "-"}</td>
                <td className="p-2 border">{report.createdAt.split("T")[0]}</td>
                <td className="p-2 border">
                  <span className={`px-2 py-1 rounded text-xs ${
                    report.status === "처리 완료"
                      ? "border border-green-400 text-green-500"
                      : report.status === "거부됨"
                      ? "border border-red-400 text-red-500"
                      : "border border-yellow-700 text-yellow-800"
                  }`}>
                    {report.status}
                  </span>
                </td>
              </tr>
            ))
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
