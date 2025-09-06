import React from "react";

export type CarouselVariant = "hero" | "multi-item" | "review-carousel";

export interface CarouselProps {
    variant?: CarouselVariant;
    children: React.ReactNode;
    title?: string;
    loop?: boolean;
    itemsPerPage?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
}
