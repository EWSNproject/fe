import React, { useState } from "react";
import Modal from "react-modal";
import { Eye, EyeOff } from "tabler-icons-react";
import Dropdown from "../../pages/signup/Dropdown";

const genderOptions = ["남자", "여자"];
const yearOptions = ["1999", "2000", "2001", "2002", "2003", "2004", "2005"];
const monthOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const dayOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
  "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", 
  "23", "24", "25", "26", "27", "28", "29", "30", "31"
];
const regionOptions = ["서울", "경기", "부산"];
const districtOptions = ["강남구", "서초구", "종로구"];
const jobOptions = ["학생", "개발자", "무직"];

Modal.setAppElement("#root");

const UserInfoModal = ({ isOpen, onRequestClose }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("아이디 & 비밀번호");

  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [job, setJob] = useState("");

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Info"
      className="bg-black-50 pt-5 pr-5 pl-5 max-w-[600px] min-h-[782px] w-full mx-auto rounded-lg outline-none"
      overlayClassName="fixed inset-0 bg-black-950 bg-opacity-80 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4">개인정보 수정</h2>

      <div className="mt-2 mb-4">
        <div className="flex border-b border-gray-300">
          <div
            className={`py-2 px-4 cursor-pointer ${activeTab === "아이디 & 비밀번호" ? "font-bold" : "text-gray-600 hover:text-black"}`}
            onClick={() => setActiveTab("아이디 & 비밀번호")}
          >
            아이디 & 비밀번호
          </div>
          <div
            className={`py-2 px-4 cursor-pointer ${activeTab === "그 외 개인정보" ? "font-bold" : "text-gray-600 hover:text-black"}`}
            onClick={() => setActiveTab("그 외 개인정보")}
          >
            그 외 개인정보
          </div>
        </div>
      </div>

      {activeTab === "아이디 & 비밀번호" ? (
        <div className="flex flex-col gap-5 max-w-[560px] pr-5 pl-5 ">
          <div className="max-w-[520px] gap-2 flex-col flex">
            <label className="text-[16px]">현재 아이디</label>
            <input
              type="text"
              value="happy1234"
              disabled
              className="pr-[16px] pl-[16px] block w-full min-h-[50px] bg-gray-200 border border-gray-300 rounded shadow-sm"
            />
            <p className="text-tag-red text-sm mt-1">아이디는 변경이 불가능합니다.</p>
          </div>
          <div className="relative max-w-[520px] flex flex-col">
            <label className="text-[16px]">현재 비밀번호</label>
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              className="w-full pr-[40px] pl-[16px] border border-gray-200 min-h-[50px] rounded-md mt-[10px]"
            />
            <button
              className="absolute right-3 bottom-[3px] transform -translate-y-1/2"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative max-w-[520px] flex flex-col">
            <label className="text-[16px] mb-[10px]">새 비밀번호</label>
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              className="pr-[40px] pl-[16px] min-h-[50px] w-full border border-gray-200 rounded-md"
            />
            <button
              className="absolute right-3 bottom-[3px] transform -translate-y-1/2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative max-w-[520px] flex flex-col">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="비밀번호를 한번 더 입력해주세요"
              className="pr-[40px] pl-[16px] min-h-[50px] w-full border border-gray-200 rounded-md"
            />
            <button
              className="absolute right-3 bottom-[3px] transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <button className="bg-gray-300 text-black-50 w-full py-2 rounded-md max-w-[520px]">
            비밀번호 변경하기
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-[560px] pr-5 pl-5 ">
          <div className="max-w-[520px] gap-2 flex-col flex">
            <label className="text-[16px]">이름</label>
            <input
              type="text"
              placeholder="오채연"
              className="pr-[16px] pl-[16px] block w-full min-h-[50px] border border-gray-300 rounded "
            />
          </div>
          <div className="max-w-[520px] w-full gap-2 flex-1 flex">
            <input
              type="text"
              placeholder="혜택이"
              className="pr-[16px] pl-[16px] block w-full min-h-[50px] border border-gray-300 rounded "
            />
            <button className="bg-yellow-400 max-w-[108px] w-full py-1 text-black-700 rounded-md">중복확인</button>
          </div>
          <div className="flex flex-col w-full gap-1">
            <div className="text-base font-normal text-black-950">성별</div>
            <div className="flex justify-between w-full px-1 h-[50px]">
              {genderOptions.map((item) => (
                <button 
                  key={item}
                  className={gender === item 
                    ? "bg-yellow-700 w-[49%] rounded-2xl text-black-50" 
                    : "bg-black-50 border border-gray-200 w-[49%] rounded-2xl text-[#9FA6B2]"} 
                  onClick={() => setGender(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-normal text-black-950">생년월일</div>
            <div className="flex w-full gap-2"> 
              <Dropdown options={yearOptions} selected={year} setSelected={setYear} placeholder="년"/>
              <Dropdown options={monthOptions} selected={month} setSelected={setMonth} placeholder="월"/>
              <Dropdown options={dayOptions} selected={day} setSelected={setDay} placeholder="일"/>
            </div> 
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-normal text-black-950">지역</div>
            <div className="flex gap-2">
              <Dropdown options={regionOptions} selected={region} setSelected={setRegion} placeholder="시/도 선택"/>
              <Dropdown options={districtOptions} selected={district} setSelected={setDistrict} placeholder="시/군/구 선택"/>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-base font-normal text-black-950">직업</div>
            <Dropdown options={jobOptions} selected={job} setSelected={setJob} placeholder="직업 선택"/>
          </div>
          <button className="bg-gray-300 text-black-50 w-full py-2 rounded-md max-w-[520px]">
            변경하기
          </button>
        </div>
      )}
    </Modal>
  );
};

export default UserInfoModal;