import {Content} from "@/types/Content"
import {User} from "@/types/User"
import {PaginationParams} from "@/types/Pagination";

export const REVIEW_URL = "/review";

export interface Review {
    idReview: number;
    title: string;
    rate: number;
    comment: string;
    createdAt: Date;
    content: Content;
    user: User;
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