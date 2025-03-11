"use client";
import { useState } from "react";
import Buttons from "@/app/components/dynamic-component/buttons";
import Modal from "@/app/components/dynamic-component/modal";
import { createPost } from "../action/createPost";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/dynamic-component/loader";
import { saveJasonPost } from "../action/saveJasonData";
import { Session } from "next-auth";

interface createPostType {
  title: string;
  body: string;
  authorName: string;
}

interface DashboardClientProps {
  session: Session;
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleModalSubmit = async (data: Record<string, string>) => {
    const postData: createPostType = {
      title: data.Name,
      body: data.text,
      authorName: data.Author,
    };

    setLoading(true);
    try {
      const response = await createPost(postData);
      if (response) {
        await saveJasonPost(postData);
        router.replace(`/resultPage?message=Post%20created%20successfully!`);
      } else {
        console.error("Failed to create post:", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center text-black xs:mx-6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40">
        {loading && <Loader size={50} />}
        <h1 className="text-center flex text-4xl font-bold text-gray-200">
          Welcome
          <div className="bg-clip-text ms-2 text-transparent bg-gradient-to-r from-purple-800 via-pink-500 to-pink-500">
            {session.user?.name}
          </div>
        </h1>
        <Buttons
          className="p-4 rounded-lg shadow-2xl shadow-pink-500 border-b-4 hover:shadow-xl hover:border-pink-500 hover:text-pink-500 transition-shadow font-semibold text-whiteTitle w-36 h-36 mt-10 duration-700"
          label={"Add"}
          onClick={() => setShowAdd(true)}
        />
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
                Author: formData.get("Author") as string,
              };
              handleModalSubmit(data);
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
              <input
                name="Author"
                type="text"
                placeholder="amir mohammad bordbar"
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-pink-500 text-white p-2 rounded hover:bg-customCyen"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
