import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  username: z.string()
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
  confirmPassword: z.string().min(1, "비밀번호가 확인을 입력해주세요"),
  name: z.string().min(1, "이름을 입력해주세요."),
  gender: z.enum(["남자", "여자"]).optional(),
  birthYear: z.string(),
  birthMonth: z.string(),
  birthDay: z.string(),
  region: z.string(),
  district: z.string(),
  job: z.string()
});

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

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOncePassword, setOnceShowPassword] = useState(false);
  const [gender, setGender] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [job, setJob] = useState("");
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

const password = watch("password");
const confirmPassword = watch("confirmPassword");
const passwordError =confirmPassword && password !== confirmPassword ? "비밀번호가 일치하지 않습니다." : "";

const onSubmit = (data) => {
    console.log("회원가입 데이터:", data);
  };

  // 버튼 활성화 조건
  const isButtonEnabled = isValid && gender && year && month && day && region && district && job;

  return (
    <div className="relative flex justify-center pb-28 top-20">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[520px] space-y-4">
        <h2 className="text-3xl font-medium text-center text-black-950 mb-11">회원가입</h2>

          <span className="flex flex-col gap-4 mb-6">
            {/* 아이디 입력 */}
            <div className="flex justify-between w-full gap-2">
              <TextInput 
                label="아이디" 
                placeholder="아이디를 입력해주세요" 
                {...register("username")} 
                error={errors.username?.message} 
                styles={{
                    label: { fontSize: "16px", fontWeight: "400",}, 
                    input: {  marginTop: "4px" , color: "#000", height: "50px", padding: "16px 13px", 
                      width: "404px",  backgroundColor: "#FFFFFF", borderRadius: "0.5rem", border: "1px solid #E5E7EB"},
                    error: {color: "#D6173A", marginTop: "5px", marginLeft: "5px"},
                }}
              />
              <Button className="bg-yellow-400 w-[108px] h-[50px] mt-[28px] rounded-lg text-black-700 border border-gray-200">
                중복확인
              </Button>
            </div>

            {/* 비밀번호 입력 */}
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
                    label: { fontSize: "16px", fontWeight: "400",}, 
                    input: {  marginTop: "4px" ,  borderRadius: "0.5rem",},
                    innerInput: {  color: "#000", height: "50px", padding: "13px 44px 13px 16px", width: "100%", 
                      backgroundColor: "#FFFFFF", borderRadius: "0.5rem", border: "1px solid #E5E7EB"},
                    section: {position: "absolute", right: "20px", top: "42px", color:"#9FA6B2" },
                    error: {color: "#D6173A", marginTop: "5px", marginLeft: "5px"},
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
                  error={passwordError || errors.confirmPassword?.message} 
                  styles={{
                    input: {  marginTop: "4px" ,  borderRadius: "0.5rem",},
                    innerInput: {  color: "#000", height: "50px", padding: "13px 44px 13px 16px", width: "100%", 
                      backgroundColor: "#FFFFFF", borderRadius: "0.5rem", border: "1px solid #E5E7EB"},
                      section: {position: "absolute", right: "20px", top: "12px", color:"#9FA6B2" },
                    error: {color: "#D6173A", marginTop: "5px", marginLeft: "5px"},
                  }}
                />
              </div>
            </span>
          </span>

          <span className="flex flex-col gap-4">
            {/* 이름 & 닉네임 */}
            <TextInput 
              label="이름" 
              placeholder="이름을 입력해주세요" 
              {...register("name")} 
              error={errors.name?.message} 
              styles={{
                label: { fontSize: "16px", fontWeight: "400",}, 
                input: {  marginTop: "4px" , color: "#000", height: "50px", padding: "16px 13px", 
                  width: "100%",  backgroundColor: "#FFFFFF", borderRadius: "0.5rem", border: "1px solid #E5E7EB"},
                error: {color: "#D6173A", marginTop: "5px", marginLeft: "5px"},
              }}
            />
            <div className="flex justify-between w-full gap-2">
              <TextInput 
                label="닉네임" 
                placeholder="닉네임을 입력해주세요" 
                {...register("nickname")} 
                error={errors.nickname?.message} 
                styles={{
                  label: { fontSize: "16px", fontWeight: "400",}, 
                  input: {  marginTop: "4px" , color: "#000", height: "50px", padding: "16px 13px", 
                    width: "404px",  backgroundColor: "#FFFFFF", borderRadius: "0.5rem", border: "1px solid #E5E7EB"},
                  error: {color: "#D6173A", marginTop: "5px", marginLeft: "5px"},
                }}
              />
              <Button className="bg-yellow-400 w-[108px] h-[50px] mt-[28px] rounded-lg text-black-700 border border-gray-200">
                중복확인
              </Button>
            </div>

            {/* 성별 선택 */}
            <div className="flex flex-col w-full gap-1">
              <div className="text-base font-normal text-black-950">성별</div>
              <div className="flex justify-between w-full px-1 h-[50px]">
                {genderOptions.map((item) => (
                  <Button 
                    key={item}
                    className={gender === item 
                      ? "bg-yellow-700 w-[49%] rounded-2xl text-black-50" 
                      : "bg-black-50 border border-gray-200 w-[49%] rounded-2xl text-[#9FA6B2]"} 
                    onClick={() => setGender(item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">생년월일</div>
              <div className="flex w-full gap-2"> 
                <Dropdown options={yearOptions} selected={year} setSelected={setYear} placeholder="년"/>
                <Dropdown options={monthOptions} selected={month} setSelected={setMonth} placeholder="월"/>
                <Dropdown options={dayOptions} selected={day} setSelected={setDay} placeholder="일"/>
              </div> 
            </div>
            
            {/* 지역 */}
            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">지역</div>
              <div className="flex gap-2">
                <Dropdown options={regionOptions} selected={region} setSelected={setRegion} placeholder="시/도 선택"/>
                <Dropdown options={districtOptions} selected={district} setSelected={setDistrict} placeholder="시/군/구 선택"/>
              </div>
            </div>

            {/* 직업 */}
            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">직업</div>
              <Dropdown options={jobOptions} selected={job} setSelected={setJob} placeholder="직업 선택"/>
            </div>
          </span>
          
        {/* 회원가입 버튼 */}
        <Button 
          type="submit" 
          fullWidth 
          disabled={!isValid} 
          className={`w-full h-[50px] rounded-lg font-medium text-lg text-black-50 
              ${isButtonEnabled ? "bg-yellow-700" : "bg-gray-300 cursor-not-allowed"}`}>
            회원가입
        </Button>
        <div className='text-base font-normal text-right'>
          <span className='mr-1'>이미 가입하셨나요?</span>
          <span onClick={() => navigate("/login")} className='underline cursor-pointer text-tag-orange'>로그인하기</span>
        </div>
      </form>
    </div>
  );
}
