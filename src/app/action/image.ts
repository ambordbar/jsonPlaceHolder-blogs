'use server'

export default async function fetchImages() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/photos");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return { error: "Failed to fetch data" };
    }
}
