"use client"

import {useParams} from "next/navigation";
import {useReview} from "@/hooks/useReview";
import {useEffect} from "react";
import {useContent} from "@/hooks/useContent";
import Image from "next/image";
import {CardAllCritics} from "@/components/features/cards/CardAllCritics";
import ReviewForm from "@/components/features/reviews/ReviewForm";
import {useAuth} from "@/contexts/AuthContext";

const ContentPage = () => {
    const params = useParams();
    const {reviews, fetchReviews, createReview} = useReview();
    const {content,fetchContent} = useContent();
    const {user} = useAuth();
    const idContent: string = params.idContent as string;

    console.log("Params: ", params);
    console.log("Review: ", reviews);
    console.log("Content: ", content);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchReviews({idContent: idContent, sort: "createdAt,desc"});
                await fetchContent(idContent);
            } catch (error) {
                console.error("Ocorreu um erro ao buscar os dados:", error);
            }
        }
        fetchData();
    }, [fetchReviews, fetchContent, idContent]);

    
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
                                <ReviewForm content={content} createReview={createReview} />
                                : null
                        }
                    </div>

                    {reviews.length > 0 ? (
                        // 1. Container agora usa Grid em vez de Flex
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {reviews.map((review, index) => (
                                // Cada ReviewCard é um item do grid
                                <CardAllCritics variant="review" key={index} review={review} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
                            <p className="text-gray-400">Ainda não há reviews para este conteúdo. Seja o primeiro a avaliar!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ContentPage;