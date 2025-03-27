"use server";
import { fetchPostsAndUsers } from "@/app/action/post/post";
import fs from "fs/promises";
import path from "path";

interface Post {
  id: number;
  title: string;
  body: string;
  authorName: string;
}

export async function deletePost(id: number) {
  try {
    // ارسال درخواست حذف به API
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete post from API");
    }

    // حذف پست از فایل لوکال
    await deleteFromLocalData(id);

    // حذف پست از لیست fetchPostsAndUsers
    const posts = await fetchPostsAndUsers();
    const updatedPosts = posts.filter((post) => post.id !== id);

    // ذخیره لیست بروز شده در فایل
    const filePath = path.join(process.cwd(), "localData", "posts.json");
    await fs.writeFile(filePath, JSON.stringify(updatedPosts, null, 2));

    return { success: true, message: "Post deleted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the post");
  }
}

async function deleteFromLocalData(id: number) {
  const filePath = path.join(process.cwd(), "localData", "posts.json");
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    if (fileData.trim() !== "") {
      const localPosts: Post[] = JSON.parse(fileData);
      const localPostIndex = localPosts.findIndex(
        (post: Post) => post.id === id
      );

      if (localPostIndex !== -1) {
        localPosts.splice(localPostIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(localPosts, null, 2));
      }
    }
  } catch (readError) {
    console.error("Error handling local data:", readError);
  }
}
