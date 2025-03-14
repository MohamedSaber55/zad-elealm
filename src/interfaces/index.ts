
export interface MetaData {
    pageSize: number;
    currentPage: number;
    totalMatchedItems: number;
    nextPage: number | null;
    previousPage: number | null;
    numberOfPages: number;
}

export interface User {
    id: number;
    DisplayName: string;
    email: string;
}

export interface Category {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}

export interface Certificate {
    id: string;
    userId: string;
    courseId: string;
    certificateUrl: string;
    issuedAt: string;
}

export interface Course {
    id: number;
    name: string;
    description: string;
    author: string;
    courseLanguage: string;
    courseVideosCount: number;
    rating: number;
    imageUrl: string;
    createdAt: string;
}