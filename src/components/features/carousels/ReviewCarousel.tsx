"use client"

import {CarouselProps} from "@/types/Carousel";
import {useCarousel} from "@/hooks/useCarousel";
import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";

const ReviewCarousel = ({ children, title, loop, itemsPerPage = 3 }: CarouselProps) => {
    const { currentIndex, slides,  maxIndex, handlePrev, handleNext } = useCarousel({
        children,
        loop,
        itemsPerPage
    });

    const slideWidthPercentage = 100 / itemsPerPage;

    return (
        <section className="py-16 bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
                    <div className="flex space-x-2">
                        <Button /* ... */ onClick={handlePrev} disabled={!loop && currentIndex === 0} aria-label="Anterior">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button /* ... */ onClick={handleNext} disabled={!loop && currentIndex === maxIndex} aria-label="Próximo">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} style={{ flex: `0 0 ${slideWidthPercentage}%` }} className="px-2">
                                {slide}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReviewCarousel;