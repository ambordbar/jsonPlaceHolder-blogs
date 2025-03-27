"use client";
import { useState, useEffect } from "react";
import Buttons from "@/app/components/dynamic-component/buttons";
import Modal from "@/app/components/dynamic-component/modal";
import { addUser } from "../action/user/addUser";
import { deleteUser } from "../action/user/deleteUser";
import { updateUser } from "../action/user/updateUser";
import { Session } from "next-auth";
import getUsers from "@/app/action/user/user";
import Loader from "@/app/components/ui/loader";
import DeleteIcon from "../../../public/svg/delete.svg";
import Image from "next/image";

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
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    showPassword: false,
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

  const handleAddUser = async (data: Record<string, string>) => {
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
    data: Record<string, string>
  ) => {
    try {
      if (!userId) {
        alert("Please select a user to edit");
        return;
      }

      const response = await updateUser(userId, {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: Record<string, string> = {
                name: formData.get("name") as string,
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                role: formData.get("role") as string,
              };
              handleAddUser(data);
            }}
          >
            <div className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Name..."
                className="w-full p-2 border rounded"
              />
              <input
                name="email"
                type="email"
                placeholder="Email..."
                className="w-full p-2 border rounded"
              />
              <input
                name="password"
                type="password"
                placeholder="Password..."
                className="w-full p-2 border rounded"
              />
              <select name="role" className="w-full p-2 border rounded">
                <option disabled value="">
                  Select the user role....
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                className="w-full font-semibold bg-green-500 text-white p-2 rounded hover:bg-green-700 duration-300"
              >
                Submit
              </button>
            </div>
          </form>
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
              showPassword: false,
            });
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const selectedId = parseInt(selectedUserId);
              if (selectedId) {
                handleEditUser(selectedId, {
                  name: editFormData.name,
                  email: editFormData.email,
                  password: editFormData.password,
                  role: editFormData.role,
                });
              }
            }}
          >
            <div className="space-y-4">
              <select
                name="userToEdit"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                value={selectedUserId}
                onChange={(e) => {
                  setSelectedUserId(e.target.value);
                  const selectedUser = userData.find(
                    (user) => user.id === parseInt(e.target.value)
                  );
                  if (selectedUser) {
                    setEditFormData({
                      name: selectedUser.name,
                      email: selectedUser.email,
                      password: selectedUser.password,
                      role: selectedUser.role,
                      showPassword: false,
                    });
                  }
                }}
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="">Select a user to edit...</option>
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

              <input
                name="name"
                type="text"
                placeholder="Name..."
                className="w-full p-2 border rounded"
                disabled={!selectedUserId}
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <input
                name="email"
                type="email"
                placeholder="Email..."
                className="w-full p-2 border rounded"
                disabled={!selectedUserId}
                value={editFormData.email}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <div className="relative">
                <input
                  name="password"
                  type={editFormData.showPassword ? "text" : "password"}
                  placeholder="Password..."
                  className="w-full p-2 border rounded"
                  disabled={!selectedUserId}
                  value={editFormData.password}
                  onChange={(e) =>
                    setEditFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setEditFormData((prev) => ({
                      ...prev,
                      showPassword: !prev.showPassword,
                    }))
                  }
                >
                  {editFormData.showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-5 h-5`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <select
                name="role"
                className="w-full p-2 border rounded"
                disabled={!selectedUserId}
                value={editFormData.role}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-4 font-semibold bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 duration-500"
            >
              Update User
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
