import { PostCardProps } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card
      className="
        group
        flex
        h-full
        min-h-[292px]
        flex-col
        rounded-2xl
        border-border
        bg-card
        py-0
        shadow-none
        transition-colors
        duration-200
        hover:border-foreground/20
      "
    >
      {/* Card Header */}
      <CardHeader className="px-6 pt-6 pb-0 sm:px-6 sm:pt-7">
        {/* Title */}
        <Link href={`/post/${post.slug}`} className="block outline-none">
          <CardTitle
            className="
              font-serif
              text-[24px]
              font-medium
              leading-[1.25]
              tracking-tight
              text-foreground
              transition-opacity
              duration-200
              group-hover:opacity-80
              sm:text-[25px]
            "
          >
            {post.title}
          </CardTitle>
        </Link>

        {/* Author */}
        <CardDescription className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          {/* Author Avatar */}
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
                className="h-full w-full object-cover"
              />
            ) : (
              post.author?.name?.charAt(0).toUpperCase()
            )}
          </span>

          <span>
            By <span className="text-muted-foreground">{post.author.name}</span>{" "}
            <span className="mx-1">—</span> {formatDate(post.createdAt)}
          </span>
        </CardDescription>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex-1 px-6 pt-6 pb-0">
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground sm:text-[15px]">
          {post.description}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-6 flex flex-col items-stretch px-6 pb-6">
        {/* Divider */}
        <div className="h-px w-full bg-border" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-5">
          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            post #{String(post.id).padStart(2, "0")}
          </span>

          <Link
            href={`/post/${post.slug}`}
            aria-label={`Read ${post.title}`}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              text-muted-foreground
              transition-all
              duration-200
              group-hover:bg-muted
              group-hover:text-foreground
            "
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
