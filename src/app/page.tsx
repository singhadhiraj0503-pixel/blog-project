import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import React from "react";

const HomePage = async () => {
  const posts = await getAllPosts();
  // console.log(posts);

  return (
    <main className="py-5">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Welcome to the Blog</h1>
        {posts.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold">No Posts found yet</h2>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
};

export default HomePage;
