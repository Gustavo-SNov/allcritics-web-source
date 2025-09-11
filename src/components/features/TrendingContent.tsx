"use client"

import ContentCarousel from "@/components/features/ContentCarousel";

const TrendingContent = () => {

    return (<section className="py-16">
        <div className="container mx-auto px-4 space-y-12">
            <ContentCarousel
                carouselVariant="multi-item"
                cardVariant="hover-card"
                contentFilter={{typeParam: "MOVIE" }}
                title="Trending Movies"
                loop={false}
                itemsPerPage={5}

            />

            <ContentCarousel
                carouselVariant="multi-item"
                cardVariant="hover-card"
                contentFilter={{typeParam: "SERIE" }}
                title="Popular Series"
                loop={false}
                itemsPerPage={5}

            />

            <ContentCarousel
                carouselVariant="multi-item"
                cardVariant="hover-card"
                contentFilter={{typeParam: "GAME" }}
                title="Top Games"
                loop={false}
                itemsPerPage={5}
            />
        </div>

    </section>)
}

export default TrendingContent;