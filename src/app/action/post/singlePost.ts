"use server";
import fs from "fs/promises";
import path from "path";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  authorName?: string;
  authorEmail?: string;
  authorCity?: string;
  authorPhone?: string;
}

export async function fetchSinglePostData(
  postId: number
): Promise<Post | null> {
  try {
    const filePath = path.join(process.cwd(), "localData", "posts.json");
    const fileData = await fs.readFile(filePath, "utf-8");

    if (fileData.trim() === "") {
      console.warn("Local data file is empty");
      return null;
    }

    const posts: Post[] = JSON.parse(fileData);
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      console.warn(`Post with ID ${postId} not found in local data.`);
      return null;
    }

    return post;
  } catch (error) {
    console.error("Error reading local data:", error);
    return null;
  }
}
