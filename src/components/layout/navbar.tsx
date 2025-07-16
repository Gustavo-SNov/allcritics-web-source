"use client"
import Link from "next/link"
import Image from "next/image";

const Navbar = () => {

    return (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={"/imagens/logo.png"} alt={"Logo AllCritics"} width={40} height={40}/>

                        <span className="text-xl font-bold text-white">AllCritics</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;