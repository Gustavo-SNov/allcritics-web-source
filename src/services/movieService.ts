import api from "@/lib/api";
import {Content, PageContentType, ContentFilter} from "@/types/Content";
import {PaginationParams} from "@/types/Pagination"

const MOVIE_URL = "/content/movie";

export const movieService = {
    async getMovies(contentFilter?: ContentFilter,
                     pagination?: PaginationParams
    ): Promise<PageContentType<Content>> {
        const params = {
            ...contentFilter,
            ...pagination
        }
        const response = await api.get<PageContentType<Content>>(MOVIE_URL, {
            params
        });

        return response.data;
    }
}