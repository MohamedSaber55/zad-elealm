import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

// Interfaces
interface FavoriteCourse {
    id: string;
    courseId: string;
    addedAt: string;
}

interface InitialState {
    favoriteCourses: FavoriteCourse[];
    loading: boolean;
    status: string;
    error: string | null;
    message: string | null;
    statusCode: number | null;
}

const initialState: InitialState = {
    favoriteCourses: [],
    loading: false,
    status: "",
    error: null,
    message: null,
    statusCode: null,
};

// Request and Response Interfaces
interface AddFavoriteCourseRequest {
    courseId: string;
    token: string;
}

interface GetFavoritesForUserRequest {
    token: string;
}

interface FavoriteCourseResponse {
    data: FavoriteCourse | FavoriteCourse[];
    statusCode: number;
    message: string;
}

// Async Thunks
export const addFavoriteCourseAsync = createAsyncThunk<FavoriteCourseResponse, AddFavoriteCourseRequest>(
    "favorites/addFavoriteCourse",
    async ({ courseId, token }, thunkAPI) => {
        try {
            const response = await axios.post<FavoriteCourseResponse>(
                `${baseUrl}/Favorite/${courseId}`,
                {
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
            const response = await axios.get<FavoriteCourseResponse>(`${baseUrl}/Favorite/user`, {
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
            .addCase(addFavoriteCourseAsync.fulfilled, (state, action: PayloadAction<FavoriteCourseResponse>) => {
                state.status = "succeeded";
                state.loading = false;
                state.favoriteCourses.push(action.payload.data as FavoriteCourse); // Add the new favorite course
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(addFavoriteCourseAsync.rejected, (state, action) => {
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
                state.favoriteCourses = action.payload.data as FavoriteCourse[]; // Update the list of favorite courses
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