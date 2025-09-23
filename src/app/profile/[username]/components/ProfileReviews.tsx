"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp, MessageCircle, MoreHorizontal } from "lucide-react"
import { UserReview } from "@/types/User";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

interface ProfileReviewProps {
    reviews: UserReview[] | [];
}

const ProfileReviews = ({ reviews }: ProfileReviewProps) => {
    const [filter, setFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3; // Define quantos reviews aparecem por página

    const filters = [
        { key: "all", label: "All Reviews" },
        { key: "movie", label: "Movies" },
        { key: "series", label: "Series" },
        { key: "game", label: "Games" }
    ];

    // Lógica de filtragem e paginação
    const filteredReviews = reviews.filter(review =>
        filter === 'all' || review.content.contentType === filter
    );

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
        setCurrentPage(1); // Reseta para a primeira página ao mudar o filtro
    };


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
                                onClick={() => handleFilterChange(filterOption.key)}
                                className={
                                    filter === filterOption.key
                                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                                }
                            >
                                {filterOption.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 min-h-[500px]">
                {currentReviews.length > 0 ? (
                    currentReviews.map((review) => (
                        <div key={review.idReview} className="border-b border-gray-700 last:border-b-0 pb-6 last:pb-0">
                            <div className="flex space-x-4">
                                {/* Content Poster */}
                                <div className="flex-shrink-0 w-1/5">
                                    <div
                                        className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-400 overflow-hidden">
                                        <Image src={review.content.imageURL} alt={`Poster de ${review.content.title}`}
                                               width={180}
                                               height={270}
                                               className="object-cover w-full h-full"
                                        />
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
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rate
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
                                                <ThumbsUp className="w-4 h-4" />
                                                <span className="text-sm">{10}</span>
                                            </button>
                                            <button
                                                className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-sm">{15}</span>
                                            </button>
                                        </div>
                                        <span className="text-sm text-gray-400">{formatDistanceToNow(review.createdAt, {
                                            addSuffix: true,
                                            locale: ptBR,
                                        })
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-10">
                        <p>No reviews found for this category.</p>
                    </div>
                )}
            </CardContent>
            {totalPages > 1 && (
                <CardFooter className="flex justify-center items-center pt-6">
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                        >
                            Previous
                        </Button>
                        {[...Array(totalPages).keys()].map((pageNumber) => (
                            <Button
                                key={pageNumber + 1}
                                variant={currentPage === pageNumber + 1 ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handlePageChange(pageNumber + 1)}
                                className={
                                    currentPage === pageNumber + 1
                                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                                        : "border-gray-600 text-gray-300 hover:bg-gray-700"
                                }
                            >
                                {pageNumber + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                        >
                            Next
                        </Button>
                    </div>
                </CardFooter>
            )}
        </Card>
    )
}

export default ProfileReviews;
