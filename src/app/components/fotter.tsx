'use client'
import Image from "next/image";
import Logo from "../../../public/image/logo.png"
import Link from 'next/link';

export default function Fotter() {
    return (
        <div className="my-10 mx-2 md:mx-0">
            <div className="bg-gray-900 rounded-3xl w-full grid lg:grid-cols-3 grid-cols-1 gap-y-10 mb-5 px-5 py-7">
                <div className="flex items-center gap-2 lg:justify-end justify-center">
                    made by
                    <p className="bg-clip-text text-transparent font-semibold bg-gradient-to-r from-blue-500 via-cyan-500 to-cyan-200">
                        Arkana_Design
                    </p>
                </div>
                <Image className="mx-auto" src={Logo} alt="logo" />
                <p className="text-gray-400 flex items-center lg:justify-start justify-center"> &copy; 2025 Test Content</p>
            </div>
            <div>
                <nav className={`flex flex-1 justify-center lg:flex`}>
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
        </div>
    );
};

