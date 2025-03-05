'use client'
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 50);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const resSignIn = await signIn("credentials", {
                email,
                id,
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
        <div
            className="fixed inset-0 flex justify-center items-center z-50"
            onClick={() => router.back()}
        >

            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-md"></div>
            <div
                className={`bg-white p-6 rounded-lg w-96 shadow-lg z-50 transform transition-all duration-300 
                    ${isVisible ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="example@gmail.com"
                        className="w-full p-2 mb-4 border rounded-md text-gray-500"
                    />
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                        placeholder="Enter your ID"
                        className="w-full p-2 mb-4 border rounded-md text-gray-500"
                    />
                    {error && <div className="text-red-500 text-sm my-2">{error}</div>}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-800 mx-auto w-full mt-5 px-4 py-2 text-white rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
