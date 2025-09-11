"use client"

import {useParams} from "next/navigation";
import ContentCarousel from "@/components/features/ContentCarousel";
import {capitalizeFirstLetter} from "@/lib/utils";
import {useCategory} from "@/hooks/useCategory";
import {useCallback, useEffect, useState} from "react";
import {Category} from "@/types/Category";
import {ContentType} from "@/types/Content";

const CAROUSELS_PER_LOAD = 3;

const ContentPage = () => {
    const params = useParams();
    const [nextIndex, setNextIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const {categories, fetchCategories} = useCategory();
    const [visibleCarousels, setVisibleCarousels] = useState<Category[]>(categories.slice(0,CAROUSELS_PER_LOAD))
    const typeParam = (params.contentType as string).toUpperCase();

    const loadMoreCarousels = useCallback(() => {
        if (isLoading || nextIndex >= categories.length || categories.length === 0) return;

        setIsLoading(true);

        // Simula um delay de carregamento
        setTimeout(() => {
            const nextBatch = categories.slice(nextIndex, nextIndex + CAROUSELS_PER_LOAD);
            setVisibleCarousels(prevCarousels => [...prevCarousels, ...nextBatch]);
            setNextIndex(prevIndex => prevIndex + CAROUSELS_PER_LOAD);
            setIsLoading(false);
        }, 500);
    }, [isLoading, nextIndex, categories]);

    useEffect(() => {
        const fetchData = async () =>{
            try{
                await fetchCategories({contentType: ContentType[typeParam?.toUpperCase() as keyof typeof ContentType]});
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, [fetchCategories]);

    useEffect(() => {
        if (categories.length > 0) {
            loadMoreCarousels();
        }
    }, [categories]);

    // Efeito para monitorar o scroll e carregar mais conteúdo
    useEffect(() => {
        const handleScroll = () => {
            // Condição para carregar mais: o final do scroll está a 250px de distância
            const isNearBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 250;

            if (isNearBottom) {
                loadMoreCarousels();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreCarousels]);

    useEffect(() => {
        const handleScroll = () => {
            // Condições para carregar mais:
            // 1. Não estar carregando atualmente
            // 2. O usuário rolou até perto do fim da página (ex: 100 pixels de distância)
            if (!isLoading && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                loadMoreCarousels();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading, nextIndex]);

    return (
        <section className="min-h-screen py-16 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="container mx-auto px-4 space-y-12">
                <ContentCarousel
                    carouselVariant="multi-item"
                    cardVariant="hover-card"
                    contentFilter={{typeParam: typeParam}}
                    sizeParam={12}
                    sortParam={'averageRating,desc'}
                    title={`Popular ${capitalizeFirstLetter(typeParam)}s`}
                    itemsPerPage={6}
                />
                <ContentCarousel
                    carouselVariant="multi-item"
                    cardVariant="hover-card"
                    contentFilter={{typeParam: typeParam}}
                    sizeParam={12}
                    title="Latest Releases"
                    itemsPerPage={6}
                />
                {visibleCarousels.map((item, index) => (
                    <ContentCarousel
                        key={index} // Use o índice como chave, ou um ID único se tiver
                        carouselVariant="multi-item"
                        cardVariant="hover-card"
                        contentFilter={{ typeParam: typeParam, category: item.name }}
                        sizeParam={12}
                        title={`${capitalizeFirstLetter(item.name)}s`}
                        itemsPerPage={6}
                    />
                ))}

                {isLoading && <p className="text-center text-gray-400">Carregando mais...</p>}

            </div>
        </section>
    );
}

export default ContentPage;