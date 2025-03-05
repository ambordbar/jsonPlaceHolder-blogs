'use client'
import { useState } from "react";
import Buttons from "../components/buttons";
import Modal from "../components/modal";
import { createPost } from "../action/createPost";
import { useRouter } from 'next/navigation';
import Loader from "../components/loader";
import { saveJasonPost } from "../action/saveJasonData";

interface createPostType {
    title: string;
    body: string;
    authorName: string;
}

export default function Dashboard() {
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleAddButton = () => {
        setShowAdd(true);
    }

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
        <div className="text-black xs:mx:6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40">
            {loading && <Loader size={50} />}
            <h1 className="text-center text-4xl font-bold text-gray-600">Welcome to dashboard</h1>
            <Buttons className="p-4 rounded-lg hover:shadow-xl w-full mt-10 transition-shadow duration-300" label={'Add'} onClick={handleAddButton} />
            <Modal
                isOpen={showAdd}
                formName="Add Article"
                onClose={() => setShowAdd(false)}
                onSubmit={handleModalSubmit}
                inputFields={[
                    { name: "Name", type: "text", placeholder: "title..." },
                    { name: "text", type: "text", placeholder: "this is a test..." },
                    { name: "Author", type: "text", placeholder: "amir mohammad bordbar" },
                ]}
            />
        </div>
    );
}
