import { PostListProps } from "@/lib/types";
import React from "react";
import PostCard from "./post-card";

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 gap-5 pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostList;
