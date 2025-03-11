"use server";

import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "../../../auth";

export async function handleSignIn() {
  await nextAuthSignIn("auth0", {
    callbackUrl: "/dashboard",
    redirect: true,
  });
}

export async function handleSignOut() {
  await nextAuthSignOut({
    redirect: true,
  });
}
