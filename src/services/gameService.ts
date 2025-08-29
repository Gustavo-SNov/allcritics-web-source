import api from "@/lib/api";
import {Content, PageContentType, ContentFilter} from "@/types/Content";
import {PaginationParams} from "@/types/Pagination"

const GAMES_URL = "/content/game";

export const gamesService = {
    async getGames(contentFilter?: ContentFilter,
                    pagination?: PaginationParams
    ): Promise<PageContentType<Content>> {
        const params = {
            ...contentFilter,
            ...pagination
        }
        const response = await api.get<PageContentType<Content>>(GAMES_URL, {
            params
        });

        return response.data;
    }
}