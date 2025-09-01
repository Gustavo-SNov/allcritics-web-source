import {Content} from "@/types/Content"
import {User} from "@/types/User"

export const REVIEW_URL = "/review";

export interface ReviewProps {
    idReview: number;
    title: string;
    rate: number;
    comment: string;
    createdAt: Date;
    content: Content;
    user: User;
}

export interface ReviewFilter {
    idContent?: number | string;
    idUser?: string;
}

export interface ReviewCardProps{
    review: ReviewProps;
    user: User;
    content: Content;
}