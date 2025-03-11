"use client";

import { signIn } from "../../../../auth";

export default function SignIn() {
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          "use server";
          await signIn("auth0");
        }}
      >
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Sign in with Auth0
        </button>
      </form>
    </div>
  );
}
