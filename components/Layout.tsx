'use client'
import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {

    const path = usePathname();
    const [toggleNavMenu, setToggleNavMenu] = useState<boolean>(false);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-900 text-white p-4">
                <nav className="container mx-auto flex justify-between items-center">
                    <div className="text-left" onClick={() => window.location.href = "/"}>
                        <h1 className="lg:text-[32px] text-[24px] font-semibold">Mixed Bevs</h1>
                        <p className="lg:text-[22px] text-[16px]">Find and Learn new Drinks!</p>
                    </div>
                    <ul className="lg:flex hidden space-x-8 lg:text-[26px] text-[18px] font-semibold">
                        <li><Link href="/" className={`${path == '/' && 'text-orange-400'}`}>Home</Link></li>
                        <li><Link href="/random" className={`${path == '/random' && 'text-orange-400'}`}>Today's Random Bev</Link></li>
                        <li><Link href="/list" className={`${path == '/list' && 'text-orange-400'}`}>List by Letter</Link></li>
                    </ul>
                    <button onClick={() => setToggleNavMenu((prev) => !prev)} className="lg:hidden flex flex-col gap-y-[3px] justify-center">
                        <div className="border-2 border-orange-400 border-solid w-6 rounded-md" />
                        <div className="border-2 border-orange-400 border-solid w-6 rounded-md" />
                        <div className="border-2 border-orange-400 border-solid w-6 rounded-md" />
                    </button>
                    <ul className={`lg:hidden ${toggleNavMenu ? 'block' : 'hidden'} absolute bg-blue-900 top-15 right-0 rounded-md border-2 sm:w-[275px] border-orange-400 sm:text-[24px] text-[18px] font-semibold px-3 py-2 gap-y-10`}>
                        <li onClick={() => setToggleNavMenu((prev) => !prev)} ><Link passHref href="/" className={`${path == '/' && 'text-orange-400'} w-full`}><span className="block w-full">Home</span></Link></li>
                        <li onClick={() => setToggleNavMenu((prev) => !prev)} ><Link passHref href="/random" className={`${path == '/random' && 'text-orange-400'} w-full`}><span className="block w-full">Today's Random Bev</span></Link></li>
                        <li onClick={() => setToggleNavMenu((prev) => !prev)} ><Link passHref href="/list" className={`${path == '/list' && 'text-orange-400'}`}><span className="block w-full">List by Letter</span></Link></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex container mx-auto sm:p-4 p-2.5">{children}</main>
        </div>
    );
};

export default Layout;
