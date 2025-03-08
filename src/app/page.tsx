import ListPost from "@/app/components/listPostCard";
import HeroSection from "@/app/components/heroSection";
import Fotter from "@/app/components/fotter"

export default function Home() {

  return (
    <div>
      <div className="xs:mx:6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40 overflow-y-hidden">
        <HeroSection />
        <ListPost />
        <Fotter />
      </div>
    </div>
  );
}
