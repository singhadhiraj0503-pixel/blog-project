import PostForm from "@/components/post/post-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type Props = {};

const CreatePostPage = (props: Props) => {
  return (
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
              Create New Post
            </CardTitle>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Compose and dispatch your thoughtful reflections to the Chronicle
              editorial feed.
            </p>

            {/* Divider */}
            <div className="mt-8 h-px w-full bg-border" />
          </CardHeader>

          {/* Form */}
          <CardContent className="px-6 pt-8 pb-8 sm:px-8 sm:pt-8 sm:pb-9 lg:px-10 lg:pt-8 lg:pb-10">
            <PostForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default CreatePostPage;
