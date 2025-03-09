'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "../components/modal";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleModalSubmit = async (formData: Record<string, string>) => {
        try {
            const resSignIn = await signIn("credentials", {
                email: formData.email,
                id: formData.id,
                redirect: false,
            });

            if (resSignIn?.error) {
                setError("Email or ID is not valid");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("An error occurred. Please try again later.");
        }
    };

    return (
        <>
            {error && (
                <div className="fixed top-10 w-full text-center text-red-500">
                    {error}
                </div>
            )}
            <Modal
                isOpen={true}
                formName="Login"
                onClose={() => router.back()}
                onSubmit={handleModalSubmit}
                inputFields={[
                    { name: "email", type: "email", placeholder: "example@gmail.com" },
                    { name: "id", type: "text", placeholder: "Enter your ID" },
                ]}
            />
        </>
    );
}
