import { DeletePostButtonProps } from "@/lib/types";
import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  return (
    <div>
      <Button className="cursor-pointer" variant="destructive" size="sm">
        <Trash2 className="size-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default DeletePostButton;
