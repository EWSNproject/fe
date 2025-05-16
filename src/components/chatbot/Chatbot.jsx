import { useState, useEffect, useRef } from "react";
import { Paper, Button, Text } from "@mantine/core";
import { getChatbotAnswer } from "../../api/chatbot";
import BotLogo from "../../assets/images/ic_logo-on.png"; 

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const sendQuestion = async (question) => {
    setLoading(true);
    try {
      const { answer, options } = await getChatbotAnswer(question);
      setMessages(prev => [
        ...prev,
        { role: "user", text: question },
        { role: "bot", text: answer, options }
      ]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "오류가 발생했습니다." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full ">
      <div className="flex items-center justify-between px-5 py-3 bg-yellow-600 border-b border-gray-200 rounded-t-[28px]">
        <span className="ml-2 text-sm">혜택온 사이트 소개</span>
        <button className="pr-2 text-xl font-bold text-gray-600 cursor-pointer" onClick={onClose}>×</button>
      </div>

      <div className="flex-1 px-1 py-3 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <ChatMessage key={i} {...msg} onSelect={sendQuestion} />
        ))}
        <div ref={scrollRef} />
      </div>

      {!messages.length && (
        <Button
          fullWidth
          onClick={() => sendQuestion("처음")}
          loading={loading}
          className="py-2 rounded-lg bg-black-100 hover:bg-yellow-700"
        >
          챗봇 시작하기
        </Button>
      )}
    </div>
  );
}

function ChatMessage({ role, text, options, onSelect }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} gap-1 px-2`}>
       {/* 챗봇일 경우 왼쪽에 이미지 표시 */}
      {role === "bot" && (
        <img
          src={BotLogo}
          alt="Bot"
          className="w-10 h-10 border border-yellow-300 rounded-full"
        />
      )}
      
      <Paper
        shadow="sm"
        withBorder
        className={`text-sm max-w-[85%] whitespace-pre-line ${
          role === "user"
            ? "bg-yellow-700 text-black-50 px-3 py-2 font-medium rounded-[18px]"
            : "bg-gray-100 text-gray-950 rounded-2xl px-3 py-4"
        }`}
      >
        <Text>{text}</Text>
        {options && (
          <div className="flex flex-col gap-1.5 mt-3 text-black-950">
            {options.map((opt, idx) => (
              <Button
                key={idx}
                onClick={() => onSelect(opt)}
                className="border border-gray-300 bg-black-50 px-2.5 py-3 rounded hover:bg-black-200"
              >
                {opt}
              </Button>
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
}
