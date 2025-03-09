"use server";

interface User {
    id: number;
    name: string;
    email: string;
    address: Address;
    phone: string;
}

interface Address {
    city: string;
}

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

export async function fetchSinglePostData(postId: number): Promise<Post | null> {
    try {
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            next: { tags: ["posts2"] },
            cache: "force-cache"
        });

        if (!postRes.ok) {
            if (postRes.status === 404) {
                console.warn(`Post with ID ${postId} not found.`);
                return null;
            }
            throw new Error("error to post data fetching");
        }

        const post: Post = await postRes.json();

        const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`, {
            next: { tags: ["users2"] },
            cache: "force-cache"
        });

        if (!userRes.ok) {
            if (userRes.status === 404) {
                console.warn(`User for post ID ${postId} not found.`);
                return null;
            }
            throw new Error("error to user data fetching");
        }

        const user: User = await userRes.json();

        const postWithAuthor: Post = {
            ...post,
            authorName: user.name,
            authorEmail: user.email,
            authorCity: user.address.city,
            authorPhone: user.phone,
        };

        return postWithAuthor;

    } catch (error) {
        console.error("Error in fetching data:", error);
        return null;
    }
}
