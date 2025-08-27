import api from "@/lib/api";
import {Content, PageContentType, ContentFilter} from "@/types/Content";
import {PaginationParams} from "@/types/Pagination"

const SERIES_URL = "/content/serie";

export const seriesService = {
    async getSeries(contentFilter?: ContentFilter,
                     pagination?: PaginationParams
    ): Promise<PageContentType<Content>> {
        const params = {
            ...contentFilter,
            ...pagination
        }
        const response = await api.get<PageContentType<Content>>(SERIES_URL, {
            params
        });

        console.log("Response Serie:", response);
        return response.data;
    }
}