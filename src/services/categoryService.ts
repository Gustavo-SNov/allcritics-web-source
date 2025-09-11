import api from "@/lib/api";
import {Category, CategoryParams} from "@/types/Category";

const CATEGORY_URL = "/category";

export const categoryService = {
    async getCategories(categoryParams: CategoryParams): Promise<Category[]> {
        const params = { ...categoryParams};

        const response = await api.get<Category[]>(CATEGORY_URL, {params});
        return response.data
    }
}