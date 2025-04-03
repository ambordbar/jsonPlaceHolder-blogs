"use client";
import { useState, useEffect } from "react";
import Buttons from "@/app/components/dynamic-component/buttons";
import { createPost } from "../action/post/createPost";
import { deletePost } from "../action/post/deletePost";
import { useRouter } from "next/navigation";
import { saveJasonPost } from "../action/post/saveJasonData";
import { updateJasonPost } from "../action/post/updateJasonData";
import { Session } from "next-auth";
import { fetchPostsAndUsers } from "@/app/action/post/post";
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

interface Post {
  id: number;
  title: string;
  body: string;
  authorName: string;
}

interface DashboardClientProps {
  session: Session;
}

async function getLocalData() {
  const posts = await fetchPostsAndUsers();
  return posts;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [editFormData, setEditFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    const loadUserPosts = async () => {
      try {
        const allPosts = await getLocalData();
        const filteredPosts = allPosts
          .filter((post) => post.authorName === session.user?.name)
          .map((post) => ({
            id: post.id,
            title: post.title,
            body: post.body,
            authorName: post.authorName || "",
          }));
        setUserPosts(filteredPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPosts();
  }, [session.user?.name]);

  const handleAddPost = async (data: Record<string, string>) => {
    const postData: Post = {
      id: 0,
      title: data.Name,
      body: data.text,
      authorName: session.user?.name || "unknown",
    };

    try {
      router.replace(`/resultPage?message=Post%20created%20successfully!`);
      const response = await createPost(postData);
      if (response) {
        await saveJasonPost(postData);
        setUserPosts((prev) => [...prev, postData]);
        setShowAdd(false);
      } else {
        console.error("Failed to create post:", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      const result = await deletePost(postId);
      if (result.success) {
        setUserPosts((prev) => prev.filter((post) => post.id !== postId));
        setShowDelete(false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleSinglePage = (id: number) => {
    const pagePath = "/Posts";
    router.push(`${pagePath}/${id}`);
  };

  const handleEditPost = async (
    postId: number,
    data: { title: string; body: string }
  ) => {
    const postData: Post = {
      id: postId,
      title: data.title,
      body: data.body,
      authorName: session.user?.name || "",
    };

    try {
      await updateJasonPost(postData);
      setUserPosts((prev) =>
        prev.map((post) => (post.id === postId ? postData : post))
      );
      setShowEdit(false);
      router.replace(`/resultPage?message=Post%20updated%20successfully!`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center text-black xs:mx-6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40 mb-20">
        <h1 className="text-center flex flex-col gap-4 lg:flex-row text-2xl lg:text-4xl font-bold text-gray-200">
          Welcome
          <div className="bg-clip-text ms-2 text-transparent bg-gradient-to-r from-purple-800 via-pink-500 to-pink-500">
            {session.user?.name}
          </div>
        </h1>

        <div className="grid grid-rows-3 md:grid-rows-1 md:grid-cols-3 w-full gap-4 md:gap-20 md:px-18 lg:px-24 xl:px-36">
          <Buttons
            className="p-4 rounded-lg border-b-4 border-green-500 text-green-500 hover:shadow-2xl hover:shadow-green-500 hover:text-green-200 font-semibold w-full md:w-36 h-24 md:h-36 mt-10 duration-700"
            label={"Add"}
            onClick={() => setShowAdd(true)}
          />

          <Buttons
            className="p-4 rounded-lg border-b-4 border-red-500 text-red-500 hover:shadow-2xl hover:shadow-red-500 hover:text-red-200 font-semibold w-full md:w-36 h-24 md:h-36 mt-10 duration-700"
            label={"Delete"}
            onClick={() => setShowDelete(true)}
          />

          <Buttons
            className="p-4 rounded-lg border-b-4 border-yellow-500 text-yellow-500 hover:shadow-2xl hover:shadow-yellow-500 hover:text-yellow-200 font-semibold w-full md:w-36 h-24 md:h-36 mt-10 duration-700"
            label={"Edit"}
            onClick={() => setShowEdit(true)}
          />
        </div>

        <div className="w-full mt-20">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Your Posts</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader size="md" />
            </div>
          ) : userPosts.length > 0 ? (
            <div className="mt-2 w-full p-1 space-y-2 border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:border-neutral-700">
              {userPosts.map((post, index) => (
                <div
                  key={index}
                  className="py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-500/10 rounded-lg focus:outline-hidden focus:bg-gray-600 duration-300"
                  onClick={() => handleSinglePage(post.id)}
                >
                  <div className="flex items-center">
                    <div className="me-2">
                      <div className="shrink-0 size-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-lg font-semibold">
                        {post.title[0].toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-800 dark:text-neutral-200">
                        {post.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-neutral-400">
                        {post.body.substring(0, 60)}...
                      </div>
                    </div>
                    <div className="ms-auto flex items-center">
                      <button
                        onClick={() => handleDeletePost(post.id)}
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
          formName="Add Article"
          onClose={() => setShowAdd(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const data: Record<string, string> = {
                Name: formData.get("Name") as string,
                text: formData.get("text") as string,
              };
              handleAddPost(data);
            }}
          >
            <div className="space-y-4">
              <input
                name="Name"
                type="text"
                placeholder="title..."
                className="w-full p-2 border rounded"
              />
              <input
                name="text"
                type="text"
                placeholder="this is a test..."
                className="w-full p-2 border rounded"
              />
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
          formName="Delete Article"
          onClose={() => setShowDelete(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const selectedPostId = parseInt(
                formData.get("postToDelete") as string
              );
              handleDeletePost(selectedPostId);
            }}
          >
            <div className="space-y-4">
              <select
                name="postToDelete"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                defaultValue=""
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="" disabled>
                  Select a post to delete...
                </option>
                {userPosts.map((post, index) => (
                  <option
                    key={index}
                    value={post.id}
                    className="hover:bg-gray-100"
                  >
                    {post.title}
                  </option>
                ))}
              </select>
              {userPosts.length === 0 && (
                <p className="text-center text-gray-500">
                  No posts found for this user.
                </p>
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
          formName="Edit Article"
          onClose={() => {
            setShowEdit(false);
            setSelectedPostId("");
            setEditFormData({ title: "", body: "" });
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const selectedId = parseInt(selectedPostId);
              if (selectedId) {
                handleEditPost(selectedId, {
                  title: editFormData.title,
                  body: editFormData.body,
                });
              }
            }}
          >
            <div className="space-y-4">
              <select
                name="postToEdit"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                value={selectedPostId}
                onChange={(e) => {
                  setSelectedPostId(e.target.value);
                  const selectedPost = userPosts.find(
                    (post) => post.id === parseInt(e.target.value)
                  );
                  if (selectedPost) {
                    setEditFormData({
                      title: selectedPost.title,
                      body: selectedPost.body,
                    });
                  }
                }}
                style={{
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <option value="">Select a post to edit...</option>
                {userPosts.map((post, index) => (
                  <option
                    key={index}
                    value={post.id}
                    className="hover:bg-gray-100"
                  >
                    {post.title}
                  </option>
                ))}
              </select>
              {userPosts.length === 0 && (
                <p className="text-center text-gray-500">
                  No posts found for this user.
                </p>
              )}

              <input
                name="Name"
                type="text"
                placeholder="title..."
                className="w-full p-2 border rounded"
                disabled={!selectedPostId}
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <input
                name="text"
                type="text"
                placeholder="this is a test..."
                className="w-full p-2 border rounded"
                disabled={!selectedPostId}
                value={editFormData.body}
                onChange={(e) =>
                  setEditFormData((prev) => ({ ...prev, body: e.target.value }))
                }
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 font-semibold bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700 duration-500"
            >
              Update Post
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
}
