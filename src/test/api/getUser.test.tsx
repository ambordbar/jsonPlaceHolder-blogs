import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import getUsers from "@/app/action/user/user";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface MockFileSystem {
  readFile: Mock;
}

const mockFs = {
  readFile: vi.fn(),
} as MockFileSystem;

vi.mock("fs/promises", async () => {
  return {
    default: {
      readFile: mockFs.readFile,
    },
    readFile: mockFs.readFile,
  };
});

describe("getUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return users when file exists and has data", async () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        password: "password123",
        role: "user",
      },
      {
        id: 2,
        name: "Jane",
        email: "jane@gmail.com",
        password: "password456",
        role: "admin",
      },
    ];

    mockFs.readFile.mockResolvedValue(JSON.stringify(mockUsers));

    const result = await getUsers();

    expect(result).toEqual(mockUsers);
    expect(mockFs.readFile).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when file is empty", async () => {
    mockFs.readFile.mockResolvedValue("");

    const result = await getUsers();

    expect(result).toEqual([]);
    expect(mockFs.readFile).toHaveBeenCalledTimes(1);
  });

  it("should return empty array when file read fails", async () => {
    mockFs.readFile.mockRejectedValue(new Error("File read error"));

    const result = await getUsers();

    expect(result).toEqual([]);
    expect(mockFs.readFile).toHaveBeenCalledTimes(1);
  });
});
