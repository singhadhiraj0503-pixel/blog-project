import Container from "@/components/layout/container";
import PostForm from "@/components/post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";

const EditPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  if (post.authorId !== session.user.id) {
    redirect("/");
  }

  return (
    <Container>
      {/* <h1 className="max-w-2xl font-bold mb-5 text-4xl mt-7">Edit Your Post</h1> */}
      {/* <PostForm
        isEditing={true}
        post={{
          id: post.id,
          title: post.title,
          description: post.description,
          content: post.content,
          slug: post.slug,
        }}
      /> */}
      <main className="min-h-[calc(100vh-64px)] bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <Card
            className="
            overflow-hidden
            rounded-2xl
            border-border
            bg-card
            shadow-sm
          "
          >
            {/* Header */}
            <CardHeader className="px-6 pt-8 pb-0 sm:px-8 sm:pt-9 lg:px-10 lg:pt-10">
              {/* Status + Word Count */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />

                  <span className="text-xs font-medium text-amber-500">
                    Manuscript Draft
                  </span>
                </div>

                <span className="text-xs text-muted-foreground">0 words</span>
              </div>

              {/* Title */}
              <CardTitle
                className="
                mt-2
                font-serif
                text-3xl
                font-medium
                tracking-tight
                text-foreground
                sm:text-4xl
              "
              >
                Edit Post
              </CardTitle>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Compose and dispatch your thoughtful reflections to the
                Chronicle editorial feed.
              </p>

              {/* Divider */}
              <div className="mt-8 h-px w-full bg-border" />
            </CardHeader>

            {/* Form */}
            <CardContent className="px-6 pt-8 pb-8 sm:px-8 sm:pt-8 sm:pb-9 lg:px-10 lg:pt-8 lg:pb-10">
              <PostForm
                isEditing={true}
                post={{
                  id: post.id,
                  title: post.title,
                  description: post.description,
                  content: post.content,
                  slug: post.slug,
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </Container>
  );
};

export default EditPostPage;
