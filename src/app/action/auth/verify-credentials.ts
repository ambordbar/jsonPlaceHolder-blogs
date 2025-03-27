"use server";

import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function verifyCredentials(email: string, password: string) {
  try {
    // Read users from JSON file
    const filePath = path.join(process.cwd(), "localData", "users.json");
    let users: User[] = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      users = JSON.parse(fileContent);
    } catch {
      // File doesn't exist or is empty, start with empty array
      users = [];
    }

    // Find user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, error: "Invalid password" };
    }

    // Return success with user data (without password)
    const { ...userWithoutPassword } = user;
    return {
      success: true,
      user: userWithoutPassword,
      redirect: "/dashboard",
    };
  } catch (error) {
    console.error("Error verifying credentials:", error);
    return {
      success: false,
      error: "An error occurred while verifying credentials",
    };
  }
}
