import api from "@/lib/api";
import {REVIEW_URL,Review,ReviewFilter} from "@/types/Review";
import {Page,PaginationParams } from "@/types/Pagination"

export const reviewService = {

    async getReviews(
        filter?: ReviewFilter,
        pagination?: PaginationParams
    ): Promise<Page<Review>> {
        const params = {
            ...filter,
            ...pagination
        }
        const response = await api.get<Page<Review>>(REVIEW_URL,{params});
        return response.data;
    }

}