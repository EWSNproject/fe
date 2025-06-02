import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { signup, checkDuplicate } from "../../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DuplicateModal from "../../components/modal/DuplicateModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import regionData from "../../data/regionDistricts_full.json";

const schema = z
  .object({
    username: z
      .string()
      .min(8, "아이디는 최소 8자 이상이어야 합니다.")
      .nonempty("아이디를 입력해주세요."),
    nickname: z.string().min(1, "닉네임을 입력해주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
      .max(16, "비밀번호는 최대 16자 이하이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/,
        "비밀번호는 최소 1개의 알파벳, 숫자, 특수문자를 포함해야 합니다."
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요"),
    name: z.string().min(1, "이름을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

const genderOptions = ["남자", "여자"];
const jobOptions = ["학생", "직장인", "자영업자", "전업주부", "무직", "기타"];

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOncePassword, setOnceShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [job, setJob] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [districtList, setDistrictList] = useState([]);

  const regionOptions = regionData.map((r) => r.region);

  useEffect(() => {
    const selectedRegion = regionData.find((r) => r.region === region);
    setDistrictList(selectedRegion ? selectedRegion.districts : []);
  }, [region]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const nickname = watch("nickname");
  const username = watch("username");
  const name = watch("name");

  const isButtonEnabled = useMemo(() => {
    return (
      username?.length >= 8 &&
      nickname?.length >= 1 &&
      password?.length >= 8 &&
      confirmPassword?.length >= 1 &&
      password === confirmPassword &&
      name?.length >= 1 &&
      gender &&
      birthDate &&
      region &&
      district &&
      job &&
      isNicknameChecked &&
      isNicknameAvailable
    );
  }, [
    username,
    nickname,
    password,
    confirmPassword,
    name,
    gender,
    birthDate,
    region,
    district,
    job,
    isNicknameChecked,
    isNicknameAvailable,
  ]);

  const onSubmit = async (data) => {
    if (!isButtonEnabled) {
      toast.error("모든 필드를 입력해주세요");
      return;
    }

    try {
      const signupData = {
        realId: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
        name: data.name,
        nickname: data.nickname,
        gender,
        birthAt: birthDate.toISOString().split("T")[0],
        city: region,
        state: district,
        job,
      };

      await signup(signupData);

      toast.success("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  const handleUsernameCheck = async () => {
    if (!username) {
      toast.error("아이디를 입력해주세요.");
      return;
    }

    try {
      const isDuplicate = await checkDuplicate("realId", username);
      setModalMessage(
        isDuplicate
          ? "이미 존재하는 아이디입니다."
          : "사용 가능한 아이디입니다."
      );
      setShowModal(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    try {
      const isDuplicate = await checkDuplicate("nickname", nickname);
      setIsNicknameChecked(true);
      setIsNicknameAvailable(!isDuplicate);
      setModalMessage(
        isDuplicate
          ? "이미 존재하는 닉네임입니다."
          : "사용 가능한 닉네임입니다."
      );
      setShowModal(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex justify-center pb-28 top-20 md:top-8">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-[520px] px-4 space-y-4"
      >
        <h2 className="text-3xl font-medium text-center text-black-950 mb-11">
          회원가입
        </h2>

        <span className="flex flex-col w-full gap-4 mb-6">
          <div className="flex justify-between w-full gap-2">
            <div className="flex-grow">
              <TextInput
                label="아이디"
                placeholder="아이디를 입력해주세요"
                {...register("username")}
                error={errors.username?.message}
                styles={{
                  label: { fontSize: "16px", fontWeight: "400" },
                  input: {
                    marginTop: "4px",
                    color: "#000",
                    height: "50px",
                    padding: "16px 13px",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0.5rem",
                    border: "1px solid #E5E7EB",
                  },
                  error: {
                    color: "#D6173A",
                    marginTop: "5px",
                    marginLeft: "5px",
                  },
                }}
              />
            </div>
            <Button
              type="button"
              className="bg-yellow-400 w-[108px] h-[50px] mt-[28px] rounded-lg text-black-700 border border-gray-200"
              onClick={handleUsernameCheck}
            >
              중복확인
            </Button>
          </div>

          <span>
            <div className="relative">
              <PasswordInput
                label="비밀번호"
                placeholder="비밀번호를 입력하세요"
                visible={showPassword}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <Eye size={24} /> : <EyeOff size={24} />
                }
                visibilityToggleButtonProps={{
                  onClick: () => setShowPassword((prev) => !prev),
                }}
                {...register("password")}
                error={errors.password?.message}
                styles={{
                  label: { fontSize: "16px", fontWeight: "400" },
                  input: { marginTop: "4px", borderRadius: "0.5rem" },
                  innerInput: {
                    color: "#000",
                    height: "50px",
                    padding: "13px 44px 13px 16px",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0.5rem",
                    border: "1px solid #E5E7EB",
                  },
                  section: {
                    position: "absolute",
                    right: "20px",
                    top: "42px",
                    color: "#9FA6B2",
                  },
                  error: {
                    color: "#D6173A",
                    marginTop: "5px",
                    marginLeft: "5px",
                  },
                }}
              />
            </div>
            <div className="relative">
              <PasswordInput
                placeholder="비밀번호를 다시 입력해주세요"
                visible={showOncePassword}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? <Eye size={24} /> : <EyeOff size={24} />
                }
                visibilityToggleButtonProps={{
                  onClick: () => setOnceShowPassword((prev) => !prev),
                }}
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                styles={{
                  input: { marginTop: "4px", borderRadius: "0.5rem" },
                  innerInput: {
                    color: "#000",
                    height: "50px",
                    padding: "13px 44px 13px 16px",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0.5rem",
                    border: "1px solid #E5E7EB",
                  },
                  section: {
                    position: "absolute",
                    right: "20px",
                    top: "12px",
                    color: "#9FA6B2",
                  },
                  error: {
                    color: "#D6173A",
                    marginTop: "5px",
                    marginLeft: "5px",
                  },
                }}
              />
            </div>
          </span>
        </span>

        <span className="flex flex-col gap-4">
          <TextInput
            label="이름"
            placeholder="이름을 입력해주세요"
            {...register("name")}
            error={errors.name?.message}
            styles={{
              label: { fontSize: "16px", fontWeight: "400" },
              input: {
                marginTop: "4px",
                color: "#000",
                height: "50px",
                padding: "16px 13px",
                width: "100%",
                backgroundColor: "#FFFFFF",
                borderRadius: "0.5rem",
                border: "1px solid #E5E7EB",
              },
              error: { color: "#D6173A", marginTop: "5px", marginLeft: "5px" },
            }}
          />
          <div className="flex justify-between w-full gap-2">
            <div className="flex-grow">
              <TextInput
                label="닉네임"
                placeholder="닉네임을 입력해주세요"
                {...register("nickname")}
                error={errors.nickname?.message}
                styles={{
                  label: { fontSize: "16px", fontWeight: "400" },
                  input: {
                    marginTop: "4px",
                    color: "#000",
                    height: "50px",
                    padding: "16px 13px",
                    width: "100%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "0.5rem",
                    border: "1px solid #E5E7EB",
                  },
                  error: {
                    color: "#D6173A",
                    marginTop: "5px",
                    marginLeft: "5px",
                  },
                }}
              />
            </div>
            <Button
              type="button"
              className="bg-yellow-400 w-[108px] h-[50px] mt-[28px] rounded-lg text-black-700 border border-gray-200"
              onClick={handleNicknameCheck}
            >
              중복확인
            </Button>
          </div>

          <div className="flex flex-col w-full gap-1">
            <div className="text-base font-normal text-black-950">성별</div>
            <div className="flex justify-between w-full px-1 h-[50px]">
              {genderOptions.map((item) => (
                <Button
                  key={item}
                  type="button"
                  className={
                    gender === item
                      ? "bg-yellow-700 w-[49%] rounded-2xl text-black-50"
                      : "bg-black-50 border border-gray-200 w-[49%] rounded-2xl text-[#9FA6B2]"
                  }
                  onClick={() => setGender(item)}
                >
                  {item}
                </Button>
              ))}
            </div>
            {!gender}
          </div>

          <div className="flex flex-col gap-1">
            <div className="mb-1 text-base font-normal text-black-950">
              생년월일
            </div>
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="생년월일을 선택해주세요"
              maxDate={new Date()}
              className="w-full h-[50px] px-[13px] py-[10px] border border-gray-300 rounded-xl "
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
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
            {!region || !district}
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-base font-normal text-black-950">직업</div>
            <Dropdown
              options={jobOptions}
              selected={job}
              setSelected={setJob}
              placeholder="직업 선택"
            />
            {!job}
          </div>
        </span>

        <Button
          type="submit"
          fullWidth
          disabled={!isButtonEnabled}
          onClick={() =>
            console.log("회원가입 버튼 클릭됨", { isButtonEnabled })
          }
          className={`w-full h-[50px] rounded-lg font-medium text-lg text-black-50 
              ${
                isButtonEnabled
                  ? "bg-yellow-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
        >
          회원가입
        </Button>
        <div className="text-base font-normal text-right">
          <span className="mr-1">이미 가입하셨나요?</span>
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer text-tag-orange"
          >
            로그인하기
          </span>
        </div>

        <DuplicateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message={modalMessage}
        />
      </form>
    </div>
  );
}
