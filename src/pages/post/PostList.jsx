import { SlNote } from "react-icons/sl";
import { X } from "lucide-react";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useState } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState("질문");
  const categories = ["질문", "자유", "인사"];
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  const handleRemove = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (tags.length >= 3 || tags.includes(newTag)) {
        setInput("");
        return;
      }
      setTags([...tags, newTag]);
      setInput("");
    }
  };

  const handletagRemove = (index) => {
    const updated = [...tags];
    updated.splice(index, 1);
    setTags(updated);
  };

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;
  const limitedTitle = title.slice(0, 20);
  const limitedLinkTitle = linkTitle.slice(0, 12);

  const handleSubmit = () => {
    const postData = {
      category: selected,
      title: limitedTitle,
      content,
      tags,
      files,
      link: {
        title: limitedLinkTitle,
        url: linkUrl,
      },
    };
    console.log("✅ 저장된 데이터:", postData);
  };

  return (
    <div className="w-[1000px] mx-auto mt-[30px] mb-[60px]">
      {/* 제목 */}
      <div className="flex items-center gap-2 mb-3 text-2xl">
        <SlNote />
        게시판 글쓰기
      </div>

      <div className="mb-6 border-t border-black-400" />

      <div className="flex flex-col">
        {/* 카테고리 선택 */}
        <div className="flex gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              className={`px-2.5 py-1 rounded-full text-xl font-medium transition ${
                selected === category ? "bg-tag-green text-black-50" : "text-black-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 제목 입력 */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-normal text-right text-error">
            제목과 내용은 필수입니다.
          </span>
          <div className="flex items-center gap-2 mb-4 border-2 rounded bg-black-50 border-black-300">
            <div className="h-[32px] px-[10px] bg-black-200 text-lg font-semibold w-[52px] items-center flex">
              제목
            </div>
            <TextInput
              placeholder="20자 이내로 작성해주세요"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value.slice(0, 20))}
              withAsterisk
              classNames={{
                input: "border-none focus:outline-none focus:ring-0 h-5 w-[932px] text-base",
              }}
            />
          </div>
        </div>

        {/* 내용 입력 */}
        <div className="mb-2">
          <Textarea
            placeholder="500자 이내로 작성해주세요."
            minRows={8}
            maxLength={500}
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
              setCharCount(e.currentTarget.value.length);
            }}
            classNames={{
              input: "h-[230px] w-[1000px] border-2 border-black-300 p-4 focus:outline-none focus:ring-0 rounded-2xl",
            }}
          />
          <div className="text-base font-medium text-right text-black-400">
            {charCount}자 / 500자
          </div>
        </div>

        {/* 이미지 첨부 */}
        <div className="flex flex-col gap-2 mb-6">
          <label className="text-sm font-medium">이미지 파일 첨부</label>
          <Dropzone
            onDrop={(acceptedFiles) => {
              const newFiles = [...files];
              acceptedFiles.forEach((file) => {
                const isAlreadyAdded = newFiles.some((f) => f.name === file.name);
                if (!isAlreadyAdded) newFiles.push(file);
              });
              setFiles(newFiles.slice(0, 5));
            }}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple
            className="p-4 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50"
          >
            <div className="text-sm text-center text-gray-600">
              <span className="font-semibold">클릭하거나 드래그하여 이미지 업로드</span><br />
              (PNG, JPG, JPEG 최대 5장)
            </div>
          </Dropzone>
          {files.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {files.map((file, index) => (
                <div key={index} className="relative w-24 h-24 overflow-hidden border rounded">
                  <button
                    onClick={() => handleRemove(index)}
                    className="absolute top-0 right-0 bg-black-50 rounded-full p-[2px] shadow text-gray-700 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-500">선택된 이미지가 없습니다. (최대 5개 첨부 가능)</p>
          )}
        </div>

        {/* 태그 입력 */}
        <div className="flex flex-col gap-1 mb-6">
          <label className="mb-1 text-sm font-medium">태그 편집</label>
          <div className="bg-black-50 flex flex-wrap items-center gap-2 border rounded px-3 py-2 min-h-[44px]">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center px-2 py-1 text-sm rounded text-black-400 bg-black-100">
                #{tag}
                <button className="ml-1" onClick={() => handletagRemove(index)}>
                  &times;
                </button>
              </div>
            ))}
            {tags.length < 3 && (
              <input
                type="text"
                placeholder="#태그 입력 (최대 3개)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="outline-none border-none flex-1 min-w-[120px] text-sm placeholder:text-gray-400"
              />
            )}
          </div>
        </div>

        {/* 관련 링크 입력 */}
        <div>
          <label className="mb-4 text-sm font-medium">관련링크걸기</label>
          <div className="flex gap-6 mb-6">
            <TextInput
              label="제목"
              placeholder="12자 이내로 작성해주세요."
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.currentTarget.value.slice(0, 12))}
              classNames={{
                label: "text-xs font-medium",
                input: "bg-[#FAFAFA] border-0 border-b border-black-300 text-sm font-light rounded-none focus:ring-0 focus:outline-none w-[300px]",
              }}
            />
            <TextInput
              label="URL"
              placeholder="https://www..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.currentTarget.value)}
              classNames={{
                label: "text-xs font-medium",
                input: "bg-[#FAFAFA] border-0 border-b text-sm font-light border-black-300 rounded-none focus:ring-0 focus:outline-none w-full",
              }}
              className="flex-grow"
            />
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <div className="text-right">
          <Button
            className={`rounded-xl px-[40px] py-[10px] text-base font-bold text-black-50 ${
              isFormValid ? "bg-yellow-700" : "bg-black-300"
            }`}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
}
