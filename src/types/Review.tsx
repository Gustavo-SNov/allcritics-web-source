import {Content} from "@/types/Content"
import {User} from "@/types/User"
import {PaginationParams} from "@/types/Pagination";

export const REVIEW_URL = "/review";

export interface Review {
    idReview: number | null;
    title: string;
    rate: number;
    comment: string;
    createdAt?: Date;
    content: Content;
    user: User;
}

export interface ReviewCreate{
    idContent: string | number;
    title: string;
    rate: number;
    comment: string;
}

export interface ReviewFilter extends PaginationParams{
    idContent?: number | string;
    idUser?: string;
}

export interface ReviewCardProps{
    review: Review;
    user: User;
    content: Content;
}