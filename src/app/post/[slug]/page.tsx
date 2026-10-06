import { auth } from "@/lib/auth";
import { getPostBySlug } from "@/lib/db/queries";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

const PostDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!post) {
    notFound();
  }

  // get author information
  const isAuthor = session?.user?.id === post.authorId;

  return <div>PostDetailsPage</div>;
};

export default PostDetailsPage;
