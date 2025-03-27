"use server";

import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export async function updateUser(userId: number, data: UpdateUserData) {
  try {
    const filePath = path.join(process.cwd(), "localData", "users.json");

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const users: User[] = JSON.parse(fileContent);

      // Find user index
      const userIndex = users.findIndex((user) => user.id === userId);

      if (userIndex === -1) {
        return { success: false, error: "User not found" };
      }

      // Update user data
      const updatedUser = { ...users[userIndex] };

      if (data.name) updatedUser.name = data.name;
      if (data.email) updatedUser.email = data.email;
      if (data.role) updatedUser.role = data.role;

      // Hash new password if provided
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(data.password, salt);
      }

      // Update user in array
      users[userIndex] = updatedUser;

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(users, null, 2));

      return { success: true, user: updatedUser };
    } catch {
      return { success: false, error: "User file not found" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}
