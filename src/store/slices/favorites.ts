import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

// Interfaces
interface FavoriteCourse {
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

interface InitialState {
    favoriteCourses: FavoriteCourse[];
    allFavoriteCourses: number | null;
    loading: boolean;
    status: string;
    error: string | null;
    message: string | null;
    statusCode: number | null;
}

const initialState: InitialState = {
    favoriteCourses: [],
    allFavoriteCourses: null,
    loading: false,
    status: "",
    error: null,
    message: null,
    statusCode: null,
};

// Request and Response Interfaces
interface AddFavoriteCourseRequest {
    courseId: number;
    token: string;
}

interface GetFavoritesForUserRequest {
    token: string;
}

interface FavoriteCourseResponse {
    data: {
        courses: FavoriteCourse[];
        allFavoriteCourses: number;
    };
    statusCode: number;
    message: string;
}
interface AddFavoriteCourseResponse {
    statusCode: number;
    message: string;
}

// Async Thunks
export const addFavoriteCourseAsync = createAsyncThunk<AddFavoriteCourseResponse, AddFavoriteCourseRequest>(
    "favorites/addFavoriteCourse",
    async ({ courseId, token }, thunkAPI) => {
        try {
            const response = await axios.post<AddFavoriteCourseResponse>(`${baseUrl}/Favorite/${courseId}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const removeFavoriteCourseAsync = createAsyncThunk<FavoriteCourseResponse, AddFavoriteCourseRequest>(
    "favorites/removeFavoriteCourse",
    async ({ courseId, token }, thunkAPI) => {
        try {
            const response = await axios.delete<FavoriteCourseResponse>(`${baseUrl}/Favorite/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getFavoritesForUserAsync = createAsyncThunk<FavoriteCourseResponse, GetFavoritesForUserRequest>(
    "favorites/getFavoritesForUser",
    async ({ token }, thunkAPI) => {
        try {
            const response = await axios.get<FavoriteCourseResponse>(`${baseUrl}/Favorite`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Slice
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ---------------------------- ADD FAVORITE COURSE ---------------------------
            .addCase(addFavoriteCourseAsync.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(addFavoriteCourseAsync.fulfilled, (state, action: PayloadAction<AddFavoriteCourseResponse>) => {
                state.status = "succeeded";
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(addFavoriteCourseAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.statusCode = 500;
                state.loading = false;
            })
            // ---------------------------- Remove FAVORITE COURSE ---------------------------
            .addCase(removeFavoriteCourseAsync.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(removeFavoriteCourseAsync.fulfilled, (state, action: PayloadAction<AddFavoriteCourseResponse>) => {
                state.status = "succeeded";
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(removeFavoriteCourseAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.statusCode = 500;
                state.loading = false;
            })

            // ---------------------------- GET FAVORITES FOR USER ---------------------------
            .addCase(getFavoritesForUserAsync.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(getFavoritesForUserAsync.fulfilled, (state, action: PayloadAction<FavoriteCourseResponse>) => {
                state.status = "succeeded";
                state.loading = false;
                state.favoriteCourses = action.payload.data.courses;
                state.allFavoriteCourses = action.payload.data.allFavoriteCourses;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(getFavoritesForUserAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.statusCode = 500;
                state.loading = false;
            });
    },
});

export default favoritesSlice.reducer;