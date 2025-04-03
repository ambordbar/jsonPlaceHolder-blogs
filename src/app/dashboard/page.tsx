// Server Component
import { redirect } from "next/navigation";
import { auth } from "../../lib/auth";
import dynamic from "next/dynamic";
import Loader from "@/app/components/ui/loader";

const DashboardClient = dynamic(() => import("./DashboardClient"), {
  loading: () => <Loader />,
});

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return <DashboardClient session={session} />;
}
