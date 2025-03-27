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

const filePath = path.join(process.cwd(), "localData", "users.json");

export default async function getUsers() {
  let localUsers: User[] = [];
  try {
    const fileData = await fs.readFile(filePath, "utf-8");

    if (fileData.trim().length > 0) {
      localUsers = JSON.parse(fileData);
    } else {
      console.warn("Warning: users is empty. Using default value.");
      localUsers = [];
    }
  } catch (readError) {
    console.error("Error reading JSON file:", readError);
    localUsers = [];
  }
  return localUsers;
}
