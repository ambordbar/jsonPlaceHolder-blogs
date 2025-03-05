"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import successAnimation from "../../../public/success.json";

export default function ResultComponenet() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get("message");

    const [countdown, setCountdown] = useState(6);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirectTimer = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [message, router]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-4 bg-white border border-gray-200 text-gray-500 shadow-md rounded-xl p-6">
                <Lottie animationData={successAnimation} loop={false} className="w-64 h-64" />

                <p className="text-2xl text-gray-700 font-semibold">
                    {message ? message : "The action has failed"}
                </p>
                <p className="text-lg text-gray-500">
                    Redirecting in <span className="text-red-500 font-bold">{countdown}</span> seconds...
                </p>
            </div>
        </div>
    );
}
