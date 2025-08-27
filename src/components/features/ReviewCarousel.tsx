"use client"


import {useReview} from "@/hooks/useReview";
import ReviewCard from "@/components/features/ReviewCard";
import {useEffect} from "react";

const ReviewCarousel = () => {
    const {reviews, fetchReviews} = useReview();

    useEffect(() => {
        fetchReviews().then(()=> {
            console.log("Reviews fetched");
        });
    }, [fetchReviews]);

    return (
        <section className="py-16 bg-gray-900/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-white mb-8">Latest Reviews</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} user={review.user} content={review.content} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ReviewCarousel;