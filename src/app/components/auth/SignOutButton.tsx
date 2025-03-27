"use client";

import { handleSignOut } from "../../action/auth/auth";
import Link from "next/link";

export default function SignOutButton({ email }: { email: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <p>Welcome {email}</p>
        <Link
          href="/dashboard"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
      <form action={handleSignOut}>
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
