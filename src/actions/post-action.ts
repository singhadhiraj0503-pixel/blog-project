"user server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

    // ---------------------------------------
    // 3. Validate form data on server
    // ---------------------------------------

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

    // ---------------------------------------
    // 4. Use validated data
    // ---------------------------------------

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
  } catch (error) {}
};
