// Server Component
import { auth } from "../../../auth";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <div>Please sign in to access the dashboard.</div>;
  }

  return <DashboardClient session={session} />;
}
