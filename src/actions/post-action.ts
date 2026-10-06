"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { eq } from "drizzle-orm";
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
