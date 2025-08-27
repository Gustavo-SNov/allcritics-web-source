export interface Page<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first?: boolean;
    last?: boolean;
}

export interface PaginationParams {
    page?: number;
    size?: number;
    sort?: string; // Ex: 'releaseDate,desc'
}


