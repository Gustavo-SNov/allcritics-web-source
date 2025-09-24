import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const FavoriteGenres = () => {

    const genres = [
        { name: "Sci-Fi", count: 45, color: "bg-blue-600/20 text-blue-300 border-blue-500/30" },
        { name: "Drama", count: 38, color: "bg-purple-600/20 text-purple-300 border-purple-500/30" },
        { name: "Action", count: 32, color: "bg-red-600/20 text-red-300 border-red-500/30" },
        { name: "Thriller", count: 28, color: "bg-orange-600/20 text-orange-300 border-orange-500/30" },
        { name: "Comedy", count: 24, color: "bg-yellow-600/20 text-yellow-300 border-yellow-500/30" },
        { name: "Horror", count: 19, color: "bg-gray-600/20 text-gray-300 border-gray-500/30" },
        { name: "Romance", count: 15, color: "bg-pink-600/20 text-pink-300 border-pink-500/30" },
        { name: "Fantasy", count: 12, color: "bg-green-600/20 text-green-300 border-green-500/30" }
    ]

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <CardTitle className="text-white text-lg">Favorite Genres</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {genres.map((genre) => (
                        <div key={genre.name} className="flex items-center justify-between">
                            <Badge variant="outline" className={`${genre.color} text-sm`}>
                                {genre.name}
                            </Badge>
                            <span className="text-gray-400 text-sm">{genre.count}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default FavoriteGenres;