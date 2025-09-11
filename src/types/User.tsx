


export interface User {
    // --- Dados de Identidade ---
    idUser: string;
    username: string;
    email: string;
    token: string;

    // --- Dados de Perfil ---
    password?: string;
    role: Role;
    biography?: string;
    profileImageUrl?: string;
    createDate?: Date;
    updateDate?: Date;
}


export enum Role {
    ADMIN = 'ADMIN',
    DEFAULT = 'DEFAULT',
}