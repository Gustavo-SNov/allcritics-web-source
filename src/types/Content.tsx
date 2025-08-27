
export interface Content {
    idContent: string | number;
    title: string;
    description: string;
    contentType: ContentType;
    imageURL: string;
    releaseDate: Date;
    averageRating: number;
    director?: string;
    duration?: number;
    studio?: string;
    platform?: string;
    multiplayer?: boolean;
    numberOfSeasons?: number;
    episodesPerSeason?: number;
    broadcaster?: string;
}

export enum ContentType {
    MOVIE = 'MOVIE',
    GAME = 'GAME',
    SERIE = 'SERIE',
    BOOK = 'BOOK',
}

export interface PageContentType<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first?: boolean;
    last?: boolean;
}

export type ContentTypeFilter = 'MOVIE' | 'SERIE' | 'GAME' | 'BOOK';

export interface ContentFilter {
    contentFilter?: ContentTypeFilter;
    spliced?: boolean;
    ranked?: boolean;
}

