"use server";

import fs from "fs/promises";
import path from "path";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface DeleteUserResponse {
  success: boolean;
  error?: string;
}

export async function deleteUser(userId: number): Promise<DeleteUserResponse> {
  try {
    const filePath = path.join(process.cwd(), "localData", "users.json");

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return { success: false, error: "User file not found" };
    }

    const fileData = await fs.readFile(filePath, "utf-8");
    if (!fileData.trim()) {
      return { success: false, error: "No users found" };
    }

    const users: User[] = JSON.parse(fileData);
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return { success: false, error: "User not found" };
    }

    users.splice(userIndex, 1);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}
