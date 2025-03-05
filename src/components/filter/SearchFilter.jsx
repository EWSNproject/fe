const SearchFilter = () => {
    return (
        <div className="pt-10 pb-10 px-6 mb-6 border rounded max-w-[1200px] max-h-[250px] bg-black-50">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-wrap gap-6 w-full">
                    <div className="flex-1 min-w-[250px] flex items-center gap-4">
                        <span className="text-[16px]">나이</span>
                        <input
                            type="text"
                            placeholder="만 0세"
                            className="p-2 flex-1 min-w-[150px] border rounded-[12px]"
                        />
                    </div>
                    <div className="flex-1 min-w-[400px] flex items-center gap-4">
                        <span className="text-[16px]">지역</span>
                        <div className="flex-1 flex items-center gap-2">
                            <select className="flex-1 min-w-[150px] p-1 border rounded-[12px]">
                                <option>시/도 선택</option>
                            </select>
                            <select className="flex-1 min-w-[150px] p-1 border rounded-[12px]">
                                <option>시/군/구 선택</option>
                            </select>
                        </div>
                    </div>
                </div>
                {/* 검색창 */}
                <div className="flex items-center gap-4 w-full">
                    <span className="text-[16px] whitespace-nowrap">검색</span>
                    <input
                        type="text"
                        placeholder="검색어 입력"
                        className="flex-1 p-2 border rounded-[12px]"
                    />
                </div>
            </div>
            {/* 검색 버튼 */}
            <div className="flex justify-end mt-5">
                <div className="flex gap-2.5 w-full max-w-[300px] min-h-[40px]">
                    <button className="flex-1 text-black-50 bg-gray-500 rounded-[10px]">초기화</button>
                    <button className="flex-1 text-black-50 bg-yellow-700 rounded-[10px]">검색</button>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
