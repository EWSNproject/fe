const SearchFilter = ({ onSearch, onReset }) => {
    return (
        <div className="pt-6 pb-6 px-[30px] mb-6 border rounded max-w-[1200px] min-h-[180px] bg-black-50">
            <div className="flex flex-col w-full gap-4">
                {/* 검색창 */}
                <div className="flex items-center w-full gap-[30px] ">
                    <span className="text-[16px] whitespace-nowrap">검색</span>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        className="flex-1 px-3 py-2 h-10 border rounded-[12px] w-full"
                    />
                </div>
            </div>

            {/* 검색 버튼 */}
            <div className="flex justify-end mt-9 ">
                <div className="flex gap-2.5 w-full max-w-[300px] min-h-[40px]">
                    <button 
                        className="flex-1 text-black-50 bg-gray-500 rounded-[10px] px-3 py-2 text-sm sm:text-base h-10"
                        onClick={onReset}
                    >
                        초기화
                    </button>
                    <button 
                        className="flex-1 text-black-50 bg-yellow-700 rounded-[10px] px-3 py-2 text-sm sm:text-base h-10"
                        onClick={onSearch}
                    >
                        검색
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
