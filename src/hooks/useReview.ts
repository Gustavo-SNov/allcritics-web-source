import {useCallback, useState} from "react";
import {reviewService} from "@/services/reviewService";
import {ReviewFilter, Review} from "@/types/Review";
import {Page} from "@/types/Pagination";

export const useReview = () => {
    const [pageData, setPageData] = useState<Page<Review> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReviews = useCallback(async (
        reviewFilter?: ReviewFilter,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const data = await reviewService.getReviews(reviewFilter);
            setPageData(data);
        } catch (error) {
            console.error("Erro ao carregar os reviews: ", error);
            setError("Não foi possível carregar os reviews. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchReviewById = useCallback(async (idReview: number): Promise<Review | null> => {
        setLoading(true);
        setError(null);
        let review: Review | null = null;
        try {
            review = await reviewService.getReviewById(idReview);
        } catch (error) {
            console.error("Erro ao carregar a review: ", error);
            setError("Não foi possível carregar o review. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
        return review;
    }, []);

    const deleteReview = useCallback(async (idReview: number | string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await reviewService.deleteReview(idReview);
        } catch (error) {
            console.error("Erro ao remover a review: ", error);
            setError("Não foi possível remover a review. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, [])

    const createReview = useCallback(async (review: Review): Promise<Review> => {
        setLoading(true);
        setError(null);
        try {
            review = await reviewService.postReview(review);
        } catch (error) {
            console.error("Erro ao criar a review: ", error);
            setError("Não foi possível criar a review. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
        return review;
    }, []);

    const updateReview = useCallback(async (idReview: number | string, review: Review): Promise<Review> => {
        setLoading(true);
        setError(null);
        try {
            review = await reviewService.putReview(idReview, review);
        } catch (error) {
            console.error("Erro ao criar a review: ", error);
            setError("Não foi possível criar a review. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
        return review;
    }, []);

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
        fetchReviewById,
        deleteReview,
        createReview,
        updateReview,
    }
}