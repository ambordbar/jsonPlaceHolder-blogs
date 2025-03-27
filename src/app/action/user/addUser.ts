"use server";

import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export async function addUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  try {
    const filePath = path.join(process.cwd(), "localData", "users.json");
    let users: User[] = [];

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      users = JSON.parse(fileContent);
    } catch {
      // File doesn't exist or is empty, start with empty array
      users = [];
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const newId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    const newUser: User = {
      id: newId,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    };

    users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, error: "Failed to add user" };
  }
}
