"use client";
import { useCarousel } from "@/hooks/useCarousel";
import { Button } from "@/components/ui/button";
import {CarouselProps} from "@/types/Carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";


export const MultiItemCarousel = ({ children, title, loop, itemsPerPage = 5 }: CarouselProps) => {
    const { currentIndex, slides,  maxIndex, handlePrev, handleNext } = useCarousel({
        children,
        loop,
        itemsPerPage
    });

    const slideWidthPercentage = 100 / itemsPerPage;

    return (
        <div className="space-y-4" >
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{title}</h2>
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
    );
};