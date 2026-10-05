"use client";

import React, { useTransition } from "react";
import z from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { title } from "process";
import { error } from "console";

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

const PostForm = (props: Props) => {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  const onFormSubmit = async (data: PostFormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} action="" className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          disabled={isPending}
        />
        {errors?.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Write your description"
          {...register("description")}
          disabled={isPending}
        />
        {errors?.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          className="min-h-60 resize-none"
          placeholder="Start writing your content ..."
          {...register("content")}
          disabled={isPending}
        />
        {errors?.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full py-2 text-[1rem]"
      >
        {isPending ? "Saving Post..." : "Create Post"}
      </Button>
    </form>
  );
};

export default PostForm;
