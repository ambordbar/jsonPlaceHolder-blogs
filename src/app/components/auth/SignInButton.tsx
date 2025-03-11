"use client";

import { handleSignIn } from "../../action/auth";

export default function SignInButton() {
  return (
    <form action={handleSignIn}>
      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-customCyen text-white font-bold py-2 px-4 rounded transition-colors duration-500"
      >
        Sign in with Auth0
      </button>
    </form>
  );
}
