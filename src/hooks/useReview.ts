import {useCallback, useState} from "react";
import {reviewService} from "@/services/reviewService";
import {ReviewFilter, ReviewProps} from "@/types/Review";
import {PaginationParams, Page} from "@/types/Pagination";

export const useReview = () => {
    const [pageData, setPageData] = useState<Page<ReviewProps> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async (
        reviewFilter?: ReviewFilter,
        pagination?: PaginationParams,
    ) => {
        setLoading(true);
        setError(null);

        try {
            const data = await reviewService.getReviews(reviewFilter, pagination);
            setPageData(data);
        } catch (error){
            console.error("Erro ao carregar os reviews: ", error);
            setError("Não foi possível carregar os reviews. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    },[]);

    return {
        reviews: pageData?.content || [],
        pageInfo: { // Informações úteis para a UI de paginação
            totalPages: pageData?.totalPages || 0,
            totalElements: pageData?.totalElements || 0,
            isLast: pageData?.last,
            isFirst: pageData?.first,
            currentPage: pageData?.number || 0
        },
        loading,
        error,
        fetchReviews,
    }
}