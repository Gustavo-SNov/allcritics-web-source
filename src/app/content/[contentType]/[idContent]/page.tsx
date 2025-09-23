"use client"

import {useParams} from "next/navigation";
import {useReview} from "@/hooks/useReview";
import {useCallback, useEffect} from "react";
import {useContent} from "@/hooks/useContent";
import Image from "next/image";
import ReviewForm from "@/components/features/reviews/ReviewForm";
import {useAuth} from "@/contexts/AuthContext";
import ReviewList from "@/components/features/reviews/ReviewList";

const PAGE_SIZE = 2;

const ContentPage = () => {
    const params = useParams();
    const {reviews, pageInfo, loading, fetchReviews, createReview} = useReview();
    const {content, fetchContent} = useContent();
    const {user} = useAuth();
    const idContent: string = params.idContent as string;

    console.log("Params: ", params);
    console.log("Review: ", reviews);
    console.log("Content: ", content);

    useEffect(() => {
        if (idContent) {
            // Busca o conteúdo e a PRIMEIRA página de reviews
            fetchReviews({idContent: idContent, sort: "createdAt,desc", page: 0, size: PAGE_SIZE});
            fetchContent(idContent);
        }
    }, [idContent, fetchReviews, fetchContent]);

    const handleLoadMore = useCallback(() => {
        // Só busca mais se não estiver carregando e se não for a última página
        if (!loading && !pageInfo.isLast) {
            fetchReviews({
                idContent: idContent,
                sort: "createdAt,desc",
                page: pageInfo.currentPage + 1, // Pede a próxima página
                size: PAGE_SIZE
            });
        }
    }, [loading, pageInfo, idContent, fetchReviews]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             await fetchReviews({idContent: idContent, sort: "createdAt,desc", page: page, size: 4});
    //             await fetchContent(idContent);
    //         } catch (error) {
    //             console.error("Ocorreu um erro ao buscar os dados:", error);
    //         }
    //     }
    //     fetchData();
    // }, [fetchReviews, fetchContent, idContent]);


    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* --- Seção Principal do Conteúdo --- */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        {content?.imageURL && (
                            <Image
                                src={content.imageURL}
                                alt={`Poster de ${content?.title}`}
                                width={500}
                                height={750}
                                className="rounded-lg shadow-lg shadow-purple-900/20 object-cover"
                            />
                        )}
                    </div>

                    {/* Informações do Conteúdo */}
                    <div className="w-full md:w-2/3 flex flex-col space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">{content?.title}</h1>
                        <span className="text-lg text-purple-400 font-semibold capitalize">
                            {content?.contentType} &bull; {new Date(content?.releaseDate || Date.now()).getFullYear()}
                        </span>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {content?.description}
                        </p>

                    </div>
                </div>

                {/* --- Seção de Reviews --- */}
                <div className="mt-12 pt-8 border-t border-gray-700">
                    <h2 className="text-3xl font-bold mb-6">Community Reviews</h2>

                    {/* Formulário para Novo Review */}
                    <div className="mb-8">
                        {
                            content && user ?
                                <ReviewForm content={content} createReview={createReview}/>
                                : null
                        }
                    </div>
                    <ReviewList
                        reviews={reviews}
                        loadMore={handleLoadMore}
                        isLoading={loading && reviews.length > 0}
                        hasMore={!pageInfo.isLast}
                    />
                </div>
            </div>
        </div>
    )
}

export default ContentPage;