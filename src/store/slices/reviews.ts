import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";


interface AddRatingResponse {
    message: string;
    statusCode: number;
}
interface AddRatingRequest {
    token: string;
    body: {
        value: number;
        courseId: number;
    };
}
interface AddReviewRequest {
    token: string;
    body: {
        reviewText: string;
        courseId: number;
    };
}

export const addRating = createAsyncThunk<AddRatingResponse, AddRatingRequest>('rating/addRating', async ({ body, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post<AddRatingResponse>(`${baseUrl}/Rating`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
})
export const addReview = createAsyncThunk<AddRatingResponse, AddReviewRequest>('rating/addReview', async ({ body, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post<AddRatingResponse>(`${baseUrl}/Review`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.log(error);
        
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
})


interface InitialState {
    message: string | null;
    statusCode: number | null;
    loading: boolean;
    error: any;
    status: string | null;
}

const initialState: InitialState = {
    message: null,
    loading: false,
    error: null,
    statusCode: null,
    status: null,
}


const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ----------------------------- Add Rating -----------------------------
            .addCase(addRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRating.fulfilled, (state, action: PayloadAction<AddRatingResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(addRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string, statusCode: number };
            })
            // ----------------------------- Get Reviews -----------------------------
            .addCase(addReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string, statusCode: number };
            });
    },
})

export default reviewSlice.reducer;