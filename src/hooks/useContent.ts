import {contentService} from "@/services/contentService";
import {useState} from "react";
import {Content} from "@/types/conteudoType";

export const useContent = () => {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchContents = async () => {
        setLoading(true);
        setError(null);

        try{
            const data = await contentService.getContent();
            setContents(data);
        } catch (error){
            console.error("Erro ao carregar os conteúdos: ", error);
            setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

    return {
        contents,
        loading,
        error,
        fetchContents,
    }
}