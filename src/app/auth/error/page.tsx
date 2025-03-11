"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Authentication Error
          </h2>
          <p className="text-red-500 mb-4 font-bold">
            {error || "An error occurred during authentication"}
          </p>
          <Link
            href="/login"
            className="inline-block bg-pink-500 hover:bg-customCyen text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
