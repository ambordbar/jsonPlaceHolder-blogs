'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/image/logo.png';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="relative mx-4 mt-5 mb-20 text-background">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900 via-teal-500 to-cyan-500 opacity-50 blur-3xl backdrop-blur-3xl" style={{ backgroundPosition: 'center', backgroundSize: '250% 250%' }}></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-red-400 to-teal-500 opacity-50 blur-3xl backdrop-blur-3xl" style={{ backgroundPosition: 'center', backgroundSize: '250% 250%' }}></div>

            <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-32 2xl:mx-40 flex justify-between items-center py-4 my-5 relative z-10">
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
        </header>
    );
}
