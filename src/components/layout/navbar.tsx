"use client"
import Link from "next/link"

import Logo from "@/components/ui/logo";
import SearchBar from "@/components/features/SearchBar";
import {useAuth} from "@/contexts/AuthContext";
import AuthModal from "@/components/features/AuthModal";

import {Avatar, AvatarImage} from "@/components/ui/avatar";

const Navbar = () => {
    const { user, login, register } = useAuth();

    return (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Logo/>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/home" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                        <Link href="/content/movie" className="text-gray-300 hover:text-white transition-colors">Movies</Link>
                        <Link href="/content/serie" className="text-gray-300 hover:text-white transition-colors">Series</Link>
                        <Link href="/content/game" className="text-gray-300 hover:text-white transition-colors">Games</Link>
                    </div>

                    <SearchBar />

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <Link href={`/profile/${user.username}`} className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded-lg transition-colors">
                                <div className="w-12 h-10 flex items-center justify-center">
                                    <Avatar className="w-full h-full object-cover">
                                        <AvatarImage src={user.profileImageUrl}/>
                                    </Avatar>

                                </div>
                                <span className="text-white">{user.username}</span>
                            </Link>
                        ) : (
                         <AuthModal login={login} register={register}/>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar;