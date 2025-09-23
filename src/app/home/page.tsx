"use client"
import Dashboard from "@/components/features/Dashboard";
import TrendingContent from "@/components/features/TrendingContent";
import {Carousel} from "@/components/ui/carousel/Carousel";
import {CardAllCritics} from "@/components/features/cards/CardAllCritics";
import {useReview} from "@/hooks/useReview";
import {useEffect} from "react";

export default function Home() {
    const {reviews, fetchReviews} = useReview();
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchReviews();
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, [fetchReviews]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Dashboard/>
            <Carousel
                variant="review-carousel"
                title="Latest Reviews"
                loop={false}
                itemsPerPage={3}
            >
                {reviews.map((review, index) => (
                    <CardAllCritics variant="review" key={index} review={review}/>
                ))}
            </Carousel>
            <TrendingContent/>
        </div>
    );
}
