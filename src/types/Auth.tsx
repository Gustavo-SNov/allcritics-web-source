
export interface Login{
    email: string;
    password: string;
}

export interface Register extends Login{
    username: string;
}

export interface AuthData{
    username?: string;
    email: string;
    password: string;
}
