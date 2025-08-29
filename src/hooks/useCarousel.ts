import { useState, useMemo, useCallback, Children } from 'react';
import {CarouselProps} from "@/types/Carousel";


export const useCarousel = ({
                                children,
                                loop = true,
                                itemsPerPage = 1,
                                autoplay = false,
                                autoplayDelay = 4000
                            }: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = useMemo(() => Children.toArray(children), [children]);
    const totalSlides = slides.length;

    const maxIndex = useMemo(() => (
        loop ? totalSlides - 1 : Math.max(0, totalSlides - itemsPerPage)
    ), [loop, totalSlides, itemsPerPage]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }, [maxIndex]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const goToSlide = useCallback((index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    }, [maxIndex]);

    // O useEffect do autoplay e da navegação por teclado permanecem nos componentes
    // que efetivamente os renderizam, ou poderiam ser movidos para cá também.
    // Por simplicidade, vamos mantê-los nos componentes visuais.

    return {
        currentIndex,
        slides,
        totalSlides,
        maxIndex,
        handlePrev,
        handleNext,
        goToSlide,
        autoplay,
        autoplayDelay,
    };
};