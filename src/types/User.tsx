


export interface User {
    idUser: string;
    username: string;
    email: string;
    password?: string;
    role: Role;
    biography?: string;
    profileImageUrl?: string;
    createDate?: Date;
}


export enum Role {
    ADMIN = 'ADMIN',
    DEFAULT = 'DEFAULT',
}