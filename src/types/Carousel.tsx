import React from "react";

type CarouselVariant = "hero" | "multi-item"

export interface CarouselProps {
    variant?: CarouselVariant;
    children: React.ReactNode;
    title?: string;
    loop?: boolean;
    itemsPerPage?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
}
