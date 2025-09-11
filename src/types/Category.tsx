import {ContentType} from "@/types/Content";


export interface Category {
    idCategory: number;
    name: string;
}

export interface PageCategoriesType {
    content: Category[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first?: boolean;
    last?: boolean;
}

export interface CategoryParams {
    contentType?: ContentType;
}