"use client";

import React, { useTransition } from "react";
import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost, updatePost } from "@/actions/post-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PostFormProps } from "@/lib/types";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be atleast 3 characters long")
    .max(255, "Title should not be more than 255 characters long."),
  description: z
    .string()
    .min(5, "Description should be atleast 3 characters long")
    .max(255, "Description should not be more than 255 characters long."),
  content: z.string().min(10, "Content should be atleast 3 characters long"),
});

type PostFormValues = z.infer<typeof postSchema>;

const PostForm = ({ isEditing, post }: PostFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      isEditing && post
        ? {
            title: post.title,
            description: post.description,
            content: post.content,
          }
        : {
            title: "",
            description: "",
            content: "",
          },
  });

  const onFormSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;

        if (isEditing && post) {
          res = await updatePost(post.id, formData);
        } else {
          res = await createPost(formData);
        }

        if (res.success) {
          toast(
            isEditing
              ? "Post Updated Successfully"
              : "Post created Successfully",
          );
          router.refresh();
          router.push("/");
        }
      } catch (error) {
        toast("Failed to create a new post");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} action="" className="space-y-5">
      {/* Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="title"
            className="text-sm font-medium text-foreground"
          >
            Title
          </Label>

          <span className="text-xs text-muted-foreground">0 / 255</span>
        </div>

        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          disabled={isPending}
          className="
            h-11
            rounded-xl
            border-border
            bg-background
            px-4
            text-sm
            text-foreground
            shadow-none
            placeholder:text-muted-foreground
            focus-visible:border-ring
            focus-visible:ring-1
            focus-visible:ring-ring
          "
        />

        {errors?.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-foreground"
          >
            Description
          </Label>

          <span className="text-xs text-muted-foreground">0 / 255</span>
        </div>

        <Textarea
          id="description"
          placeholder="Write your description"
          {...register("description")}
          disabled={isPending}
          className="
            min-h-24
            resize-none
            rounded-xl
            border-border
            bg-background
            px-4
            py-2
            text-sm
            leading-6
            text-foreground
            shadow-none
            placeholder:text-muted-foreground
            focus-visible:border-ring
            focus-visible:ring-1
            focus-visible:ring-ring
          "
        />

        {errors?.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <Label
            htmlFor="content"
            className="text-sm font-medium text-foreground"
          >
            Content
          </Label>

          <span className="text-xs text-muted-foreground">
            min 10 characters
          </span>
        </div>

        <Textarea
          id="content"
          className="
            min-h-[180px]
            resize-none
            rounded-xl
            border-border
            bg-background
            px-4
            py-3
            text-sm
            leading-7
            text-foreground
            shadow-none
            placeholder:text-muted-foreground
            focus-visible:border-ring
            focus-visible:ring-1
            focus-visible:ring-ring
            sm:min-h-[250px]
          "
          placeholder="Start writing your content ..."
          {...register("content")}
          disabled={isPending}
        />

        {errors?.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isPending}
        className="
          h-11
          w-full
          rounded-xl
          bg-primary
          text-sm
          font-medium
          text-primary-foreground
          shadow-sm
          transition-all
          hover:opacity-90
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isPending
          ? "Saving Post..."
          : isEditing
            ? "Update Post"
            : "Create post"}
      </Button>
    </form>
  );
};

export default PostForm;
