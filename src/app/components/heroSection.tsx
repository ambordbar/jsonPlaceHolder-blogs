"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Buttons from "../components/buttons";
import Image from "next/image";
import heroSectionImage from "../../../public/image/heroSectionImage.png"
import ArrowRight from "../../../public/svg/arrow-right-1.svg"

export default function HeroSection() {
    const router = useRouter();

    return (
        <div>
            <div className="mx-2 md:mx-0 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 justify-between">
                    <div className="flex flex-col my-auto">
                        <div className="flex gap-2 bg-gray-900 w-fit py-3 px-5 mb-4 rounded-full border border-gray-900 hover:border-gray-600 cursor-pointer duration-500">
                            <div className="text-white text-sm sm:text-base md:text-lg">Overview of our site:</div>
                            <div className="text-pink-500 font-semibold text-sm sm:text-base md:text-lg">Read Me</div>
                            <Image src={ArrowRight} alt="button read me" className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <div className="text-4xl sm:text-5xl md:text-6xl text-white font-extrabold">
                            The Post blogs From
                        </div>
                        <div className="text-4xl sm:text-5xl md:text-6xl text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-800 via-pink-500 to-pink-500 mt-3">
                            <span className="text-whiteTitle">-</span>
                            jasonPlaceHolder
                            <span className="text-whiteTitle">-</span>
                            <span className="text-whiteTitle ms-3">API</span>
                        </div>

                        <div className="text-white opacity-80 text-xl sm:text-2xl mt-3">You can add another post to these posts</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
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
                    <motion.div
                        className="mx-auto hidden lg:block xl:block"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Image src={heroSectionImage} height={400} alt="hero section" className="w-full h-auto" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}