import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";

// Zod 유효성 검사 스키마
const schema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 최대 16자 이하이어야 합니다."),
});


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("로그인 데이터:", data);
    navigate("/");
  };

  return (
    <div className="relative flex justify-center top-40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[520px] space-y-4"
      >
        <h2 className="text-3xl font-medium text-center text-black-950 mb-11">로그인</h2>
        {/* 아이디 입력 */}
        <div>
          <TextInput
            label="아이디"
            placeholder="아이디를 입력하세요"
            {...register("username")}
            error={errors.username?.message}
            styles={{
              label: { fontSize: "16px", fontWeight: "400",}, 
              input: {  marginTop: "4px" , color: "#000", height: "50px", padding: "16px 13px", 
                width: "100%",  backgroundColor: "#FFFFFF", borderRadius: "0.5rem", border: "1px solid #E5E7EB"},
              error: {color: "#D6173A", marginTop: "5px", marginLeft: "5px"},
            }}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="relative">
          <PasswordInput
            label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            visible={showPassword}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? <EyeOff size={24} /> : <Eye size={24} />
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

        {/* 제출 버튼 */}
        <Button type="submit" fullWidth disabled={!isValid} className={`w-full h-[50px] rounded-lg font-medium text-lg text-black-50 
            ${isValid ? "bg-yellow-700" : "bg-gray-300 cursor-not-allowed"}`}>
          로그인
        </Button>
        <div className='text-base font-normal text-right'>
            <span className='mr-1'>회원이 아니신가요?</span>
              <span onClick={() => navigate("/signup")} className='underline cursor-pointer text-tag-orange'>회원가입하기</span>
          </div>
      </form>
    </div>
  );
}
