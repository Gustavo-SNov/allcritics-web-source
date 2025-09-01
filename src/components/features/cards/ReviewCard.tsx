import {ReviewProps} from "@/types/Review";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card";
import {Star} from "lucide-react"

import {formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import Image from "next/image";

const ReviewCard = (review: ReviewProps) => {

    const reviewDate = new Date(review.createdAt)

    const formattedRelativeDate: string = formatDistanceToNow(reviewDate, {
        addSuffix: true, // Adiciona o prefixo/sufixo ("há" ou "em")
        locale: ptBR,    // Usa o locale para traduzir para português
    });

    return (
        <Card className="bg-gray-800/50 border-gray-700 p-6 transition-all duration-300 hover:bg-gray-800/70">
            <CardContent className="p-0">
                <div className="flex space-x-4">
                    {/* User Info */}
                    <div className="flex-shrink-0">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={review.user.profileImageUrl}/>
                            <AvatarFallback className="bg-purple-600 text-white">
                                {review.user.username.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-white">{review.user.username}</h4>
                            <span className="text-sm text-gray-400">{formattedRelativeDate}</span>
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
                            <span className="text-sm text-gray-400 ml-2">{review.rate}/5 </span>
                        </div>

                        {/* Review Text */}
                        <p className="text-gray-300 leading-relaxed">{review.comment}</p>

                        {/* Content Card */}
                        <div className="flex items-center space-x-3 mt-4 p-3 bg-gray-900/50 rounded-lg">
                            <div
                                className="w-12 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded flex items-center justify-center text-xs text-gray-400">
                                <Image
                                    src={review.content.imageURL}
                                    alt={`Poster de ${review.content.title}`}
                                    width={300}
                                    height={400}
                                />
                            </div>
                            <div>
                                <h5 className="text-white font-medium">{review.content.title}</h5>
                                <span className="text-sm text-gray-400 capitalize">{review.content.contentType}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default ReviewCard;