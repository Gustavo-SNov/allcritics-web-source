import api from "@/lib/api";
import {Content} from "@/types/conteudoType";

const CONTENT_URL = "/conteudo";

export const contentService = {
    async getContent(): Promise<Content[]> {
        const response = await api.get<Content[]>(CONTENT_URL);
        return response.data;
    }
}