"use client"

import {useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Star, ThumbsUp, MessageCircle, MoreHorizontal} from "lucide-react"
import {UserReview} from "@/types/User";
import {formatDistanceToNow} from "date-fns";
import {ptBR} from "date-fns/locale";
import Image from "next/image";


interface ProfileReviewProps {
    reviews: UserReview[] | [];
}

const ProfileReviews = ({reviews}: ProfileReviewProps) => {
    console.log(reviews);
    const [filter, setFilter] = useState("all");

    const filters = [
        {key: "all", label: "All Reviews"},
        {key: "movie", label: "Movies"},
        {key: "series", label: "Series"},
        {key: "game", label: "Games"}
    ]

    // const filteredReviews = filter === "all"
    //     ? reviews
    //     : reviews.filter(review => review.content.contentType === filter)

    return (
        <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-xl">My Reviews</CardTitle>
                    <div className="flex space-x-2">
                        {filters.map((filterOption) => (
                            <Button
                                key={filterOption.key}
                                variant={filter === filterOption.key ? "default" : "outline"}
                                size="sm"
                                onClick={() => setFilter(filterOption.key)}
                                className={
                                    filter === filterOption.key
                                        ? "bg-purple-600 hover:bg-purple-700"
                                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                                }
                            >
                                {filterOption.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.idReview} className="border-b border-gray-700 last:border-b-0 pb-6 last:pb-0">
                        <div className="flex space-x-4">
                            {/* Content Poster */}
                            <div className="flex-shrink-0 w-1/5">
                                <div
                                    className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                    <Image src={review.content.imageURL} alt={`Poster de ${review.content.title}`}
                                           width={180}
                                           height={270}
                                    />
                                    {/*{review.content.imageURL}*/}
                                </div>
                            </div>

                            {/* Review Content */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-semibold text-lg">{review.content.title}</h3>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge variant="outline"
                                                   className="border-gray-600 text-gray-400 capitalize">
                                                {review.content.contentType}
                                            </Badge>
                                            <span
                                                className="text-gray-400 text-sm">{new Date(review.content.releaseDate).getFullYear()}</span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                        <MoreHorizontal className="w-4 h-4"/>
                                    </Button>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < review.rate
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-600"
                                            }`}
                                        />
                                    ))}
                                    <span className="text-sm text-gray-400 ml-2">
                                        {review.rate}/5
                                    </span>
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-300 leading-relaxed">{review.comment}</p>

                                {/* Review Stats */}
                                <div className="flex items-center justify-between mt-6">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                                            <ThumbsUp className="w-4 h-4"/>
                                            <span className="text-sm">{10}</span>
                                        </button>
                                        <button
                                            className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                                            <MessageCircle className="w-4 h-4"/>
                                            <span className="text-sm">{15}</span>
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-400">{formatDistanceToNow(review.createdAt, {
                                        addSuffix: true, // Adiciona o prefixo/sufixo ("há" ou "em")
                                        locale: ptBR,    // Usa o locale para traduzir para português
                                    })
                                    }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default ProfileReviews;