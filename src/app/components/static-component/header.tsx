"use client";
import { useReducer, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/image/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Menu from "../../../../public/svg/menu.svg";
import LoginPage from "./login";
import { useSession } from "next-auth/react";
import { handleSignOut } from "../../action/auth/auth";
import Loader from "../ui/loader";

type HeaderState = {
  isMenuOpen: boolean;
  isLoginOpen: boolean;
  isDropdownOpen: boolean;
};

type HeaderAction =
  | { type: "TOGGLE_MENU" }
  | { type: "TOGGLE_LOGIN" }
  | { type: "TOGGLE_DROPDOWN" }
  | { type: "CLOSE_ALL" };

function headerReducer(state: HeaderState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
        isDropdownOpen: false,
      };
    case "TOGGLE_LOGIN":
      return {
        ...state,
        isLoginOpen: !state.isLoginOpen,
        isDropdownOpen: false,
      };
    case "TOGGLE_DROPDOWN":
      return {
        ...state,
        isDropdownOpen: !state.isDropdownOpen,
        isMenuOpen: false,
      };
    case "CLOSE_ALL":
      return {
        isMenuOpen: false,
        isLoginOpen: false,
        isDropdownOpen: false,
      };
    default:
      return state;
  }
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [state, dispatch] = useReducer(headerReducer, {
    isMenuOpen: false,
    isLoginOpen: false,
    isDropdownOpen: false,
  });

  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    dispatch({ type: "CLOSE_ALL" });
  }, [pathname]);

  if (!mounted) {
    return (
      <header className="relative rounded-2xl p-4 mt-5 mb-10 text-background backdrop-blur-none bg-white/5 border border-white/10 shadow-lg">
        <div className="h-[60px] flex items-center justify-center">
          <Loader />
        </div>
      </header>
    );
  }

  return (
    <header className="relative rounded-2xl p-4 mt-5 mb-10 text-background backdrop-blur-none bg-white/5 border border-white/10 shadow-lg">
      <div className="md:flex md:justify-between relative z-10">
        <div className="flex items-center gap-16">
          <Link href="/" className="">
            <Image
              src={logo}
              alt="logo"
              onClick={() => dispatch({ type: "CLOSE_ALL" })}
              className=""
              height={48}
            />
          </Link>

          <div className="flex  lg:hidden items-center ml-auto">
            <button
              onClick={() => dispatch({ type: "TOGGLE_MENU" })}
              className=""
            >
              <Image src={Menu} alt="Menu" height={48} />
            </button>
          </div>

          <nav
            className={`flex flex-1 justify-center ${state.isMenuOpen ? "hidden" : "hidden"} lg:flex`}
          >
            <ul className="flex font-semibold space-x-8 text-gray-400">
              <li>
                <Link
                  href="/"
                  className={`hover:text-pink-500 duration-300 ${pathname === "/" ? "font-bold text-white" : "font-medium text-gray-100"}`}
                >
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`hover:text-pink-500 duration-300 ${pathname === "/about" ? "font-bold text-white" : "font-medium text-gray-100"}`}
                >
                  about us
                </Link>
              </li>
              <li>
                <Link
                  href="/Posts"
                  className={`hover:text-pink-500 duration-300 ${pathname === "/Posts" ? "font-bold text-white" : "font-medium text-gray-100"}`}
                >
                  posts
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`hover:text-pink-500 duration-300 ${pathname === "/contact" ? "font-bold text-white" : "font-medium text-gray-100"}`}
                >
                  contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden lg:flex space-x-4 items-center">
          {status === "authenticated" && session?.user ? (
            <div className="relative">
              <button
                onClick={() => dispatch({ type: "TOGGLE_DROPDOWN" })}
                className="flex items-center space-x-2 text-gray-100 hover:text-pink-500 focus:outline-none"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${state.isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-semibold text-white">
                  {session.user.name
                    ? session.user.name[0].toUpperCase()
                    : ":)"}
                </div>
              </button>

              <AnimatePresence>
                {state.isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg py-1"
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-500"
                      onClick={() => dispatch({ type: "CLOSE_ALL" })}
                    >
                      Dashboard
                    </Link>
                    {session.user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-500"
                        onClick={() => dispatch({ type: "CLOSE_ALL" })}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <form action={handleSignOut}>
                      <button
                        type="submit"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-500"
                        onClick={() => dispatch({ type: "CLOSE_ALL" })}
                      >
                        Sign out
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div>
              <button
                onClick={() => dispatch({ type: "TOGGLE_LOGIN" })}
                className="font-semibold px-8 text-gray-100 py-3 rounded-md hover:text-customCyen duration-500"
              >
                LOGIN
              </button>

              <Link href="/dashboard">
                <button className="bg-customCyen font-semibold px-8 py-3 rounded-md text-background hover:bg-gray-500 hover:text-white duration-700">
                  Add Post
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {state.isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden w-full shadow-lg rounded-b-md z-50"
          >
            <ul className="flex flex-col items-center space-y-4 py-6 text-gray-400 font-medium">
              <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                <Link href="/" className="hover:text-white duration-300">
                  home
                </Link>
              </li>
              <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                <Link href="/about" className="hover:text-white duration-300">
                  about us
                </Link>
              </li>
              <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                <Link href="/Posts" className="hover:text-white duration-300">
                  posts
                </Link>
              </li>
              <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                <Link href="/contact" className="hover:text-white duration-300">
                  contact
                </Link>
              </li>
              {status === "authenticated" && session?.user ? (
                <>
                  <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                    <Link
                      href="/dashboard"
                      className="hover:text-white duration-300"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                    {session.user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="hover:text-white duration-300"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </li>
                  <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                    <form action={handleSignOut}>
                      <button
                        type="submit"
                        className="text-gray-400 hover:text-white duration-300"
                      >
                        Sign out
                      </button>
                    </form>
                  </li>
                </>
              ) : (
                <li onClick={() => dispatch({ type: "TOGGLE_LOGIN" })}>
                  <Link href="/">
                    <button className="font-normal px-8 text-gray-100 py-3 rounded-md hover:text-customCyen duration-500">
                      LOGIN
                    </button>
                  </Link>
                </li>
              )}
              <li onClick={() => dispatch({ type: "TOGGLE_MENU" })}>
                <Link href="/dashboard">
                  <button className="bg-customCyen font-semibold px-8 py-3 rounded-md text-background hover:bg-gray-500 hover:text-white duration-700">
                    Add Post
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

      {state.isLoginOpen && (
        <LoginPage
          isOpen={state.isLoginOpen}
          onClose={() => dispatch({ type: "TOGGLE_LOGIN" })}
        />
      )}
    </header>
  );
}
