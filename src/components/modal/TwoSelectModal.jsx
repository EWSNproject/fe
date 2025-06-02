import { createPortal } from 'react-dom';

export default function TwoSelectModal({
  isOpen,
  message,
  subMessage,         
  icon,               
  onClose,
  button1Text = "확인",
  button1Action = onClose,
  button2Text,
  button2Action,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-900 bg-opacity-80">
      <div className="bg-black-50 flex flex-col w-[452px] md:h-[250px] md:py-[22px] h-[300px] px-[38px] py-[40px] rounded-[8px] z-50">
        {/* 아이콘 영역 */}
        {icon && (
          <div className="flex justify-center">
            {typeof icon === "string" ? (
              <img src={icon} alt="modal icon" className="w-14 h-14" />
            ) : (
              icon
            )}
          </div>
        )}

        <div className="flex flex-col items-center justify-center flex-1">
          <p className="text-[24px] font-medium text-center md:text-[20px]">{message}</p>

          {/* 빨간 서브 메시지 */}
          {subMessage && (
            <p className="text-[18px] text-error text-center mt-2 md:text-[14px]">
              {subMessage}
            </p>
          )}
        </div>

        <div className="flex justify-between gap-3 text-xl font-semibold md:font-medium">
          {button2Text && (
            <button
              onClick={button2Action}
              className="px-[46px] py-[12px] md:px-[4px] w-full bg-black-200 text-gray-900 rounded-lg hover:bg-black-300"
            >
              {button2Text}
            </button>
          )}
          <button
            onClick={button1Action}
            className="px-[46px] py-[12px] md:px-[4px] w-full bg-yellow-950 text-black-50 rounded-lg hover:bg-yellow-700"
          >
            {button1Text}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
