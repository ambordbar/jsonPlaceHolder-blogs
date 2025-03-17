"use client";

import { useState } from "react";
import { handleSignIn, handleSignOut } from "@/app/action/auth";
import { useSession } from "next-auth/react";
import AuthLoader from "./AuthLoader";
import Image from "next/image";
import auth0 from "../../../../public/image/auth0-logo.png";

export default function SignInButton() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    setIsLoading(true);
    if (session) {
      await handleSignOut();
    } else {
      await handleSignIn();
    }
    setIsLoading(false);
  };

  return (
    <>
      <button
        onClick={handleAuth}
        className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Image src={auth0} alt="Auth0 Logo" width={30} />
        {session ? "Sign Out" : "Continue with Auth0"}
      </button>

      {isLoading && (
        <AuthLoader message={session ? "Signing out..." : "Signing in..."} />
      )}
    </>
  );
}
