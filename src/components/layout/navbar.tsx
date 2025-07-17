"use client"
import Link from "next/link"
import { Search } from "lucide-react";

import Logo from "@/components/ui/logo";
import {Input} from "@/components/ui/input";

const Navbar = () => {

    return (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Logo/>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/home" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                        <Link href="/filme" className="text-gray-300 hover:text-white transition-colors">Filmes</Link>
                        <Link href="/serie" className="text-gray-300 hover:text-white transition-colors">Séries</Link>
                        <Link href="/jogo" className="text-gray-300 hover:text-white transition-colors">Jogos</Link>
                    </div>

                    <div className="hidden md:flex relative flex-1 max-w-md mx-8">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                        <Input
                            placeholder="Search movies, series, games..."
                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500 focus:border-purple-500"
                        />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;