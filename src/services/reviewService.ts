import api from "@/lib/api";
import {REVIEW_URL,ReviewProps,ReviewFilter} from "@/types/Review";
import {Page,PaginationParams } from "@/types/Pagination"

export const reviewService = {

    async getReviews(
        filter?: ReviewFilter,
        pagination?: PaginationParams
    ): Promise<Page<ReviewProps>> {
        const params = {
            ...filter,
            ...pagination
        }
        const response = await api.get<Page<ReviewProps>>(REVIEW_URL,{params});
        return response.data;
    }

}