import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import categoriesSlice from './slices/categories';
import coursesSlice from './slices/courses';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        auth: authSlice,
        categories: categoriesSlice,
        courses: coursesSlice
    },
});

export default store;