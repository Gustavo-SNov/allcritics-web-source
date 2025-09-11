import {useCallback, useState} from "react";
import {Category, CategoryParams} from "@/types/Category";
import {categoryService} from "@/services/categoryService";

export const useCategory = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async (
        categoryParams : CategoryParams,
        ) => {
            setLoading(true);
            setError(null);
            try {
                const data = await categoryService.getCategories(categoryParams);
                setCategories(data);
            } catch (error) {
                console.error("Erro ao carregar os conteúdos: ", error);
                setError("Não foi possível carregar o conteúdo. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        }, []
    );

    return {categories: categories || [], loading, error, fetchCategories};
}