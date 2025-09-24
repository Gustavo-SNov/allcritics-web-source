"use client";

import Link from "next/link"
import {Content} from "@/types/Content";
import Image from "next/image";
import {Star} from "lucide-react";
import {Card} from "@/components/ui/card";
import {useCard} from "@/hooks/useCard";

export const HoverCard = (content: Content) => {
    const {
        hoveredItem,
        handleHover
    } = useCard();
    return (
        <Card
            key={content.idContent}
            onMouseEnter={() => handleHover(content.idContent)}
            onMouseLeave={() => handleHover(null)}
            className="bg-gray-800/50 border-gray-700 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 cursor-pointer group"
        >
            <Link href={`/content/${content.contentType.toLowerCase()}/${content.idContent}`}>
                <div className="relative">
                    <div
                        className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-gray-400 text-sm">
                        <Image
                            src={content.imageURL}
                            alt={`Poster de ${content.title}`}
                            width={300}
                            height={400}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Rating Overlay on Hover */}
                    {hoveredItem === content.idContent && (
                        <div
                            className="absolute inset-0 bg-black/80 flex items-center justify-center transition-all duration-300">
                            <div className="text-center">
                                <div className="flex items-center justify-center space-x-1 mb-2">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                                    <span
                                        className="text-yellow-400 font-bold text-lg">{content.averageRating.toFixed(1)}</span>
                                </div>
                                <p className="text-white text-sm">Rating</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-3">
                    <h3 className="text-white font-medium text-sm truncate">{content.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-400 text-xs capitalize">{content.contentType}</span>
                        <span className="text-gray-400 text-xs">{new Date(content.releaseDate).getFullYear()}</span>
                    </div>
                </div>
            </Link>

        </Card>
    )
}