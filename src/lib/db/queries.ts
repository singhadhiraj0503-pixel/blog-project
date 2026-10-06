import { desc, eq } from "drizzle-orm";
import { db } from ".";
import { posts, users } from "./schema";

export const getAllPosts = async () => {
  try {
    const allPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        slug: posts.slug,
        content: posts.content,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,

        author: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt));

    return allPosts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);

    return [];
  }
};

export const getPostBySlug = async (slug: string) => {
  try {
    const [post] = await db
      .select({
        id: posts.id,
        title: posts.title,
        description: posts.description,
        slug: posts.slug,
        content: posts.content,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,

        author: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .where(eq(posts.slug, slug))
      .limit(1);

    return post ?? null;
  } catch (error) {
    console.error("Failed to fetch post by slug:", error);
    throw error;
  }
};
