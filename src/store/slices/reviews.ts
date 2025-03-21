import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

interface Reply {
    id: number;
    text: string;
    displayName: string;
    userImage: string | null;
    createdAt: string;
}
interface GetReviewRepliesResponse {
    message: string;
    statusCode: number;
    data: Reply[]
}
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
interface DeleteReviewRequest {
    token: string;
    reviewId: number;
}
interface DeleteReplyRequest {
    token: string;
    replyId: number;
}
interface AddReplyRequest {
    token: string;
    body: string;
    reviewId: number;
}
interface ToggleLikeRequest {
    token: string;
    reviewId: number;
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
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
})
export const deleteReview = createAsyncThunk<AddRatingResponse, DeleteReviewRequest>('rating/deleteReview', async ({ reviewId, token }, { rejectWithValue }) => {
    try {
        const response = await axios.delete<AddRatingResponse>(`${baseUrl}/Review/${reviewId}`, {
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
export const addReply = createAsyncThunk<AddRatingResponse, AddReplyRequest>('rating/addReply', async ({ body, token, reviewId }, { rejectWithValue }) => {
    try {
        const response = await axios.post<AddRatingResponse>(`${baseUrl}/Review/${reviewId}/replies`, body, {
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
export const deleteReply = createAsyncThunk<AddRatingResponse, DeleteReplyRequest>('rating/deleteReply', async ({ token, replyId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete<AddRatingResponse>(`${baseUrl}/Review/${replyId}/reply`, {
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

export const toggleLikeReview = createAsyncThunk<AddRatingResponse, ToggleLikeRequest>('rating/toggleLikeReview', async ({ token, reviewId }, { rejectWithValue }) => {
    try {
        const response = await axios.post<AddRatingResponse>(`${baseUrl}/Review/${reviewId}/Like`, null, {
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

export const getReviewReplies = createAsyncThunk<GetReviewRepliesResponse, ToggleLikeRequest>('rating/getReviewReplies', async ({ token, reviewId }, { rejectWithValue }) => {
    try {
        const response = await axios.get<GetReviewRepliesResponse>(`${baseUrl}/Review/${reviewId}/replies`, {
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



interface InitialState {
    message: string | null;
    statusCode: number | null;
    loading: boolean;
    replies: Reply[] | null;
    error: any;
    status: string | null;
}

const initialState: InitialState = {
    message: null,
    loading: false,
    replies: null,
    error: null,
    statusCode: null,
    status: null,
}


const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ----------------------------- Add Rating -----------------------------
        builder
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
                state.error = action.payload as { message: string; statusCode: number };
            });

        // ----------------------------- Add Review -----------------------------
        builder
            .addCase(addReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReview.fulfilled, (state, action: PayloadAction<AddRatingResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string; statusCode: number };
            });

        // ----------------------------- Delete Review -----------------------------
        builder
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action: PayloadAction<AddRatingResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string; statusCode: number };
            });

        // ----------------------------- Add Reply -----------------------------
        builder
            .addCase(addReply.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addReply.fulfilled, (state, action: PayloadAction<AddRatingResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(addReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string; statusCode: number };
            });

        // ----------------------------- Delete Reply -----------------------------
        builder
            .addCase(deleteReply.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReply.fulfilled, (state, action: PayloadAction<AddRatingResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(deleteReply.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string; statusCode: number };
            });

        // ----------------------------- Toggle Like Review -----------------------------
        builder
            .addCase(toggleLikeReview.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(toggleLikeReview.fulfilled, (state, action: PayloadAction<AddRatingResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(toggleLikeReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string; statusCode: number };
            });

        // ----------------------------- Get Review Replies -----------------------------
        builder
            .addCase(getReviewReplies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReviewReplies.fulfilled, (state, action: PayloadAction<GetReviewRepliesResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
                state.replies = action.payload.data;
            })
            .addCase(getReviewReplies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as { message: string; statusCode: number };
            });
    },
});

export default reviewSlice.reducer;