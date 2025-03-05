"use server";

import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "localData", "postData.json");

export async function saveJasonPost(postData: { title: string; body: string; authorName: string }) {
    try {
        let posts = [];
        try {
            const fileData = await fs.readFile(filePath, "utf-8");
            posts = JSON.parse(fileData);
        } catch (readError) {
            console.error("Error reading JSON file:", readError);
            posts = [];
        }

        posts.push(postData);

        await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
        return { success: true, message: "Post saved successfully!" };
    } catch (error) {
        console.error("Error saving post:", error);
        return { success: false, message: "Error saving post" };
    }
}
