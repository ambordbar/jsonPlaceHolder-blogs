import ListPost from "@/app/components/listPostCard";
import HeroSection from "./heroSection/page";

export default function Home() {

  return (
    <div>
      <div className="xs:mx:6 sm:mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40">
        <HeroSection /> 
        <ListPost />
      </div>
    </div>
  );
}
