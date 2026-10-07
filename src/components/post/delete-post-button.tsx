"use client";

import { DeletePostButtonProps } from "@/lib/types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { deletePost } from "@/actions/post-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [isDeleting, setisDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setisDeleting(true);
    try {
      const res = await deletePost(postId);
      if (res.success) {
        toast(res.message);
        router.push("/");
        router.refresh();
      } else {
        toast(res.message);
      }
    } catch (error) {
      toast("An error occured while deleting the post. Please try again later");
    } finally {
      setisDeleting(false);
    }
  };
  return (
    <div>
      <Button
        disabled={isDeleting}
        onClick={handleDelete}
        className="cursor-pointer"
        variant="destructive"
        size="sm"
      >
        <Trash2 className="size-4 mr-2" />
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
};

export default DeletePostButton;
