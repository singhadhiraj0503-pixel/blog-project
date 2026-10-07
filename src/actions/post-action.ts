"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { and, eq, ne } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";
import { posts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title should be at least 3 characters long")
    .max(255, "Title should not be more than 255 characters long."),

  description: z
    .string()
    .min(5, "Description should be at least 5 characters long")
    .max(255, "Description should not be more than 255 characters long."),

  content: z.string().min(10, "Content should be at least 10 characters long"),
});

export const createPost = async (formData: FormData) => {
  try {
    // get the current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must be logged in to create a post",
      };
    }

    // get the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    // Validate form data on server

    const validation = postSchema.safeParse({
      title,
      description,
      content,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Please fix the validation errors",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Use validated data

    const {
      title: validatedTitle,
      description: validatedDescription,
      content: validatedContent,
    } = validation.data;

    console.log({
      title: validatedTitle,
      description: validatedDescription,
      content: validatedContent,
      userId: session.user.id,
    });

    // create slug from post title
    const slug = slugify(validatedTitle);

    // check if the current slug already exists
    const existingPost = await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (existingPost.length > 0) {
      return {
        success: false,
        message:
          "A post with the same title already exists! Please try with a different title",
      };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title: validatedTitle,
        description: validatedDescription,
        content: validatedContent,
        slug,
        authorId: session.user.id,
      })
      .returning();

    // revalidate to homepage to get the latest posts
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully",
      slug,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create new post",
    };
  }
};

export const updatePost = async (postId: number, formData: FormData) => {
  try {
    // get the current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to edit a post",
      };
    }

    // get the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    // implement extra validation check
    const validation = postSchema.safeParse({
      title,
      description,
      content,
    });

    if (!validation.success) {
      return {
        success: false,
        message: "Please fix the validation errors",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const {
      title: validatedTitle,
      description: validatedDescription,
      content: validatedContent,
    } = validation.data;

    // generate slug from updated title
    const slug = slugify(validatedTitle);

    // Check if ANOTHER post already uses this slug
    const [duplicatePost] = await db
      .select({ id: posts.id })
      .from(posts)
      .where(and(eq(posts.slug, slug), ne(posts.id, postId)))
      .limit(1);

    if (duplicatePost) {
      return {
        success: false,
        message:
          "A post with the same title already exists! Please try with a different title",
      };
    }

    // Check whether the post exists
    const [existingPost] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!existingPost) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    // Make sure the logged-in user owns this post
    if (existingPost.authorId !== session.user.id) {
      return {
        success: false,
        message: "You are not authorized to edit this post",
      };
    }

    // Update the post
    const [updatedPost] = await db
      .update(posts)
      .set({
        title: validatedTitle,
        description: validatedDescription,
        content: validatedContent,
        slug: slug,
        updatedAt: new Date(),
      })
      .where(and(eq(posts.id, postId), eq(posts.authorId, session.user.id)))
      .returning();

    // revalidate to homepage to get the latest posts
    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post Updated Successfully",
      slug,
    };
  } catch (error) {
    console.log("failed to edit", error);

    return {
      success: false,
      message: "Failed to Update the post",
    };
  }
};

export const deletePost = async (postId: number) => {
  try {
    // get the current user from the session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must be logged in to delete a post",
      };
    }

    // Check whether the post exists
    const [existingPost] = await db
      .select({
        id: posts.id,
        slug: posts.slug,
        authorId: posts.authorId,
      })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!existingPost) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    // Check whether the current user owns the post
    if (existingPost.authorId !== session.user.id) {
      return {
        success: false,
        message: "You are not authorized to delete this post",
      };
    }

    // Delete the post
    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, postId))
      .returning({
        id: posts.id,
        slug: posts.slug,
      });

    // Make sure the post was actually deleted
    if (!deletedPost) {
      return {
        success: false,
        message: "Failed to delete the post",
      };
    }

    // revalidate to homepage after a post is deleted
    revalidatePath("/");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post deleted Successfully",
    };
  } catch (error) {
    console.error("Failed to delete post:", error);

    return {
      success: false,
      message: "Failed to delete the post",
    };
  }
};
