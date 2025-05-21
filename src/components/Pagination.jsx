// Pagination.jsx
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange, pageGroupSize }) {
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const groupStartPage = (currentGroup - 1) * pageGroupSize + 1;
  const groupEndPage = Math.min(currentGroup * pageGroupSize, totalPages);

  return (
    <div className="flex items-center justify-center mt-[15px] mb-[45px] lg:flex-wrap ">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 cursor-pointer h-11"
      >
        <ChevronsLeft />
      </button>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 cursor-pointer h-11"
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: groupEndPage - groupStartPage + 1 }, (_, idx) => groupStartPage + idx).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-11 h-11 flex justify-center items-center rounded-2xl text-xl hover:bg-gray-100 ${
            currentPage === pageNum ? 'bg-yellow-700 text-black-50 hover:bg-yellow-700' : 'text-black-600'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 cursor-pointer h-11"
      >
        <ChevronRight />
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 cursor-pointer h-11"
      >
        <ChevronsRight />
      </button>
    </div>
  );
}