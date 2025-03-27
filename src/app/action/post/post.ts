"use server";
import fs from "fs/promises";
import path from "path";

interface User {
  id: number;
  name: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  authorName?: string;
}

const filePath = path.join(process.cwd(), "localData", "posts.json");

async function getLocalData() {
  let localPosts: Post[] = [];
  try {
    const fileData = await fs.readFile(filePath, "utf-8");

    if (fileData.trim().length > 0) {
      localPosts = JSON.parse(fileData);
    } else {
      console.warn("Warning: postData.json is empty. Using default value.");
      localPosts = [];
    }
  } catch (readError) {
    console.error("Error reading JSON file:", readError);
    localPosts = [];
  }
  return localPosts;
}

async function cacheLocalData() {
  return getLocalData();
}

export async function fetchPostsAndUsers(): Promise<Post[]> {
  try {
    const localPosts: Post[] = await cacheLocalData();

    const [postsRes, usersRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts", {}),
      fetch("https://jsonplaceholder.typicode.com/users", {}),
    ]);

    if (!postsRes.ok || !usersRes.ok) {
      throw new Error("Error fetching data from API");
    }

    const posts: Post[] = await postsRes.json();
    const users: User[] = await usersRes.json();

    const postsWithAuthors: Post[] = posts.map((post) => ({
      ...post,
      authorName:
        users.find((user) => user.id === post.userId)?.name || "undefined name",
    }));

    const allPosts =
      localPosts.length !== 0
        ? [...postsWithAuthors, ...localPosts]
        : [...localPosts, ...postsWithAuthors];

    return allPosts;
  } catch (error) {
    console.error("Error fetching posts and users:", error);
    return [];
  }
}
