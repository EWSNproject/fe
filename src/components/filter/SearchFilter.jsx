const SearchFilter = () => {
    return (
        <div className="pt-6 pb-6 px-4 sm:px-6 mb-6 border rounded max-w-[1200px] min-h-[40px] bg-black-50">
            <div className="flex flex-col w-full gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row flex-wrap w-full gap-4 sm:gap-6">
                    {/* 나이 입력 */}
                    <div className="flex-1 min-w-[150px] sm:min-w-[250px] flex items-center gap-2 sm:gap-4">
                        <span className="text-[14px] sm:text-[16px]">나이</span>
                        <input
                            type="text"
                            placeholder="만 0세"
                            className="px-3 py-2 h-10 flex-1 min-w-[120px] sm:min-w-[150px] border rounded-[12px]"
                        />
                    </div>
                    
                    {/* 지역 선택 */}
                    <div className="flex-1 min-w-[200px] sm:min-w-[400px] min-h-[40px] flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <span className="text-[14px] sm:text-[16px]">지역</span>
                        <div className="flex w-full sm:flex-1 gap-2">
                            <select className="flex-1 min-w-[120px] sm:min-w-[150px] px-3 py-2 h-10 border rounded-[12px]">
                                <option>시/도 선택</option>
                            </select>
                            <select className="flex-1 min-w-[120px] sm:min-w-[150px] px-3 py-2 h-10 border rounded-[12px]">
                                <option>시/군/구 선택</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 검색창 */}
                <div className="flex flex-col sm:flex-row items-center w-full gap-2 sm:gap-4">
                    <span className="text-[14px] sm:text-[16px] whitespace-nowrap">검색</span>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        className="flex-1 px-3 py-2 h-10 border rounded-[12px] w-full"
                    />
                </div>
            </div>

            {/* 검색 버튼 */}
            <div className="flex justify-end mt-4 sm:mt-5">
                <div className="flex gap-2.5 w-full sm:max-w-[300px] min-h-[40px]">
                    <button className="flex-1 text-black-50 bg-gray-500 rounded-[10px] px-3 py-2 text-sm sm:text-base h-10">초기화</button>
                    <button className="flex-1 text-black-50 bg-yellow-700 rounded-[10px] px-3 py-2 text-sm sm:text-base h-10">검색</button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
