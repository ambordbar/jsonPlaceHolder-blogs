"use server";

import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "../../../lib/auth";

export async function handleSignIn() {
  await nextAuthSignIn("auth0", {
    callbackUrl: "/",
    redirect: true,
  });
}

export async function handleSignOut() {
  await nextAuthSignOut({
    redirect: true,
  });
}
