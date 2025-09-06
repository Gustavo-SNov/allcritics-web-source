import {contentService} from "@/services/contentService";
import {useCallback, useState} from "react";
import {Content, PageContentType,  ContentsParams} from "@/types/Content";


export const useContent = () => {
    const [pageData, setPageData] = useState<PageContentType<Content> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchContents = useCallback(async (
        contentsParams : ContentsParams,
        ) => {
            setLoading(true);
            setError(null);
            try {
                const data = await contentService.getContent(contentsParams);
                setPageData(data);
            } catch (error) {
                console.error("Erro ao carregar os conteúdos: ", error);
                setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        }, []
    );


    return {
        contents: pageData?.content || [],
        pageInfo: { // Informações úteis para a UI de paginação
            totalPages: pageData?.totalPages || 0,
            totalElements: pageData?.totalElements || 0,
            isLast: pageData?.last,
            isFirst: pageData?.first,
            currentPage: pageData?.number || 0
        },
        loading,
        error,
        fetchContents,
    }
}