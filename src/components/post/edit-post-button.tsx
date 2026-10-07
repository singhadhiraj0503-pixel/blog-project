import { PostContentProps } from "@/lib/types";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";

const EditPostButton = ({ post, isAuthor }: PostContentProps) => {
  return (
    <div>
      {isAuthor && (
        <Button className="cursor-pointer" size="sm">
          <Link className="flex" href={`/post/edit/${post.slug}`}>
            <Pencil className="size-4 mr-2" />
            <span>Edit</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default EditPostButton;
