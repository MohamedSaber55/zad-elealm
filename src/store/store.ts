import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import categoriesSlice from './slices/categories';
import coursesSlice from './slices/courses';
import quizzesSlice from './slices/quizzes';
import enrollmentSlice from './slices/enrollment';
import favoritesSlice from './slices/favorites';
import reviewSlice from './slices/reviews';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        auth: authSlice,
        categories: categoriesSlice,
        courses: coursesSlice,
        quizzes: quizzesSlice,
        enrollment: enrollmentSlice,
        favorites: favoritesSlice,
        reviews: reviewSlice
    },
});

export default store;