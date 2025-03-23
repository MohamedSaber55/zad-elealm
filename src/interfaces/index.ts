
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
    id: number;
    name: string;
    description: string;
    pdfUrl: string;
    completedDate: string;
    userName: string;
    quizName: string;
}

export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    imageUrl: string;
    userName: string;
    phoneNumber: string;
}

interface Video {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    videoDuration: string;
    orderInCourse: number;
    isCompleted: boolean;
    watchedDuration: string;
}

export interface Review {
    id: number;
    courseId: number;
    text: string;
    displayName: string;
    appUserId: string;
    imageUrl: string;
    hasReplies: boolean;
    repliesCount: number;
    likesCount: number;
    createdAt?: string;
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
    category: Category;
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
    quizzes: {
        id: number;
        name: string;
        description: string;
        createdAt: string;
    }[];
}
interface Question {
    id: number;
    text: string;
    quizId: number;
    choices: {
        id: number;
        text: string;
    }[];
}
export interface Quiz {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    course: Course;
    questions: Question[];
};

export interface Notification {
    id: number;
    title: string;
    description: string;
    type: number;
    createdAt: string;
    isRead: boolean;
}