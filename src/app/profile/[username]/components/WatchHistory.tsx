"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Play } from "lucide-react"

const WatchHistory = () => {
    const [viewMode, setViewMode] = useState("recent")

    const watchHistory = [
        {
            id: 1,
            title: "Oppenheimer",
            type: "movie",
            poster: "Movie Poster",
            watchedDate: "Yesterday",
            rating: 5,
            status: "completed"
        },
        {
            id: 2,
            title: "The Last of Us",
            type: "series",
            poster: "Series Poster",
            watchedDate: "3 days ago",
            rating: 4,
            status: "watching",
            progress: "Episode 7 of 9"
        },
        {
            id: 3,
            title: "Baldur's Gate 3",
            type: "game",
            poster: "Game Cover",
            watchedDate: "1 week ago",
            rating: 5,
            status: "completed",
            playtime: "127 hours"
        },
        {
            id: 4,
            title: "Wednesday",
            type: "series",
            poster: "Series Poster",
            watchedDate: "1 week ago",
            rating: 4,
            status: "completed"
        },
        {
            id: 5,
            title: "Top Gun: Maverick",
            type: "movie",
            poster: "Movie Poster",
            watchedDate: "2 weeks ago",
            rating: 5,
            status: "completed"
        },
        {
            id: 6,
            title: "God of War Ragnarök",
            type: "game",
            poster: "Game Cover",
            watchedDate: "3 weeks ago",
            rating: 5,
            status: "completed",
            playtime: "89 hours"
        }
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "watching":
                return "bg-blue-600/20 text-blue-300 border-blue-500/30"
            case "completed":
                return "bg-green-600/20 text-green-300 border-green-500/30"
            default:
                return "bg-gray-600/20 text-gray-300 border-gray-500/30"
        }
    }

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl">Watch History</CardTitle>
                    <div className="flex space-x-2">
                        <Button
                            variant={viewMode === "recent" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("recent")}
                            className={
                                viewMode === "recent"
                                    ? "bg-purple-600 hover:bg-purple-700"
                                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                            }
                        >
                            Recent
                        </Button>
                        <Button
                            variant={viewMode === "favorites" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("favorites")}
                            className={
                                viewMode === "favorites"
                                    ? "bg-purple-600 hover:bg-purple-700"
                                    : "border-gray-600 text-gray-300 hover:bg-gray-700"
                            }
                        >
                            Favorites
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                    {watchHistory.map((item) => (
                        <div
                            key={item.id}
                            className="flex space-x-3 p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors cursor-pointer group"
                        >
                            <div className="flex-shrink-0 relative">
                                <div className="w-12 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
                                    {item.poster}
                                </div>
                                {item.status === "watching" && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                    <h4 className="text-white font-medium truncate group-hover:text-purple-300 transition-colors">
                                        {item.title}
                                    </h4>
                                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="outline" className="border-gray-600 text-gray-400 capitalize text-xs">
                                        {item.type}
                                    </Badge>
                                    <Badge variant="outline" className={`text-xs ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </Badge>
                                </div>

                                {item.rating && (
                                    <div className="flex items-center space-x-1 mt-2">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs text-gray-400">{item.rating}/5</span>
                                    </div>
                                )}

                                {item.progress && (
                                    <p className="text-xs text-blue-300 mt-1">{item.progress}</p>
                                )}

                                {item.playtime && (
                                    <p className="text-xs text-green-300 mt-1">{item.playtime} played</p>
                                )}

                                <div className="flex items-center space-x-1 mt-2">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs text-gray-500">{item.watchedDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default WatchHistory;