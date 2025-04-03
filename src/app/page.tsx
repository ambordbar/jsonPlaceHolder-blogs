import HeroSection from "@/app/components/static-component/landing/heroSection";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loader from "@/app/components/ui/loader";
import { Metadata } from "next";

// Dynamic import for ListPost with loading state
const ListPost = dynamic(
  () => import("@/app/components/dynamic-component/ListPostCard"),
  {
    loading: () => (
      <div className="w-full flex justify-center items-center py-10">
        <Loader size="lg" />
      </div>
    ),
    ssr: true,
  }
);

export const metadata: Metadata = {
  title: "Home | Blog Platform",
  description:
    "Discover the latest articles and stories from our community of writers.",
  openGraph: {
    title: "Home | Blog Platform",
    description:
      "Discover the latest articles and stories from our community of writers.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Suspense
        fallback={
          <div className="w-full flex justify-center items-center py-10">
            <Loader size="lg" />
          </div>
        }
      >
        <ListPost numberOfPosts={12} />
      </Suspense>
    </div>
  );
}
