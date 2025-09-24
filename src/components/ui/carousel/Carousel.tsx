"use client"

import React from "react"

import { MultiItemCarousel } from "@/components/ui/carousel/MultiItemCarousel"
import {HeroCarousel} from "@/components/ui/carousel/HeroCarousel";
import {CarouselProps} from "@/types/Carousel";
import ReviewCarousel from "@/components/features/carousels/ReviewCarousel";

export const Carousel = ({ variant, ...props }: CarouselProps) => {
    switch (variant) {
        case 'hero':
            return <HeroCarousel {...props} />;
        case 'multi-item':
            return <MultiItemCarousel {...props} />;
        case 'review-carousel':
            return <ReviewCarousel {...props} />;
        default:
            // Renderiza um padrão ou null se a variante for desconhecida
            console.warn(`Variante de carrossel desconhecida: ${variant}`);
            return null;
    }
};
