import { useEffect, useState, useCallback } from "react";
import { getReports, getReportType } from "../../api/admin";
import Pagination from "../../components/Pagination";
import ReportActionModal from "./components/ReportActionModal";
import { postReportApproval, postApprovalDenied } from "../../api/admin";

export default function ReportCard() {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

  const handleModalOpen = (reportId) => {
    setSelectedReportId(reportId);
    setModalOpen(true);
  };

  const handleModalSubmit = async (data) => {
    console.log("처리 요청 내용:", data);

    try {
      if (data.reject) {
        await postApprovalDenied(selectedReportId);
      } else if (data.approve) {
        const suspendData = {
          suspendStartAt: `${data.startDate}T12:00:00`,
          suspendEndAt: `${data.endDate}T12:00:00`,
          suspendReason: data.reason || "관리자 지정 사유 없음",
        };

        await postReportApproval(selectedReportId, suspendData);
      }

      await fetchReports(currentPage);
      setModalOpen(false);
    } catch (error) {
      console.error("신고 처리 중 오류 발생:", error);
    }
  };

  const fetchReports = useCallback(async (page = 1) => {
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
  }, [filterStatus]);

  useEffect(() => {
    fetchReports(currentPage);
  }, [fetchReports, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex gap-3 mb-4">
        {["ALL", "PENDING", "RESOLVED", "REJECTED"].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              filterStatus === status
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-black"
            }`}
            onClick={() => handleFilterChange(status)}
          >
            {{
              ALL: "전체",
              PENDING: "처리 대기중",
              RESOLVED: "처리 완료",
              REJECTED: "거부됨",
            }[status]}
          </button>
        ))}
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
                  {report.status === "처리 대기중" ? (
                    <button
                      className="px-2 py-1 text-xs text-yellow-800 border border-yellow-700 rounded cursor-pointer"
                      onClick={() => handleModalOpen(report.id)}
                    >
                      {report.status}
                    </button>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        report.status === "처리 완료"
                          ? "border border-green-400 text-green-500"
                          : "border border-red-400 text-red-500"
                      }`}
                    >
                      {report.status}
                    </span>
                  )}
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

      <ReportActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}