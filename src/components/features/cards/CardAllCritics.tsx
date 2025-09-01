"use client"

import React from "react"
import {CardProps} from "@/types/Card";
import {HeroCard} from "@/components/features/cards/HeroCard";
import {HoverCard} from "@/components/features/cards/HoverCard";
import ReviewCard from "@/components/features/cards/ReviewCard";

export const CardAllCritics = ({ variant,content, review}: CardProps) => {
    switch (variant) {
        case 'hero':
            return content ? <HeroCard {...content}  /> : null;
        case 'hover-card':
            return content ? <HoverCard {...content}  /> : null;
        case 'review':
            return review ? <ReviewCard {...review}  /> : null;
        default:
            // Renderiza um padrão ou null se a variante for desconhecida
            console.warn(`Variante de Card desconhecida: ${variant}`);
            return null;
    }
}