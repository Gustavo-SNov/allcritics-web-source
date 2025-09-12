import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";


const SearchBar = () => {
    return (
        <div className="hidden md:flex relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
            <Input
                placeholder="Search movies, series, games..."
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500 focus:border-purple-500"
            />
        </div>
    )
}

export default SearchBar;

