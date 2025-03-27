"use server";
interface createPostType {
  title: string;
  body: string;
  authorName: string;
}
export async function createPost(data: createPostType) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while creating the post");
  }
}
