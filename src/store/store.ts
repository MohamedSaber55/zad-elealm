import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import categoriesSlice from './slices/categories';
import coursesSlice from './slices/courses';
import quizzesSlice from './slices/quizzes';
import enrollmentSlice from './slices/enrollment';
import favoritesSlice from './slices/favorites';
import reviewSlice from './slices/reviews';
import notificationsSlice from './slices/notifications';
import certificatesSlice from './slices/certificates';
import videoProgressSlice from './slices/videoProgress';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        auth: authSlice,
        categories: categoriesSlice,
        certificates: certificatesSlice,
        courses: coursesSlice,
        quizzes: quizzesSlice,
        enrollment: enrollmentSlice,
        favorites: favoritesSlice,
        reviews: reviewSlice,
        notifications: notificationsSlice,
        videoProgress: videoProgressSlice,
    },
});

export default store;