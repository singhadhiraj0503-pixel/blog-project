import { PostContentProps } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import DeletePostButton from "./delete-post-button";

const PostContent = ({ post, isAuthor }: PostContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
        <CardDescription className="mt-2 flex items-center gap-4">
          <span
            className="
              flex
              h-6
              w-6
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-border
              bg-muted
              text-[9px]
              font-medium
              text-muted-foreground
            "
          >
            {post.author?.image ? (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="size-full object-cover"
              />
            ) : (
              post.author?.name?.charAt(0).toUpperCase()
            )}
          </span>

          <span>
            {post.author.name} - {formatDate(post.createdAt)}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-lg mb-5">{post.description}</p>
        <p className="text-muted-foreground text-4xl font-bold mb-5">
          {post.content}
        </p>
      </CardContent>

      {isAuthor && (
        <CardFooter>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              className="
    h-9
    rounded-md
    border
    border-border
    bg-muted
    px-3
    text-sm
    font-medium
    text-foreground
    shadow-none
    hover:bg-accent
    hover:text-foreground
  "
            >
              <Link href={`/post/edit/${post.slug}`}>
                <Pencil className="mr-2 size-4" />
                Edit
              </Link>
            </Button>

            <DeletePostButton postId={post.id} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PostContent;
