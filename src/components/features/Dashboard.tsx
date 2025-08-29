"use client"

import {useContent} from "@/hooks/useContent";

import {Button} from "@/components/ui/button";

// import ContentCarousel from "@/components/features/ContentCarousel";
import {useEffect} from "react";
import {Carousel} from "@/components/ui/carousel/Carousel";
import ContentCard from "@/components/features/ContentCard";

const Dashboard = () => {
    const {contents, fetchContents} = useContent();

    useEffect(() => {
        fetchContents();
    }, [fetchContents]);

    return (
        <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column - Text Content */}
                    <div className="space-y-8">
                        <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                            Discover and share
                            <br/>
                            <span className="text-purple-400">reviews</span> for movies,
                            <br/>
                            TV shows, and more
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            Join the community of critics and share your thoughts on various media.
                        </p>
                        <Button
                            size="lg"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Get Started
                        </Button>
                    </div>

                    {/*<ContentCarousel />*/}
                    <div className="flex justify-center lg:justify-end">
                        <div className="relative max-w-sm w-full">
                            {contents.length > 0 && (
                                <Carousel variant="hero" autoplay={true} loop={true}>
                                    {contents.map((content) => (
                                        <ContentCard
                                            key={content.idContent}
                                            idContent={content.idContent}
                                            title={content.title}
                                            description={content.description}
                                            contentType={content.contentType}
                                            imageURL={content.imageURL}
                                            releaseDate={content.releaseDate}
                                            averageRating={content.averageRating}
                                        />
                                    ))}
                                </Carousel>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard;