import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminDashboardClient from "@/app/admin/AdminDashboardClient";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { Session } from "next-auth";
import Image from "next/image";

// Set test environment
vi.stubEnv("NODE_ENV", "test");

// Mock components
vi.mock("@/app/components/dynamic-component/buttons", () => ({
  default: ({
    label,
    onClick,
    className,
  }: {
    label: string;
    onClick: () => void;
    className: string;
  }) => (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  ),
}));

vi.mock("@/app/components/dynamic-component/modal", () => ({
  default: ({
    children,
    isOpen,
  }: {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
  }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}));

vi.mock("@/app/components/ui/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock next/image
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: string | number | boolean | undefined;
  }) => <Image src={src} alt={alt} {...props} />,
}));

// Mock actions
vi.mock("@/app/action/user/addUser", () => ({
  addUser: vi.fn().mockResolvedValue({
    success: true,
    user: { id: 1, name: "John Doe", email: "john@gmail.com", role: "user" },
  }),
}));

vi.mock("@/app/action/user/deleteUser", () => ({
  deleteUser: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("@/app/action/user/updateUser", () => ({
  updateUser: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("@/app/action/user/user", () => ({
  default: vi
    .fn()
    .mockResolvedValue([
      { id: 1, name: "Test User", email: "test@gmail.com", role: "user" },
    ]),
}));

const mockSession: Session = {
  user: {
    name: "Test User",
    email: "test@example.com",
    id: "101",
    role: "admin",
  },
  expires: "2025-04-31T06:16:00.652Z",
};

describe("AdminDashboardClient", () => {
  it("renders welcome message with admin name", async () => {
    render(<AdminDashboardClient session={mockSession} />);
    await waitFor(() => {
      expect(screen.getByText("Welcome Admin")).toBeInTheDocument();
      expect(screen.getByText("Test Admin")).toBeInTheDocument();
    });
  });

  it("validates email format in add user form", async () => {
    render(<AdminDashboardClient session={mockSession} />);

    fireEvent.click(screen.getByText("Add User"));
    const emailInput = screen.getByPlaceholderText("Email...");
    fireEvent.change(emailInput, { target: { value: "invalid@yahoo.com" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Email must end with @gmail.com")
      ).toBeInTheDocument();
    });
  });

  it("validates password length in add user form", async () => {
    render(<AdminDashboardClient session={mockSession} />);

    fireEvent.click(screen.getByText("Add User"));

    const passwordInput = screen.getByPlaceholderText("Password...");
    fireEvent.change(passwordInput, { target: { value: "123" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long")
      ).toBeInTheDocument();
    });
  });

  it("submits form with valid data", async () => {
    render(<AdminDashboardClient session={mockSession} />);

    fireEvent.click(screen.getByText("Add User"));

    fireEvent.change(screen.getByPlaceholderText("Name..."), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email..."), {
      target: { value: "john@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password..."), {
      target: { value: "password123" },
    });

    const roleSelect = screen.getByRole("combobox");
    fireEvent.change(roleSelect, { target: { value: "user" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {});
  });

  it("renders delete icon correctly", async () => {
    render(<AdminDashboardClient session={mockSession} />);

    await waitFor(() => {
      const deleteIcon = screen.getByAltText("delete");
      expect(deleteIcon).toBeInTheDocument();
      expect(deleteIcon.tagName.toLowerCase()).toBe("img");
    });
  });
});
