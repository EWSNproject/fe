import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../../api/postApi";
import { SlNote } from "react-icons/sl";
import { X } from "lucide-react";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { categoryMap } from "../../constants/postCategory";
import TwoSelectModal from "../../components/modal/TwoSelectModal";
import Bang from "../../assets/images/ic_Bang.svg";
import { toast } from 'react-toastify';

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [existingImages, setExistingImages] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleRemove = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === " ") && input.trim()) {
      e.preventDefault();

      let newTag = input.trim();  
      if (newTag.startsWith("#")) {
        newTag = newTag.slice(1);  
      }

      if (newTag.length === 0 || tags.length >= 3 || tags.includes(newTag)) {
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
  const limitedTitle = title.slice(0, 40);
  const limitedLinkTitle = linkTitle.slice(0, 12);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await getPostById(id);
        setTitle(post.title);
        setContent(post.content);
        setSelected(post.postType);
        setTags(post.tags?.split(',').filter(Boolean) || []);
        setLinkTitle(post.urlTitle);
        setLinkUrl(post.urlPath);
        setCharCount(post.content.length);
        setExistingImages(post.images || []);
      } catch (error) {
        console.error("수정용 데이터 로딩 실패:", error);
      }
    };
    fetchPost();
  }, [id]);
  
  const handleSubmit = async () => {
    const postData = {
      title: limitedTitle,
      content,
      postType: categoryMap[selected],
      urlTitle: limitedLinkTitle,
      urlPath: linkUrl,
      tags: tags.join(','),
      keepImageIds: existingImages.map(img => img.imageId),
      newImages: files,
    };
    await updatePost(id, postData);
  
    try {
      await updatePost(id, postData); 
      setEditModalOpen(false); 
      toast.success("게시글이 수정되었습니다.");
      navigate(`/board/${id}`);
    } catch (error) {
      console.error("수정 실패:", error);
      toast.error("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto mt-[30px] mb-[60px] px-4 sm:px-6">
      {/* 제목 */}
      <div className="flex items-center gap-2 mb-3 text-2xl">
        <SlNote />
        게시글 수정하기
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
            <div className="h-[32px] px-[10px] bg-black-200 text-lg font-semibold w-[60px] items-center flex">
              제목
            </div>
            <TextInput
              placeholder="40자 이내로 작성해주세요"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value.slice(0, 40))}
              withAsterisk
              classNames={{
                input: "border-none focus:outline-none focus:ring-0 h-5 w-full text-base",
                root: "w-full pr-2",
              }}
            />
          </div>
        </div>

        {/* 내용 입력 */}
        <div className="mb-2 w-full max-w-[1000px]">
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
              input: "h-[230px] w-full border-2 border-black-300 p-4 focus:outline-none focus:ring-0 rounded-2xl",
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
          {(files.length > 0 || existingImages.length > 0) ? (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* ✅ 기존 이미지 렌더링 */}
              {existingImages.map((img, index) => (
                <div key={`existing-${index}`} className="relative w-24 h-24 overflow-hidden border rounded">
                  <button
                    onClick={() => {
                      const updated = [...existingImages];
                      updated.splice(index, 1);
                      setExistingImages(updated);
                    }}
                    className="absolute top-0 right-0 bg-black-50 rounded-full p-[2px] shadow text-gray-700 hover:text-red-600"
                  >
                    <X size={14} />
                  </button>
                  <img
                    src={img.imageUrl}
                    alt={`uploaded-${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
            ))}

            {/* ✅ 새로 선택한 이미지 렌더링 */}
            {files.map((file, index) => (
              <div key={`new-${index}`} className="relative w-24 h-24 overflow-hidden border rounded">
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
          <div className="flex flex-wrap w-full gap-6 mb-6 lg:flex-col">
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
            onClick={() => setEditModalOpen(true)}
          >
            작성완료
          </Button>
        </div>
      </div>

      <TwoSelectModal
        icon={Bang}
        isOpen={editModalOpen}
        message="게시글을 수정하시겠습니까?"
        subMessage="수정된 내용은 바로 적용됩니다."
        button2Text="돌아가기"
        button2Action={() => setEditModalOpen(false)}
        button1Text="수정하기"
        button1Action={handleSubmit}
      />

    </div>
  );
} 