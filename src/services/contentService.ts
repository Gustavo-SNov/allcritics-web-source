import api from "@/lib/api";
import {Content, PageContentType, ContentFilter} from "@/types/Content";
import {PaginationParams} from "@/types/Pagination"

const CONTENT_URL = "/content";

export const contentService = {
    async getContent(contentFilter?: ContentFilter,
                     pagination?: PaginationParams
    ): Promise<PageContentType<Content>> {
        const params = {
            ...contentFilter,
            ...pagination
        }
        const response = await api.get<PageContentType<Content>>(CONTENT_URL, {
            params
        });

        return response.data;
    }
}