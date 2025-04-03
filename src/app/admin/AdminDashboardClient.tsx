"use client";
import { useState, useEffect } from "react";
import Buttons from "@/app/components/dynamic-component/buttons";
import { addUser } from "../action/user/addUser";
import { deleteUser } from "../action/user/deleteUser";
import { updateUser } from "../action/user/updateUser";
import { Session } from "next-auth";
import getUsers from "@/app/action/user/user";
import Loader from "@/app/components/ui/loader";
import DeleteIcon from "../../../public/svg/delete.svg";
import Image from "next/image";
import dynamic from "next/dynamic";

const Modal = dynamic(
  () => import("@/app/components/dynamic-component/modal"),
  {
    loading: () => <Loader />,
    ssr: false,
  }
);

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface DashboardClientProps {
  session: Session;
}

async function getLocalUser() {
  const users = await getUsers();
  return users;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [addFormData, setAddFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [editFormData, setEditFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    addForm: { email: "", password: "" },
    editForm: { email: "", password: "" },
  });

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const allPosts = await getLocalUser();
        const filteredPosts = allPosts.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role || "",
        }));
        setUserData(filteredPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPosts();
  }, [session.user?.name]);

  const validateForm = (
    email: string,
    password: string,
    formType: "addForm" | "editForm"
  ) => {
    const errors = {
      email: "",
      password: "",
    };

    if (!email.endsWith("@gmail.com")) {
      errors.email = "Email must end with @gmail.com";
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setValidationErrors((prev) => ({
      ...prev,
      [formType]: errors,
    }));

    return !errors.email && !errors.password;
  };

  const handleAddUser = async (data: Record<string, string>) => {
    if (!validateForm(data.email, data.password, "addForm")) {
      return;
    }

    try {
      const response = await addUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      console.log(response);
      if (response.success) {
        setUserData((prev) => [...prev, response.user!]);
        setShowAdd(false);
      } else {
        console.error("Failed to create user:", response.error);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      if (!userId || isNaN(userId)) {
        console.error("Invalid user ID:", userId);
        alert("Please select a valid user to delete");
        return;
      }

      console.log("Attempting to delete user with ID:", userId);
      const result = await deleteUser(userId);
      console.log("Delete result:", result);

      if (result.success) {
        setUserData((prev) => prev.filter((user) => user.id !== userId));
        setShowDelete(false);
        alert("User deleted successfully");
      } else {
        console.error("Failed to delete user:", result.error);
        alert(result.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
    }
  };

  const handleEditUser = async (
    userId: number,
    data: {
      name: string;
      email: string;
      password: string;
      role: string;
    }
  ) => {
    if (!validateForm(data.email, data.password, "editForm")) {
      return;
    }

    try {
      if (!userId) {
        alert("Please select a user to edit");
        return;
      }

      const response = await updateUser(userId, data);

      if (response.success && response.user) {
        setUserData((prev) =>
          prev.map((user) => (user.id === userId ? response.user : user))
        );
        setShowEdit(false);
        alert("User updated successfully");
      } else {
        console.error("Failed to update user:", response.error);
        alert(response.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occurred while updating the user");
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center text-black xs:mx-6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40 mb-20">
        <h1 className="text-center flex flex-col gap-4 lg:flex-row text-2xl lg:text-4xl font-bold text-gray-200">
          Welcome Admin
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-purple-800 via-pink-500 to-pink-500">
            {session.user?.name}
          </div>
        </h1>

        <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 w-full gap-4 md:gap-20 md:px-18 lg:px-24 xl:px-36">
          <Buttons
            className="p-4 rounded-lg border-b-4 border-green-500 text-green-500 hover:shadow-2xl hover:shadow-green-500 hover:text-green-200 font-semibold w-full md:w-36 h-24 md:h-36 mt-10 duration-700"
            label={"Add User"}
            onClick={() => setShowAdd(true)}
          />

          <Buttons
            className="p-4 rounded-lg border-b-4 border-red-500 text-red-500 hover:shadow-2xl hover:shadow-red-500 hover:text-red-200 font-semibold w-full md:w-36 h-24 md:h-36 mt-10 duration-700"
            label={"Delete User"}
            onClick={() => setShowDelete(true)}
          />

          <Buttons
            className="p-4 rounded-lg border-b-4 border-yellow-500 text-yellow-500 hover:shadow-2xl hover:shadow-yellow-500 hover:text-yellow-200 font-semibold w-full md:w-36 h-24 md:h-36 mt-10 duration-700"
            label={"Edit User"}
            onClick={() => setShowEdit(true)}
          />
        </div>

        <div className="w-full mt-20">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Your Posts</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader size="md" />
            </div>
          ) : userData.length > 0 ? (
            <div className="mt-2 w-full p-1 space-y-2 border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:border-neutral-700">
              {userData.map((user, index) => (
                <div
                  key={index}
                  className="py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-500/10 rounded-lg focus:outline-hidden focus:bg-gray-600 duration-300"
                >
                  <div className="flex items-center">
                    <div className="me-2">
                      <div className="shrink-0 size-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg font-semibold">
                        {user.name ? user.name[0].toUpperCase() : "?"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-800 dark:text-neutral-200">
                        {user.name || "Unnamed User"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-neutral-400">
                        {user.email
                          ? `${user.email.substring(0, 60)}...`
                          : "No email"}
                      </div>
                    </div>
                    <div className="ms-auto flex items-center">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Image src={DeleteIcon} alt="delete" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-neutral-400 p-4 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
              No posts yet. Click the Add button to create your first post!
            </div>
          )}
        </div>

        <Modal
          isOpen={showAdd}
          formName="Add User"
          onClose={() => setShowAdd(false)}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name..."
              className="p-2 rounded-lg border border-gray-300"
              onChange={(e) =>
                setAddFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <div>
              <input
                type="email"
                placeholder="Email..."
                className="p-2 rounded-lg border border-gray-300 w-full"
                onChange={(e) =>
                  setAddFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              {validationErrors.addForm.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.addForm.email}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password..."
                className="p-2 rounded-lg border border-gray-300 w-full"
                onChange={(e) =>
                  setAddFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              {validationErrors.addForm.password && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.addForm.password}
                </p>
              )}
            </div>
            <select
              className="p-2 rounded-lg border border-gray-300"
              onChange={(e) =>
                setAddFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <Buttons
              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
              label="Submit"
              onClick={() => handleAddUser(addFormData)}
            />
          </div>
        </Modal>

        <Modal
          isOpen={showDelete}
          formName="Delete User"
          onClose={() => setShowDelete(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const selectedValue = formData.get("userToDelete");
              console.log("Selected value:", selectedValue);

              if (!selectedValue) {
                alert("Please select a user to delete");
                return;
              }

              const userId = Number(selectedValue);
              if (isNaN(userId)) {
                alert("Invalid user selected");
                return;
              }

              handleDeleteUser(userId);
            }}
          >
            <div className="space-y-4">
              <select
                name="userToDelete"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                defaultValue=""
                required
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Select a user to delete...
                </option>
                {userData.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                    className="hover:bg-gray-100"
                  >
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              {userData.length === 0 && (
                <p className="text-center text-gray-500">No users found.</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-4 font-semibold bg-red-500 text-white p-2 rounded hover:bg-red-700 duration-500"
            >
              Delete
            </button>
          </form>
        </Modal>

        <Modal
          isOpen={showEdit}
          formName="Edit User"
          onClose={() => {
            setShowEdit(false);
            setSelectedUserId("");
            setEditFormData({
              name: "",
              email: "",
              password: "",
              role: "",
            });
          }}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name..."
              value={editFormData.name}
              className="p-2 rounded-lg border border-gray-300"
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <div>
              <input
                type="email"
                placeholder="Email..."
                value={editFormData.email}
                className="p-2 rounded-lg border border-gray-300 w-full"
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              {validationErrors.editForm.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.editForm.email}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password..."
                value={editFormData.password}
                className="p-2 rounded-lg border border-gray-300 w-full"
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              {validationErrors.editForm.password && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.editForm.password}
                </p>
              )}
            </div>
            <select
              value={editFormData.role}
              className="p-2 rounded-lg border border-gray-300"
              onChange={(e) =>
                setEditFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <Buttons
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              label="Update"
              onClick={() =>
                handleEditUser(Number(selectedUserId), editFormData)
              }
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}
