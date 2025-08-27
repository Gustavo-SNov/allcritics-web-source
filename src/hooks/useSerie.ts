import {seriesService} from "@/services/serieService";
import {useCallback, useState} from "react";
import {Content, ContentFilter, PageContentType} from "@/types/Content";
import {PaginationParams} from "@/types/Pagination";


export const useSerie = () => {
    const [pageData, setPageData] = useState<PageContentType<Content> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSeries = useCallback(async (
        contentFilter?: ContentFilter,
        page: number = 0,
        size: number = 6,
        sort: string = "averageRating,desc"
    ) => {
        setLoading(true);
        setError(null);

        try {
            const paginationParams: PaginationParams = {page, size,sort};
            const data = await seriesService.getSeries(contentFilter, paginationParams);
            setPageData(data);
        } catch (error) {
            console.error("Erro ao carregar os conteúdos: ", error);
            setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        series: pageData?.content || [],
        pageInfo: { // Informações úteis para a UI de paginação
            totalPages: pageData?.totalPages || 0,
            totalElements: pageData?.totalElements || 0,
            isLast: pageData?.last,
            isFirst: pageData?.first,
            currentPage: pageData?.number || 0
        },
        loading,
        error,
        fetchSeries,
    }
}