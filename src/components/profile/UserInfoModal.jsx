import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Eye, EyeOff, X } from "tabler-icons-react";
import Dropdown from "../../pages/signup/Dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DuplicateModal from "../modal/DuplicateModal";
import { toast } from "react-toastify";
import {
  changePassword,
  updateUserProfile,
  checkDuplicate,
} from "../../api/auth";
import regionData from "../../data/regionDistricts_full.json";

const genderOptions = ["남자", "여자"];
const jobOptions = ["학생", "직장인", "자영업자", "전업주부", "무직", "기타"];

Modal.setAppElement("#root");

const UserInfoModal = ({ isOpen, onRequestClose, user }) => {
  const [activeTab, setActiveTab] = useState("아이디 & 비밀번호");

  // 개인정보 상태
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [job, setJob] = useState("");

  // 비밀번호 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 비밀번호 보기 토글
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 중복 확인 상태
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState("");
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false); // 비밀번호 변경 모달 상태
  const [isProfileUpdateModalOpen, setIsProfileUpdateModalOpen] =
    useState(false); // 프로필 수정 모달 상태

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [districtList, setDistrictList] = useState([]);

  const regionOptions = regionData.map((r) => r.region);

  useEffect(() => {
    const selectedRegion = regionData.find((r) => r.region === region);
    setDistrictList(selectedRegion ? selectedRegion.districts : []);
  }, [region]);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return regex.test(password);
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setNickname(user.nickname || "");
      setGender(user.gender || "");
      setBirthDate(user.birthAt ? new Date(user.birthAt) : null);
      setRegion(user.city || "");
      setDistrict(user.state || "");
      setJob(user.job || "");
    }
  }, [user]);

  // 모달이 닫힐 때 비밀번호 필드 리셋
  const handleCloseModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onRequestClose();
  };

  const handleChangePassword = async () => {
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("모든 항목을 입력해주세요.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "비밀번호는 8~20자, 영문/숫자/특수문자를 포함해야 합니다."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword, confirmPassword });
      setIsPasswordChangeModalOpen(true); // 비밀번호 변경 성공 모달 열기
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err.message);
    }
  };

  const handleUpdateProfile = async () => {
    const updatedData = {
      nickname,
      name,
      birthAt: birthDate ? birthDate.toISOString().split("T")[0] : null,
      gender,
      city: region,
      state: district,
      job,
    };

    try {
      await updateUserProfile(updatedData);
      setIsProfileUpdateModalOpen(true); // 프로필 수정 성공 모달 열기
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.message || "프로필 수정 중 오류가 발생했습니다.");
    }
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    try {
      const isDuplicate = await checkDuplicate("nickname", nickname);
      setNicknameCheckMessage(
        isDuplicate
          ? "이미 존재하는 닉네임입니다."
          : "사용 가능한 닉네임입니다."
      );
      setIsDuplicateModalOpen(true);
    } catch (error) {
      toast.error(error.message || "중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 모든 입력 필드가 채워졌는지 확인하는 함수
  const isProfileComplete = () => {
    return name && nickname && gender && birthDate && region && district && job;
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="User Info"
        className="bg-black-50 pt-5 pr-5 pl-5 max-w-[600px] min-h-[782px] w-full mx-auto rounded-lg outline-none"
        overlayClassName="fixed inset-0 bg-black-950 bg-opacity-80 flex items-center justify-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">개인정보 수정</h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mt-2 mb-4">
          <div className="flex border-b border-gray-300">
            <div
              className={`py-2 px-4 cursor-pointer ${
                activeTab === "아이디 & 비밀번호"
                  ? "font-bold"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setActiveTab("아이디 & 비밀번호")}
            >
              아이디 & 비밀번호
            </div>
            <div
              className={`py-2 px-4 cursor-pointer ${
                activeTab === "그 외 개인정보"
                  ? "font-bold"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setActiveTab("그 외 개인정보")}
            >
              그 외 개인정보
            </div>
          </div>
        </div>

        {activeTab === "아이디 & 비밀번호" ? (
          <div className="flex flex-col gap-5 max-w-[560px] pr-5 pl-5">
            <div className="max-w-[520px] gap-2 flex-col flex">
              <label className="text-[16px]">현재 아이디</label>
              <input
                type="text"
                value={user?.realId || ""}
                disabled
                className="pr-[16px] pl-[16px] block w-full min-h-[50px] bg-gray-200 border border-gray-300 rounded shadow-sm"
              />
              <p className="text-tag-red text-sm mt-1">
                아이디는 변경이 불가능합니다.
              </p>
            </div>

            <div className="relative max-w-[520px] flex flex-col">
              <label className="text-[16px]">현재 비밀번호</label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}

            <button
              onClick={handleChangePassword}
              className={`w-full py-2 rounded-md max-w-[520px] ${
                currentPassword && newPassword && confirmPassword
                  ? "bg-yellow-700 text-black-50"
                  : "bg-gray-300 text-black-50"
              }`}
            >
              비밀번호 변경하기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 max-w-[560px] pr-5 pl-5">
            <div className="max-w-[520px] gap-2 flex-col flex">
              <label className="text-[16px]">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pr-[16px] pl-[16px] block w-full min-h-[50px] border border-gray-300 rounded"
              />
            </div>

            <div className="max-w-[520px] w-full gap-2 flex-1 flex">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="pr-[16px] pl-[16px] block w-full min-h-[50px] border border-gray-300 rounded"
              />
              <button
                className="bg-yellow-400 max-w-[108px] w-full py-1 text-black-700 rounded-md"
                onClick={handleNicknameCheck}
              >
                중복확인
              </button>
            </div>

            <div className="flex flex-col w-full gap-1">
              <div className="text-base font-normal text-black-950">성별</div>
              <div className="flex justify-between w-full px-1 h-[50px]">
                {genderOptions.map((item) => (
                  <button
                    key={item}
                    className={
                      gender === item
                        ? "bg-yellow-700 w-[49%] rounded-2xl text-black-50"
                        : "bg-black-50 border border-gray-200 w-[49%] rounded-2xl text-[#9FA6B2]"
                    }
                    onClick={() => setGender(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">
                생년월일
              </div>
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                maxDate={new Date()}
                className="pr-[16px] pl-[16px] block w-full min-h-[50px] border border-gray-300 rounded"
                placeholderText="생년월일 선택"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">지역</div>
              <div className="flex gap-2">
                <Dropdown
                  options={regionOptions}
                  selected={region}
                  setSelected={setRegion}
                  placeholder="시/도 선택"
                />
                <Dropdown
                  options={districtList}
                  selected={district}
                  setSelected={setDistrict}
                  placeholder="시/군/구 선택"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">직업</div>
              <Dropdown
                options={jobOptions}
                selected={job}
                setSelected={setJob}
                placeholder="직업 선택"
              />
            </div>

            <button
              onClick={handleUpdateProfile}
              className={`bg-gray-300 text-black-50 w-full py-2 rounded-md max-w-[520px] ${
                isProfileComplete() ? "bg-yellow-700" : ""
              }`}
            >
              변경하기
            </button>
          </div>
        )}
      </Modal>

      {/* 중복 확인 모달 */}
      <DuplicateModal
        isOpen={isDuplicateModalOpen}
        message={nicknameCheckMessage}
        onClose={() => setIsDuplicateModalOpen(false)}
      />

      {/* 비밀번호 변경 성공 모달 */}
      <DuplicateModal
        isOpen={isPasswordChangeModalOpen}
        message="비밀번호가 성공적으로 변경되었습니다."
        onClose={() => setIsPasswordChangeModalOpen(false)}
      />

      {/* 프로필 수정 성공 모달 */}
      <DuplicateModal
        isOpen={isProfileUpdateModalOpen}
        message="프로필이 성공적으로 수정되었습니다."
        onClose={() => setIsProfileUpdateModalOpen(false)}
      />
    </>
  );
};

export default UserInfoModal;
