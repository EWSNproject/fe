import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

export default function MyPostsList({ posts }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600 border shadow-sm bg-gray-50 rounded-xl">
        <p className="mb-2 text-lg">게시글이 없습니다.</p>
        <button
          onClick={() => navigate('/board')}
          className="px-4 py-2 text-white transition bg-yellow-600 rounded-lg hover:bg-yellow-700"
        >
          ✍️ 게시글 작성하러 가기
        </button>
      </div>
    );
  }

  return (
    <div>
      {currentPosts.map((post) => (
        <div 
          key={post.postId} 
          className="grid grid-cols-12 gap-4 border-b cursor-pointer md:gap-0 hover:bg-gray-50"
          onClick={() => navigate(`/board/${post.postId}`)}
        >
          <div className="col-span-9 md:col-span-12">
            <h3 className="mt-3 text-lg font-semibold break-words">{post.title}</h3>
            <p className="mt-1 text-sm text-black-500">{post.content}</p>
            <div className="flex gap-4 mt-2 mb-3 text-sm text-gray-600">
              <span>❤️ {post.recommendCnt}</span>
              <span>💬 {post.commentCnt}</span>
              <span className="text-tag-green">{post.nickName}</span>
            </div>
          </div>
          <div className="col-span-3 mt-3 text-sm text-right text-black-300 md:hidden">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pageGroupSize={5}
        />
      )}
    </div>
  );
}
  