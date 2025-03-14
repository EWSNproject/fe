import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyPostsList({ posts }) {
  const navigate = useNavigate();
    
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div 
            key={post.id} 
            className="border-b grid grid-cols-12 gap-4 cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/board/${post.id}`)}
          >
            <div className="col-span-9">
              <h3 className="text-lg font-semibold mt-3">{post.title}</h3>
              <p className="text-sm text-black-500 mt-1">{post.content}</p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600 mb-3">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments}</span>
                <span className="text-tag-green">{post.author}</span>
              </div>
            </div>
            <div className="col-span-3 text-right text-sm text-black-300 mt-3">
              {post.date}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">작성한 게시글이 없습니다.</p>
      )}
    </div>
  );
}
  