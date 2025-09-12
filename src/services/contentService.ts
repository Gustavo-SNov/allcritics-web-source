import api from "@/lib/api";
import {CONTENT_URL, Content, PageContentType, ContentsParams} from "@/types/Content";

export const contentService = {
    getContent: async (contentsParams: ContentsParams): Promise<PageContentType<Content>> => {

        const response = await api.get<PageContentType<Content>>(CONTENT_URL, {
            params: contentsParams
        });

        return response.data;
    },

    getContentById: async (idContent: number): Promise<Content> => {
        const CONTENT_ID_URL = `${CONTENT_URL}/${idContent}`;
        const response = await api.get<Content>(CONTENT_ID_URL);
        return response.data;
    }
}