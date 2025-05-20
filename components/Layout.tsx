'use client'
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: ReactNode }) => {

    const path = usePathname();

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-900 text-white p-4">
                <nav className="container mx-auto flex justify-between items-center">
                    <div className="text-left" onClick={() => window.location.href = "/"}>
                        <h1 className="text-[32px] font-semibold">Mixed Bevs</h1>
                        <p className="text-[22px]">Find and Learn new Drinks!</p>
                    </div>
                    <ul className="flex space-x-8 text-[26px] font-semibold">
                        <li><Link href="/" className={`${path == '/' && 'text-orange-400'}`}>Home</Link></li>
                        <li><Link href="/random" className={`${path == '/random' && 'text-orange-400'}`}>Today's Random Bev</Link></li>
                        <li><Link href="/list" className={`${path == '/list' && 'text-orange-400'}`}>List by Letter</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex container mx-auto p-4">{children}</main>
        </div>
    );
};

export default Layout;
