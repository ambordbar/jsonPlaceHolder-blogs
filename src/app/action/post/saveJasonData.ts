"use server";

import fs from "fs/promises";
import path from "path";
import { fetchPostsAndUsers } from "./post";

const filePath = path.join(process.cwd(), "localData", "posts.json");

interface Post {
  id?: number;
  title: string;
  body: string;
  authorName: string;
}

export async function saveJasonPost(postData: Post) {
  try {
    let posts: Post[] = [];
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      if (fileData.trim() === "") {
        posts = [];
      } else {
        posts = JSON.parse(fileData);
      }

      const allPosts = await fetchPostsAndUsers();
      const lastId = allPosts[allPosts.length - 1]?.id || 0;
      postData.id = lastId + 1;
    } catch (readError) {
      console.error("Error reading JSON file:", readError);
      posts = [];
      postData.id = 1;
    }

    posts.push(postData);

    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    return { success: true, message: "Post saved successfully!" };
  } catch (error) {
    console.error("Error saving post:", error);
    return { success: false, message: "Error saving post" };
  }
}
