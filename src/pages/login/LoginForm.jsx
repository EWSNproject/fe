import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { Eye, EyeOff } from "lucide-react";
import { login, getUserInfo } from '../../api/auth'; 
import DuplicateModal from '../../components/modal/DuplicateModal'; 
import Cookies from 'js-cookie'; 

const schema = z.object({
  username: z.string().min(1, "아이디를 입력해주세요."),
  password: z.string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .max(16, "비밀번호는 최대 16자 이하이어야 합니다."),
});

export default function LoginForm({ handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      const { username, password } = data;
      const response = await login({ realId: username, password });
  
      Cookies.set('accessToken', response.accessToken, { expires: 1 / 24 });
  
      const userInfo = await getUserInfo(response.accessToken);
      Cookies.set('userId', userInfo.realId, { expires: 1 / 24 });
      Cookies.remove('lastSeenModalUserId');
      Cookies.remove('hasSeenInterestModal');
  
      const hasLoggedIn = localStorage.getItem('hasLoggedIn');
      setModalMessage("로그인 성공하였습니다.");
      setIsModalOpen(true);
      if (!hasLoggedIn) {
        // 처음 로그인인 경우
        
        localStorage.setItem('hasLoggedIn', 'true');
      }
  
      handleLogin({ nickname: userInfo.nickname });
  
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setModalMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
      setIsModalOpen(true);
    }
  };
  

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative flex justify-center pb-10 top-40 md:top-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[520px] px-4 space-y-4"
          noValidate
        >
          <h2 className="text-3xl font-medium text-center text-black-950 mb-11">로그인</h2>

          {/* 아이디 입력 */}
          <div>
            <TextInput
              label="아이디"
              placeholder="아이디를 입력하세요"
              autoComplete="off"
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
                  border: "1px solid #E5E7EB"
                },
                error: { color: "#D6173A", marginTop: "5px", marginLeft: "5px" }
              }}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="relative">
            <PasswordInput
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              visible={showPassword}
              autoComplete="new-password" // ✨ 핵심: Chrome 보안 경고 방지
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
                  border: "1px solid #E5E7EB"
                },
                section: {
                  position: "absolute",
                  right: "20px",
                  top: "42px",
                  color: "#9FA6B2"
                },
                error: { color: "#D6173A", marginTop: "5px", marginLeft: "5px" }
              }}
            />
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            fullWidth
            disabled={!isValid}
            className={`w-full h-[50px] rounded-lg font-medium text-lg text-black-50 
              ${isValid ? "bg-yellow-700" : "bg-gray-300 cursor-not-allowed"}`}
          >
            로그인
          </Button>

          <div className='text-base font-normal text-right'>
            <span className='mr-1'>회원이 아니신가요?</span>
            <span
              onClick={() => navigate("/signup")}
              className='underline cursor-pointer text-tag-orange'
            >
              회원가입하기
            </span>
          </div>
        </form>
      </div>

      {/* 모달 추가 */}
      <DuplicateModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
}
