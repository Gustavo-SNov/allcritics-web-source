"use client"
import {useMovie} from "@/hooks/useMovie";
import {useGame} from "@/hooks/useGame";
import {useSerie} from "@/hooks/useSerie";
import {useEffect, useState} from "react";
import {Carousel} from "@/components/ui/Carousel";
import {Card} from "@/components/ui/card";
import {Content} from "@/types/Content";
import Image from "next/image";
import {Star} from "lucide-react";

const TrendingContent = () => {
    const {movies, fetchMovies} = useMovie();
    const {series, fetchSeries} = useSerie();
    const {games, fetchGames} = useGame();
    const [hoveredItem, setHoveredItem] = useState<number | string | null>(null)
    useEffect(() => {
        fetchMovies();
        fetchSeries();
        fetchGames();
    }, [fetchMovies, fetchSeries, fetchGames]);


    console.log("Movies Fetched: ", movies);
    console.log("Series Fetched: ", series);
    console.log("Games Fetched: ", games);

    const renderItemCard = (item: Content) => (

        <Card
            key={item.idContent}
            onMouseEnter={() => setHoveredItem(item.idContent)}
            onMouseLeave={() => setHoveredItem(null)}
            className="bg-gray-800/50 border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 cursor-pointer group"
        >
            <div className="relative">
                <div
                    className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-gray-400 text-sm">
                    <Image
                        src={item.imageURL}
                        alt={`Poster de ${item.title}`}
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Rating Overlay on Hover */}
                {hoveredItem === item.idContent && (
                    <div
                        className="absolute inset-0 bg-black/80 flex items-center justify-center transition-all duration-300">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-1 mb-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                                <span
                                    className="text-yellow-400 font-bold text-lg">{item.averageRating.toFixed(1)}</span>
                            </div>
                            <p className="text-white text-sm">Rating</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3">
                <h3 className="text-white font-medium text-sm truncate">{item.title}</h3>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-400 text-xs capitalize">{item.contentType}</span>
                    <span className="text-gray-400 text-xs">{new Date(item.releaseDate).getFullYear()}</span>
                </div>
            </div>
        </Card>
    );

    return (<section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
            <Carousel
                variant="multi-item"
                title="Trending Movies"
                loop={false}
                itemsPerPage={5}
            >
                {movies.map(renderItemCard)}
            </Carousel>
            <Carousel
                variant="multi-item"
                title="Popular Series"
                loop={false}
                itemsPerPage={5}
            >
                {series.map(renderItemCard)}
            </Carousel>
            <Carousel
                variant="multi-item"
                title="Top Games"
                loop={false}
                itemsPerPage={5}
            >
                {games.map(renderItemCard)}
            </Carousel>

        </div>

    </section>)
}

export default TrendingContent;