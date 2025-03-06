'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/image/logo.png';
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const pathname = usePathname();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="relative mx-8 mt-5 mb-20 text-background md:mx-16 lg:mx-28 xl:mx-36 2xl:mx-44">
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900 via-teal-500 to-cyan-500 opacity-50 blur-3xl backdrop-blur-3xl" style={{ backgroundPosition: 'center', backgroundSize: '250% 250%' }}></div> */}
            {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-600 via-red-400 to-teal-500 opacity-50 blur-3xl backdrop-blur-3xl" style={{ backgroundPosition: 'center', backgroundSize: '250% 250%' }}></div> */}

            <div className=" flex justify-between items-center py-4 my-5 relative z-10">
                <div className='flex items-center gap-16'>
                    <Link href="/" className="flex items-center space-x-4">
                        <Image src={logo} alt='logo' height={48} />
                    </Link>

                    <div className="block lg:hidden">
                        <button onClick={toggleMenu} className="text-white">
                            <span className="material-icons">menu</span>
                        </button>
                    </div>

                    <nav className={`flex flex-1 justify-center ${isMenuOpen ? 'block' : 'hidden'} lg:flex`}>
                        <ul className="flex space-x-8 text-gray-400 font-medium">
                            <li>
                                <Link href="/" className="hover:text-white duration-300">home</Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white duration-300">about us</Link>
                            </li>
                            <li>
                                <Link href="/Posts" className="hover:text-white duration-300">posts</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white duration-300">contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="hidden lg:flex space-x-4">
                    <Link href="/login">
                        <button className="font-normal px-8 text-gray-100 py-3 rounded-md hover:text-customCyen duration-500">
                            LOGIN
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className="bg-customCyen font-semibold px-8 py-3 rounded-md text-background hover:bg-gray-500 hover:text-white duration-700">
                            Dashboard
                        </button>
                    </Link>
                </div>
            </div>

            <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
                <ul className="flex flex-col items-center space-y-4 mt-4 text-gray-400 font-medium">
                    <li>
                        <Link href="/" className="hover:text-white duration-300">home</Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-white duration-300">about us</Link>
                    </li>
                    <li>
                        <Link href="/services" className="hover:text-white duration-300">services</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-white duration-300">contact</Link>
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
            </div>
            {pathname === "/" ? (
                <motion.div
                    initial={{ y: -50, opacity: 0 }} // شروع از بالا و شفافیت 0
                    animate={{ y: 0, opacity: 1 }} // حرکت به جایگاه اصلی و شفافیت ۱
                    transition={{ duration: 0.8, ease: "easeOut" }} // تنظیم سرعت و نوع حرکت
                    className="-z-10 relative flex w-96 mx-auto flex-1 scale-y-125 items-center justify-center isolate"
                >
                    <div className="-z-10 relative flex w-96 mx-auto flex-1 scale-y-125 items-center justify-center isolate ">

                        <div className="absolute right-1/2 h-56 w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top] opacity-100">
                            <div className="absolute w-full left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                            <div className="absolute w-40 h-full left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"></div>
                        </div>

                        <div className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 [--conic-position:from_290deg_at_center_top] opacity-100">
                            <div className="absolute w-40 h-full right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"></div>
                            <div className="absolute w-full right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"></div>
                        </div>

                        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
                        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>

                        <div className="absolute inset-auto z-50 h-96 w-[48rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>
                        <div className="absolute inset-auto z-30 h-36 w-96 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"></div>

                        <div className="absolute inset-auto z-50 h-0.5 w-[36rem] -translate-y-[7rem] bg-cyan-400"></div>

                        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"></div>
                    </div>
                </motion.div>
            )
                : (null)
            }



        </header>
    );
}
