// Server Component
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return <DashboardClient session={session} />;
}
