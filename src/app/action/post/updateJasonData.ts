"use server";

import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "localData", "posts.json");

interface Post {
  id?: number;
  title: string;
  body: string;
  authorName: string;
}

export async function updateJasonPost(postData: Post) {
  try {
    let posts: Post[] = [];

    // Read existing posts
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      if (fileData.trim() !== "") {
        posts = JSON.parse(fileData);
      }
    } catch (readError) {
      console.error("Error reading JSON file:", readError);
      return { success: false, message: "Error reading posts file" };
    }

    // Find the index of the post with matching ID
    const postIndex = posts.findIndex((post) => post.id === postData.id);

    if (postIndex === -1) {
      return { success: false, message: "Post not found" };
    }

    // Update the existing post with new data
    posts[postIndex] = {
      ...posts[postIndex],
      title: postData.title,
      body: postData.body,
      authorName: postData.authorName,
    };

    // Write updated posts back to file
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    return { success: true, message: "Post updated successfully!" };
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, message: "Error updating post" };
  }
}
