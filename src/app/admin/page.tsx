// Server Component
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import dynamic from "next/dynamic";
import Loader from "@/app/components/ui/loader";

const AdminDashboardClient = dynamic(() => import("./AdminDashboardClient"), {
  loading: () => <Loader />,
});

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  return <AdminDashboardClient session={session} />;
}
