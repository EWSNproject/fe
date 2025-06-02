import { createRoot } from 'react-dom/client';
import TwoSelectModal from '../components/modal/TwoSelectModal';
import Bang from '../assets/images/ic_Bang.svg';

export function showSessionExpiredModal() {
  const modalDiv = document.createElement('div');
  document.body.appendChild(modalDiv);
  const root = createRoot(modalDiv);

  const closeModal = () => {
    root.unmount();
    modalDiv.remove();
  };

  const handleLogin = () => {
    closeModal();
    window.location.href = '/login';
  };

  const handleHome = () => {
    closeModal();
    window.location.href = '/';
  };

  root.render(
    <TwoSelectModal
      icon={Bang}
      isOpen={true}
      message="로그인시 이용한 서비스입니다."
      subMessage="다시 로그인하시면 계속 이용하실 수 있어요."
      button2Text="홈으로"
      button2Action={handleHome}
      button1Text="로그인"
      button1Action={handleLogin}
    />
  );
}
