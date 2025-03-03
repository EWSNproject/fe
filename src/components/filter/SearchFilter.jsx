const SearchFilter = () => {
    return (
      <div className="pt-[40px] pb-[40px] pr-[30px] pl-[30px] mb-6 border rounded h-[250px]">
        <div className="flex flex-col gap-[30px] w-full">
          <div className="flex items-center gap-[150px] w-full">
            <div className="w-[300px] h-[40px] flex items-center gap-[30px]">
              <span className="text-[16px]">나이</span>
              <input
                type="text"
                placeholder="만 0세"
                className="p-2 w-[240px] border rounded-[12px]"
              />
            </div>
            <div className="w-[690px] h-[40px] flex items-center gap-[30px]">
              <span className="text-[16px]">지역</span>
              <div className="w-[630px] flex items-center gap-[10px]">
                <select className="w-[300px] p-1 border rounded">
                  <option>시/도 선택</option>
                </select>
                <select className="w-[320px] p-1 border rounded">
                  <option>시/군/구 선택</option>
                </select>
              </div>
            </div>
          </div>
          {/* 검색창 */}
          <div className="flex items-center gap-[30px] w-full">
            <span className="text-[16px]">검색</span>
            <input
              type="text"
              placeholder="검색어 입력"
              className="w-full p-2 border rounded-[12px]"
            />
          </div>
        </div>
        {/* 검색 버튼 */}
        <div className="flex justify-end mt-[20px]">
          <div className="flex gap-2.5 w-[296px] h-[40px]">
            <button className="w-[143px] text-black-50 bg-gray-500 rounded-[10px]">초기화</button>
            <button className="w-[143px] text-black-50 bg-yellow-700 rounded-[10px]">검색</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SearchFilter;
  