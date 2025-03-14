
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



interface Video {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    videoDuration: string;
    orderInCourse: number;
}

interface Quiz {
    id: number;
    name: string;
    description: string;
    createdAt: string;
}

interface Review {
    // Assuming reviews have a similar structure, you can define properties here
    // For example:
    id: number;
    comment: string;
    // rating: number;
    // createdAt: string;
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

export interface CourseWithReviews {
    name: string;
    description: string;
    author: string;
    rating: number;
    courseLanguage: string;
    courseVideosCount: number;
    imageUrl: string;
    createdAt: string;
    totalEnrolledStudents: number;
    category: Category;
    videos: Video[];
    review: Review[];
    quizzes: Quiz[];
}
