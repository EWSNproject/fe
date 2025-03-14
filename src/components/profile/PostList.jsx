export default function MyPostsList({ posts }) {
    return (
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} class="border-b grid grid-cols-12 gap-4">
              <div class="col-span-9">
                <h3 class="text-lg font-semibold mt-3">{post.title}</h3>
                <p class="text-sm text-gray-500 mt-1">{post.content}</p>
                <div class="flex gap-4 mt-2 text-sm text-gray-600 mb-3">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span class="text-tag-green">{post.author}</span>
                </div>
              </div>
              <div class="col-span-3 text-right text-sm text-gray-400 mt-3">
                {post.date}
              </div>
            </div>
          ))
        ) : (
          <p class="text-gray-400">작성한 게시글이 없습니다.</p>
        )}
      </div>
    );
  }
  