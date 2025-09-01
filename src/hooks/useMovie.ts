import {movieService} from "@/services/movieService";
import {useCallback, useState} from "react";
import {Content, ContentFilter, PageContentType} from "@/types/Content";
import {PaginationParams} from "@/types/Pagination";


export const useMovie = () => {
    const [pageData, setPageData] = useState<PageContentType<Content> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMovies = useCallback(async (
        contentFilter?: ContentFilter,
        pagination?: PaginationParams,
    ) => {
        setLoading(true);
        setError(null);

        try {

            const data = await movieService.getMovies(contentFilter, pagination);
            setPageData(data);
        } catch (error) {
            console.error("Erro ao carregar os conteúdos: ", error);
            setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        movies: pageData?.content || [],
        pageInfo: { // Informações úteis para a UI de paginação
            totalPages: pageData?.totalPages || 0,
            totalElements: pageData?.totalElements || 0,
            isLast: pageData?.last,
            isFirst: pageData?.first,
            currentPage: pageData?.number || 0
        },
        loading,
        error,
        fetchMovies,
    }
}