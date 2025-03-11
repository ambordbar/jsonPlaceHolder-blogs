import HeroSection from "@/app/components/static-component/landing/heroSection";
import ListPost from "@/app/components/dynamic-component/ListPostCard";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ListPost numberOfPosts={12} />
    </div>
  );
}
