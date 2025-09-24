import api from "@/lib/api";
import {REVIEW_URL, Review, ReviewFilter, ReviewCreate} from "@/types/Review";
import {Page} from "@/types/Pagination"

const getReviewUrlById = (idReview: number | string) => `${REVIEW_URL}/${idReview}`;

export const reviewService = {

    getReviews: async (
        reviewFilter: ReviewFilter = {}
    ): Promise<Page<Review>> => {

        const response = await api.get<Page<Review>>(REVIEW_URL, {params: reviewFilter});
        return response.data;
    },

    getReviewById: async (idReview: number | string): Promise<Review> => {
        const response = await api.get<Review>(getReviewUrlById(idReview));
        return response.data;
    },

    deleteReview: async (idReview: number | string): Promise<void> => {
        await api.delete<Review>(getReviewUrlById(idReview));
    },

    putReview: async (idReview: number | string, review: Review): Promise<Review> => {
        const response = await api.put<Review>(getReviewUrlById(idReview), review);
        return response.data;
    },

    postReview: async (review: ReviewCreate): Promise<Review> => {
        const response = await api.post<Review>(REVIEW_URL, review);
        return response.data;
    },

}