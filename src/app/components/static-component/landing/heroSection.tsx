"use client";
import { useRouter } from "next/navigation";
import Buttons from "../../dynamic-component/buttons";
import Image from "next/image";
import heroSectionImage from "../../../../../public/image/heroSectionImage.png";
import ArrowRight from "../../../../../public/svg/arrow-right-1.svg";

export default function HeroSection() {
  const router = useRouter();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between mb-10">
        <div className="flex flex-col my-auto">
          <div className="flex gap-2 bg-gray-900 w-fit py-2 px-4 mb-3 items-center rounded-full border border-gray-900 hover:border-gray-600 cursor-pointer duration-500">
            <div className="text-white text-xs sm:text-sm md:text-base">
              Overview of our site:
            </div>
            <div className="text-pink-500 font-semibold text-xs sm:text-sm md:text-base">
              Read Me
            </div>
            <Image
              src={ArrowRight}
              alt="button read me"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl py-1 text-white font-extrabold">
            The Post blogs From
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-800 via-pink-500 to-pink-500 mt-2">
            <span className="text-whiteTitle">-</span>
            jasonPlaceHolder
            <span className="text-whiteTitle">-</span>
            <span className="text-whiteTitle ms-2">API</span>
          </div>

          <div className="text-white opacity-80 text-lg sm:text-xl mt-2">
            You can add another post to these posts
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Buttons
              label={"add a new post"}
              onClick={() => router.push("/dashboard")}
              className="bg-customCyen font-semibold px-6 py-3 text-lg rounded-md text-background hover:bg-gray-500 hover:text-white duration-700"
            />
            <Buttons
              label={"Do you need guidance?"}
              onClick={() => router.push("/")}
              className="font-normal px-8 border border-customCyen text-lg text-customCyen opacity-80 py-3 rounded-md hover:border-gray-500 hover:text-white duration-500"
            />
          </div>
        </div>
        <div className="mx-auto hidden lg:block xl:block animate-wave translate">
          <Image
            src={heroSectionImage}
            height={400}
            alt="hero section"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
