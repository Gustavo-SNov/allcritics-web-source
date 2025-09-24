import {Review} from "@/types/Review";
import {CardAllCritics} from "@/components/features/cards/CardAllCritics";
import {useInView} from "react-intersection-observer";
import {useEffect} from "react";

interface ReviewListProps {
    reviews: Review[];
    loadMore: () => void; // Função para carregar mais
    isLoading: boolean;    // Status de carregamento
    hasMore: boolean;      // Se ainda há itens para carregar
}

const ReviewList = ({reviews, loadMore, isLoading, hasMore}: ReviewListProps) => {
    const {ref, inView} = useInView({
        threshold: 1.0,
    });

    useEffect(() => {
        // Se o gatilho está visível, ainda há itens e não estamos carregando, chama `loadMore`
        if (inView && hasMore && !isLoading) {
            loadMore();
        }
    }, [inView, hasMore, isLoading, loadMore]);

    return (
        <>
            {reviews.length > 0 ? (
                // 1. Container agora usa Grid em vez de Flex
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {reviews.map((review, index) => (
                        // Cada ReviewCard é um item do grid
                        <CardAllCritics variant="review" key={index} review={review}/>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center">
                    <p className="text-gray-400">Ainda não há reviews para este conteúdo. Seja o primeiro a avaliar!</p>
                </div>
            )
            }
            {hasMore && (
                <div ref={ref} className="col-span-1 lg:col-cols-2 mt-8 text-center">
                    {isLoading && (
                        <p className="text-gray-400 animate-pulse">Carregando mais reviews...</p>
                    )}
                </div>
            )}

            {!hasMore && reviews.length > 0 && (
                <div className="col-span-1 lg:col-cols-2 mt-8 text-center">
                    <p className="text-gray-500">Você chegou ao fim.</p>
                </div>
            )}
        </>
    )
}

export default ReviewList;