"use client";

import React, { useEffect } from 'react';
import { useCarousel } from "@/hooks/useCarousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Props que o HeroCarousel pode receber
interface HeroCarouselProps {
    children: React.ReactNode;
    autoplay?: boolean;
    loop?: boolean;
}

export const HeroCarousel = ({ children, autoplay = true, loop = true }: HeroCarouselProps) => {
    // 1. Usando o hook para obter toda a lógica de estado e controle
    const {
        currentIndex,
        slides,
        totalSlides,
        handlePrev,
        handleNext,
        goToSlide
    } = useCarousel({ children, loop, autoplay });

    // 2. Efeito para o autoplay
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            handleNext();
        }, 4000); // Muda de slide a cada 4 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [autoplay, handleNext]);

    return (
        <div
            className="relative w-full"
            role="region"
            aria-roledescription="carousel"
            aria-label="Destaques principais"
        >
            <div className="overflow-hidden rounded-lg">
                {/* O "track" do carrossel que se move horizontalmente */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} de ${totalSlides}`}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Controles de Navegação (Setas Sobrepostas) */}
            <>
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Slide anterior"
                >
                    <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Próximo slide"
                >
                    <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
            </>

            {/* 4. Indicadores de Ponto (Dots na Base) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentIndex
                                ? "bg-purple-500 scale-110"
                                : "bg-gray-600 hover:bg-gray-500"
                        }`}
                        aria-label={`Ir para o slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};