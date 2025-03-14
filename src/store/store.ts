import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import categoriesSlice from './slices/categories';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: {
        auth: authSlice,
        categories: categoriesSlice
    },
});

export default store;