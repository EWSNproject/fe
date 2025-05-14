import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Chatbot from "./Chatbot";

export default function ChatbotContainer() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      {opened && (
        <div className="fixed bottom-[120px] right-12 w-[375px] h-[600px] bg-black-50 rounded-[28px] shadow-xl border border-gray-200 z-100">
          <Chatbot onClose={() => setOpened(false)} />
        </div>
      )}

      <button
        onClick={() => setOpened(!opened)}
        className="fixed z-50 flex items-center justify-center bg-yellow-600 rounded-full shadow-lg text-black-50 bottom-12 right-12 hover:bg-yellow-700 w-14 h-14"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
