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
  let users: User[] = [];
  try {
    console.log("Adding user:", data);
    const filePath = path.join(process.cwd(), "localData", "users.json");

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      users = JSON.parse(fileContent);
    } catch {
      users = [];
    }

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
    console.log("newUser", newUser);
    users.push(newUser);
    console.log("users", users);
    console.log("users written to file");
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return { success: true, user: newUser };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, error: "Failed to add user" };
  }
}
