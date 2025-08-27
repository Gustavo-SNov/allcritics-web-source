// /components/features/Carousel.tsx (ou onde preferir)
"use client"

import React, {useState, useEffect, ReactNode, Children} from "react"
import {ChevronLeft, ChevronRight} from "lucide-react"
import {Button} from "@/components/ui/button" // Reutilizando seu Button UI
import clsx from "clsx" // npm install clsx

// Tipos para as props
type CarouselVariant = "hero" | "multi-item"

interface CarouselProps {
    children: ReactNode
    variant: CarouselVariant
    title?: string // Opcional, usado apenas para 'multi-item'
    autoplay?: boolean // Opcional, usado por 'hero'
    loop?: boolean // Para controlar o comportamento de loop
    itemsPerPage?: number // Para a variante 'multi-item'
}

export function Carousel({
                             children,
                             variant,
                             title,
                             autoplay = false,
                             loop = true,
                             itemsPerPage = 5,
                         }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slides = Children.toArray(children)
    const totalSlides = slides.length

    // Determina o índice máximo para a navegação
    // Para 'multi-item', não queremos mostrar um final vazio
    const maxIndex = loop ? totalSlides - 1 : Math.max(0, totalSlides - itemsPerPage)

    // Funções de navegação unificadas
    const handlePrev = () => {
        setCurrentIndex((prev) => {
            if (loop) {
                return prev === 0 ? maxIndex : prev - 1
            }
            return Math.max(0, prev - 1)
        })
    }

    const handleNext = () => {
        setCurrentIndex((prev) => {
            if (loop) {
                return prev === maxIndex ? 0 : prev + 1
            }
            return Math.min(maxIndex, prev + 1)
        })
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    }

    // Autoplay (só ativa se a prop for true)
    useEffect(() => {
        if (!autoplay) return

        const interval = setInterval(() => {
            handleNext()
        }, 4000)

        return () => clearInterval(interval)
    }, [autoplay, totalSlides, handleNext])

    // --- Lógica de Estilo e Layout ---
    const itemsToShow = variant === 'hero' ? 1 : itemsPerPage;
    const slideWidthPercentage = 100 / itemsToShow;

    const trackStyle = {
        transform: `translateX(-${currentIndex * (variant === 'hero' ? 100 : slideWidthPercentage / itemsPerPage * itemsToShow)}%)`,
    };

    return (
        <div className="space-y-4">
            {/* 1. Cabeçalho Condicional (apenas para 'multi-item') */}
            {variant === "multi-item" && (
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handlePrev}
                            disabled={!loop && currentIndex === 0}
                            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleNext}
                            disabled={!loop && currentIndex === maxIndex}
                            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4"/>
                        </Button>
                    </div>
                </div>
            )}

            {/* 2. Container Principal do Carousel */}
            <div className="relative">
                <div className="overflow-hidden rounded-lg">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={trackStyle}
                    >
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0"
                                style={{width: `${slideWidthPercentage}%`}}
                            >
                                {/* Adicionamos um padding aqui para a variante multi-item, como no original */}
                                <div className={clsx({'px-2': variant === 'multi-item'})}>
                                    {slide}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Navegação Sobreposta (apenas para 'hero') */}
                {variant === 'hero' && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                        >
                            <ChevronLeft className="w-5 h-5"/>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
                        >
                            <ChevronRight className="w-5 h-5"/>
                        </button>

                        {/* 4. Indicadores de Ponto (apenas para 'hero') */}
                        <div className="flex justify-center space-x-2 mt-4 absolute bottom-4 left-1/2 -translate-x-1/2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                        index === currentIndex
                                            ? "bg-purple-500 scale-110"
                                            : "bg-gray-600 hover:bg-gray-500"
                                    }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}