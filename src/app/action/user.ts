"use server";

export async function fetchUserInfo(userId: string) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

        if (!res.ok) throw new Error("error in getting data");

        return await res.json();

    } catch (error) {
        console.error("error in fetching data", error);
        return null;
    }
}
