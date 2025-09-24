import {Content} from "@/types/Content";


export interface User {
    // --- Dados de Identidade ---
    idUser: string;
    username: string;
    email: string;
    password?: string;
    token: string;
    role: Role;

    // --- Dados de Perfil ---
    accountName: string;
    biography?: string;
    profileImgUrl?: string;
    coverImgUrl?: string;
    createDate?: Date;
    updateDate?: Date;
    reviews?: UserReview[];
}

export interface UserReview {
    idReview: number;
    title: string;
    rate: number;
    comment: string;
    createdAt: Date;
    updateDate?: Date;
    content: Content;
}

export enum Role {
    ADMIN = 'ADMIN',
    DEFAULT = 'DEFAULT',
}

export const USER_URL: string = "/user";
export const USERNAME_URL: string = "/user/username";