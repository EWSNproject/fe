import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

export default function MyPostsList({ posts }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  // 현재 페이지에 해당하는 게시글만 표시
  const currentPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (posts.length === 0) {
    return <p className="text-gray-400">게시글이 없습니다.</p>;
  }

  return (
    <div>
      {currentPosts.map((post) => (
        <div 
          key={post.postId} 
          className="border-b grid grid-cols-12 gap-4 cursor-pointer hover:bg-gray-50"
          onClick={() => navigate(`/board/${post.postId}`)}
        >
          <div className="col-span-9">
            <h3 className="text-lg font-semibold mt-3">{post.title}</h3>
            <p className="text-sm text-black-500 mt-1">{post.content}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600 mb-3">
              <span>❤️ {post.recommendCnt}</span>
              <span>💬 {post.commentCnt}</span>
              <span className="text-tag-green">{post.nickName}</span>
            </div>
          </div>
          <div className="col-span-3 text-right text-sm text-black-300 mt-3">
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
  