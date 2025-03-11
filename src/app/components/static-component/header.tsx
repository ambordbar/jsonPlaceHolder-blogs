"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/image/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Menu from "../../../../public/svg/menu.svg";
import LoginPage from "./login";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative mt-5 mb-10 text-background">
      <div className="md:flex md:justify-between py-4 my-5 relative z-10">
        <div className="flex items-center gap-16">
          <Link href="/" className="">
            <Image src={logo} alt="logo" className="" height={48} />
          </Link>

          <div className="flex  lg:hidden items-center ml-auto">
            <button onClick={toggleMenu} className="">
              <Image src={Menu} alt="Menu" height={48} />
            </button>
          </div>

          <nav
            className={`flex flex-1 justify-center ${isMenuOpen ? "hidden" : "hidden"} lg:flex`}
          >
            <ul className="flex font-semibold space-x-8 text-white">
              <li>
                <Link href="/" className="hover:text-pink-500 duration-300">
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-pink-500 duration-300"
                >
                  about us
                </Link>
              </li>
              <li>
                <Link
                  href="/Posts"
                  className="hover:text-pink-500 duration-300"
                >
                  posts
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-pink-500 duration-300"
                >
                  contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden lg:flex space-x-4">
          <button
            onClick={() => setIsLoginOpen(true)}
            className="font-semibold px-8 text-gray-100 py-3 rounded-md hover:text-customCyen duration-500"
          >
            LOGIN
          </button>
          <Link href="/dashboard">
            <button className="bg-customCyen font-semibold px-8 py-3 rounded-md text-background hover:bg-gray-500 hover:text-white duration-700">
              Dashboard
            </button>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden w-full shadow-lg rounded-b-md z-50"
          >
            <ul className="flex flex-col items-center space-y-4 py-6 text-gray-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white duration-300">
                  home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white duration-300">
                  about us
                </Link>
              </li>
              <li>
                <Link href="/Posts" className="hover:text-white duration-300">
                  posts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white duration-300">
                  contact
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <button className="font-normal px-8 text-gray-100 py-3 rounded-md hover:text-customCyen duration-500">
                    LOGIN
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard">
                  <button className="bg-customCyen font-semibold px-8 py-3 rounded-md text-background hover:bg-gray-500 hover:text-white duration-700">
                    Dashboard
                  </button>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {pathname === "/" ? (
          <motion.div
            key="hero"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="-z-10 absolute -top-5 left-0 right-0 transform -translate-x-1/2 w-1/2 sm:w-full md:max-w-7xl  mx-auto flex-1 items-center justify-center isolate"
          >
            <div className="-z-10 absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl mx-auto flex-1 items-center justify-center isolate">
              {/* ✅ First Gradient Section */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[18rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          bg-gradient-conic from-cyan-500 via-transparent to-transparent 
          [--conic-position:from_70deg_at_center_top] opacity-100"
              >
                <div
                  className="absolute w-full left-0 bg-slate-950 
            h-32 sm:h-36 md:h-40 bottom-0 z-20 
            [mask-image:linear-gradient(to_top,white,transparent)]"
                ></div>
              </div>

              {/* ✅ Second Gradient Section */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[18rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          bg-gradient-conic from-transparent via-transparent to-cyan-500 
          [--conic-position:from_290deg_at_center_top] opacity-100"
              >
                <div
                  className="absolute w-full right-0 bg-slate-950 
            h-32 sm:h-36 md:h-40 bottom-0 z-20 
            [mask-image:linear-gradient(to_top,white,transparent)]"
                ></div>
              </div>

              {/* ✅ Central Blur Section */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          top-1/2 h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          translate-y-12 scale-x-150 bg-slate-950 blur-2xl"
              ></div>

              {/* ✅ Transparent Overlay */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          top-1/2 z-50 h-[12rem] sm:h-[14rem] md:h-[16rem] lg:h-[18rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          bg-transparent opacity-10 backdrop-blur-md"
              ></div>

              {/* ✅ Large Cyan Section */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          inset-auto z-50 h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl
          -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"
              ></div>

              {/* ✅ Smaller Cyan Section */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          inset-auto z-30 h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[16rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
              ></div>

              {/* ✅ Cyan Line */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          inset-auto z-50 h-0.5 w-full max-w-xs sm:max-w-md md:max-w-lg 
          lg:max-w-xl xl:max-w-2xl -translate-y-[7rem] bg-cyan-400"
              ></div>

              {/* ✅ Bottom Cyan Section */}
              <div
                className="absolute left-1/2 transform -translate-x-1/2 
          inset-auto z-40 h-[6rem] sm:h-[8rem] md:h-[10rem] lg:h-[12rem] 
          w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
          -translate-y-[12.5rem] bg-slate-950"
              ></div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {isLoginOpen && (
        <LoginPage isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      )}
    </header>
  );
}
