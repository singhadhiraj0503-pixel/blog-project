import PostList from "@/components/post/post-list";
import { getAllPosts } from "@/lib/db/queries";
import React from "react";

const HomePage = async () => {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-8 sm:px-8 sm:py-16 lg:px-8 lg:py-8">
        {/* Hero Section */}
        <section className="border-b border-border pb-8 sm:pb-10 lg:pb-9">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />

            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Chronicle Dispatches
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[48px]">
            Welcome to the Blog
          </h1>

          {/* Description + Count */}
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Thoughts, manuscripts, and dispatches from the community. A quiet
              register of design, engineering, and contemplation.
            </p>

            {/* Published Entries */}
            <div className="shrink-0">
              <div className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {posts.length} published entries
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              No Posts found yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Be the first to publish a post.
            </p>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
    </main>
  );
};

export default HomePage;
