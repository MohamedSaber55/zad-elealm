import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Course, MetaData } from "../../interfaces";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
interface InitialState {
    categories: Category[];
    courses: Course[];
    metaData: MetaData | null;
    category: Category | null;
    loading: boolean;
    status: string;
    error: string | null;
    message: string | null;
    statusCode: number | null;
}
const initialState: InitialState = {
    category: null,
    status: "",
    metaData: null,
    courses: [],
    categories: [],
    loading: false,
    error: null,
    message: null,
    statusCode: null
};

interface GetAllCategoriesRequest {
    token: string;
}
interface GetCoursesByCategoryRequest {
    params: {
        categoryId: string;
        sortBy?: string;
        sortDirection?: string;
        search?: string;
        author?: string;
        fromDate?: string;
        toDate?: string;
        minRating?: number;
        maxRating?: number;
        pageNumber?: number;
        pageSize?: number;
    };
    token: string;
}
interface GetCoursesByCategoryResponse {
    metaData: MetaData;
    data: Course[];
    statusCode: number;
    message: string;
}
interface GetAllCategoriesResponse {
    data: Category[];
    statusCode: number;
    message: string;
}
export const getAllCategoriesAsync = createAsyncThunk<GetAllCategoriesResponse, GetAllCategoriesRequest>(
    'categories/getAllCategories',
    async ({ token }, thunkAPI) => {
        try {
            const response = await axios.get<GetAllCategoriesResponse>(`${baseUrl}/category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getCoursesByCategoryAsync = createAsyncThunk<GetCoursesByCategoryResponse, GetCoursesByCategoryRequest>(
    'categories/getCoursesByCategory',
    async ({ params, token }, thunkAPI) => {
        try {
            const response = await axios.get<GetCoursesByCategoryResponse>(`${baseUrl}/category/get-courses-by-category`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: params
            })
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ---------------------------- GET ALL CATEGORIES ---------------------------
            .addCase(getAllCategoriesAsync.pending, (state) => {
                state.status = 'loading'
                state.loading = true;
            })
            .addCase(getAllCategoriesAsync.fulfilled, (state, action: PayloadAction<GetAllCategoriesResponse>) => {
                state.status = 'succeeded'
                state.loading = false;
                state.categories = action.payload.data;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(getAllCategoriesAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string;
                state.statusCode = 404;
                state.loading = false;
            })
            // ---------------------------- GET COURSES BY CATEGORY ---------------------------
            .addCase(getCoursesByCategoryAsync.pending, (state) => {
                state.status = 'loading'
                state.loading = true;
            })
            .addCase(getCoursesByCategoryAsync.fulfilled, (state, action: PayloadAction<GetCoursesByCategoryResponse>) => {
                state.status = 'succeeded'
                state.loading = false;
                state.courses = action.payload.data;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(getCoursesByCategoryAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string;
                state.statusCode = 404;
                state.loading = false;
            })
    }
})

export default categoriesSlice.reducer;