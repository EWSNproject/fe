import { useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import Chatbot from "./Chatbot";
import { useLocation } from "react-router-dom";

export default function ChatbotContainer() {
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  const hiddenPaths = ["/post", "/postEdit"];
  const shouldHide = hiddenPaths.some(path =>
    location.pathname === path || location.pathname.startsWith(path + "/")
  );

  if (shouldHide) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* 채팅창 */}
      {opened && (
        <div className="
          fixed bottom-[120px] right-12 w-[375px] h-[600px] bg-black-50 rounded-[28px] shadow-xl border border-gray-200 z-50
          md:w-full md:h-full md:bottom-0 md:right-0 md:rounded-none md:border-0 md:shadow-none
        ">
          <Chatbot onClose={() => setOpened(false)} />
        </div>
      )}

      {!opened && (
        <div className="fixed z-40 flex flex-col gap-3 md:gap-2 right-12 bottom-12 md:right-4 md:bottom-4">
          {/* 맨 위로 가기 버튼 */}
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center text-white bg-gray-500 rounded-full shadow-lg hover:bg-gray-800 md:w-10 md:h-10 w-14 h-14"
          >
            <ArrowUp className="w-6 h-6" />
          </button>

          {/* 챗봇 열기 버튼 */}
          <button
            onClick={() => setOpened(true)}
            className="flex items-center justify-center bg-yellow-600 rounded-full shadow-lg text-black-50 hover:bg-yellow-700 md:w-10 md:h-10 w-14 h-14"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
