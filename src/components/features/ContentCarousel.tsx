"use client"


import ContentCard from "@/components/features/ContentCard";
import {useContent} from "@/hooks/useContent";
import {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";


const ContentCarousel = () => {
    const {contents,  fetchContents} = useContent();
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        fetchContents().then(() => {
            console.log("Contents Fetched");
        });
    }, [fetchContents]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % contents.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [contents.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % contents.length);
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + contents.length) % contents.length)
    }

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-sm w-full">
                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-lg">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {contents.map((content) => (
                            <div key={content.idContent} className="w-full flex-shrink-0">
                                <ContentCard idContent={content.idContent} title={content.title}
                                             description={content.description}
                                             contentType={content.contentType} imageURL={content.imageURL}
                                             releaseDate={content.releaseDate}
                                             averageRating={content.averageRating}/>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-4">
                    {contents.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                index === currentSlide
                                    ? "bg-purple-500 scale-110"
                                    : "bg-gray-600 hover:bg-gray-500"
                            }`}
                        />
                    ))}
                </div>

                {/* Auto-play indicator */}
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    Auto
                </div>

            </div>
        </div>
    )
}

export default ContentCarousel;