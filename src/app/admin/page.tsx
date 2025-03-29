// Server Component
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return <AdminDashboardClient session={session} />;
}
