import api from "@/lib/api";
import {Content, PageContentType,  ContentsParams} from "@/types/Content";

const CONTENT_URL = "/content";

export const contentService = {
    async getContent({contentType, page, size, sort, category}: ContentsParams): Promise<PageContentType<Content>> {
        const params = {
            contentType,
            page,
            size,
            sort,
            category,
        }
        const response = await api.get<PageContentType<Content>>(CONTENT_URL, {
            params
        });

        return response.data;
    }
}