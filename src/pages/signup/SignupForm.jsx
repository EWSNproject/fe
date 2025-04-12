import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { signup, checkDuplicate } from "../../api/auth";
import { notifications } from '@mantine/notifications';
import DuplicateModal from "./DuplicateModal";

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
  name: z.string().min(1, "이름을 입력해주세요.")
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
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
  const [setIsNicknameChecked] = useState(false);
  const [setIsNicknameAvailable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
  const nickname = watch("nickname");
  const username = watch("username");
  const name = watch("name");

  // 디버깅을 위한 로그
  useEffect(() => {
    console.log("폼 필드 상태:", {
      username: username?.length >= 8,
      nickname: nickname?.length >= 1,
      password: password?.length >= 8,
      confirmPassword: confirmPassword?.length >= 1,
      passwordMatch: password === confirmPassword,
      name: name?.length >= 1
    });
    console.log("추가 필드 상태:", {
      gender,
      year,
      month,
      day,
      region,
      district,
      job
    });
    console.log("폼 유효성:", isValid);
    console.log("폼 오류:", errors);
  }, [username, nickname, password, confirmPassword, name, gender, year, month, day, region, district, job, isValid, errors]);

  const onSubmit = async (data) => {
    console.log("onSubmit 함수 호출됨", data);
    
    if (!gender || !year || !month || !day || !region || !district || !job) {
      notifications.show({
        title: '입력 오류',
        message: '모든 필드를 입력해주세요',
        color: 'red',
      });
      return;
    }
    
    try {
      const formattedMonth = month.toString().padStart(2, '0');
      const formattedDay = day.toString().padStart(2, '0');
      
      const signupData = {
        realId: data.username,
        password: data.password,
        confirmPassword : data.confirmPassword,
        name: data.name,
        nickname: data.nickname,
        gender: gender,
        birthAt: `${year}-${formattedMonth}-${formattedDay}`,
        city: region,
        state: district,
        job: job
      };

      console.log('회원가입 요청 데이터:', signupData);
      
      const response = await signup(signupData);
      console.log('회원가입 응답:', response);

      notifications.show({
        title: '회원가입 성공',
        message: '로그인 페이지로 이동합니다.',
        color: 'green',
      });
      navigate('/login');
    } catch (error) {
      console.error('회원가입 에러:', error);
      notifications.show({
        title: '회원가입 실패',
        message: error.message || '회원가입 중 오류가 발생했습니다.',
        color: 'red',
      });
    }
  };

  // 버튼 활성화 조건 수정
  const isButtonEnabled = 
    username?.length >= 8 && 
    nickname?.length >= 1 && 
    password?.length >= 8 && 
    confirmPassword?.length >= 1 && 
    password === confirmPassword &&
    name?.length >= 1 && 
    gender && 
    year && 
    month && 
    day && 
    region && 
    district && 
    job;

  const handleUsernameCheck = async () => {
    if (!username) {
      notifications.show({
        title: '입력 오류',
        message: '아이디를 입력해주세요.',
        color: 'red',
      });
      return;
    }

    try {
      const isDuplicate = await checkDuplicate('realId', username);
      setModalMessage(isDuplicate ? "이미 존재하는 아이디입니다." : "사용 가능한 아이디입니다.");
      setShowModal(true);
    } catch (error) {
      notifications.show({
        title: '중복 확인 실패',
        message: error.message,
        color: 'red',
      });
    }
  };

  const handleNicknameCheck = async () => {
    if (!nickname) {
      notifications.show({
        title: '입력 오류',
        message: '닉네임을 입력해주세요.',
        color: 'red',
      });
      return;
    }

    try {
      const isDuplicate = await checkDuplicate('nickname', nickname);
      setIsNicknameChecked(true);
      setIsNicknameAvailable(!isDuplicate);

      setModalMessage(isDuplicate ? "이미 존재하는 닉네임입니다." : "사용 가능한 닉네임입니다.");
      setShowModal(true);
    } catch (error) {
      notifications.show({
        title: '중복 확인 실패',
        message: error.message,
        color: 'red',
      });
    }
  };

  // 폼 제출 디버깅을 위한 핸들러
  const formSubmitHandler = (e) => {
    console.log("폼 제출 이벤트 발생");
    // 기본 이벤트는 계속 진행되도록 함
  };

  return (
    <div className="relative flex justify-center pb-28 top-20">
      <form onSubmit={handleSubmit(onSubmit)} onSubmitCapture={formSubmitHandler} className="w-[520px] space-y-4">
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
              <Button 
                type="button"
                className="bg-yellow-400 w-[108px] h-[50px] mt-[28px] rounded-lg text-black-700 border border-gray-200"
                onClick={handleUsernameCheck}
              >
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
                  error={errors.confirmPassword?.message} 
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
              <Button 
                type="button"
                className="bg-yellow-400 w-[108px] h-[50px] mt-[28px] rounded-lg text-black-700 border border-gray-200"
                onClick={handleNicknameCheck}
              >
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
                    type="button"
                    className={gender === item 
                      ? "bg-yellow-700 w-[49%] rounded-2xl text-black-50" 
                      : "bg-black-50 border border-gray-200 w-[49%] rounded-2xl text-[#9FA6B2]"} 
                    onClick={() => setGender(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
              {!gender}
            </div>

            {/* 생년월일 */}
            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">생년월일</div>
              <div className="flex w-full gap-2"> 
                <Dropdown options={yearOptions} selected={year} setSelected={setYear} placeholder="년"/>
                <Dropdown options={monthOptions} selected={month} setSelected={setMonth} placeholder="월"/>
                <Dropdown options={dayOptions} selected={day} setSelected={setDay} placeholder="일"/>
              </div> 
              {(!year || !month || !day)}
            </div>
            
            {/* 지역 */}
            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">지역</div>
              <div className="flex gap-2">
                <Dropdown options={regionOptions} selected={region} setSelected={setRegion} placeholder="시/도 선택"/>
                <Dropdown options={districtOptions} selected={district} setSelected={setDistrict} placeholder="시/군/구 선택"/>
              </div>
              {(!region || !district)}
            </div>

            {/* 직업 */}
            <div className="flex flex-col gap-1">
              <div className="text-base font-normal text-black-950">직업</div>
              <Dropdown options={jobOptions} selected={job} setSelected={setJob} placeholder="직업 선택"/>
              {!job}
            </div>
          </span>
          
        {/* 회원가입 버튼 */}
        <Button 
          type="submit" 
          fullWidth 
          disabled={!isButtonEnabled} 
          onClick={() => console.log("회원가입 버튼 클릭됨", { isButtonEnabled })}
          className={`w-full h-[50px] rounded-lg font-medium text-lg text-black-50 
              ${isButtonEnabled ? "bg-yellow-700" : "bg-gray-300 cursor-not-allowed"}`}
        >
            회원가입
        </Button>
        <div className='text-base font-normal text-right'>
          <span className='mr-1'>이미 가입하셨나요?</span>
          <span onClick={() => navigate("/login")} className='underline cursor-pointer text-tag-orange'>로그인하기</span>
        </div>

        {/* 중복확인 결과 모달 */}
        <DuplicateModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          message={modalMessage}
        />
      </form>
    </div>
  );
}