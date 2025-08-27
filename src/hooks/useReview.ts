import {useCallback, useState} from "react";
import {reviewService} from "@/services/reviewService";
import {ReviewFilter, Review} from "@/types/Review";
import {PaginationParams, Page} from "@/types/Pagination";

export const useReview = () => {
    const [pageData, setPageData] = useState<Page<Review> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async (
        reviewFilter?: ReviewFilter,
        page: number = 0,
        size: number = 3
    ) => {
        setLoading(true);
        setError(null);

        try {
            const paginationParams: PaginationParams = {page, size};
            const data = await reviewService.getReviews(reviewFilter, paginationParams);
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