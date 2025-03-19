import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

interface UpdateVideoProgressRequest {
    body: {
        videoId: number;
        watchedSeconds: number;
    };
    token: string;
}
interface UpdateVideoProgressResponse {
    statusCode: number;
    message: string;
    data: string;
}
interface GetCourseProgressRequest {
    token: string;
    courseId: string;
}
interface GetCourseProgressResponse extends CourseProgress { }
interface CheckQuizEligibilityRequest {
    token: string;
    quizId: string;
}
interface CheckQuizEligibilityResponse {
    message: string;
    isEligible: boolean;
}
interface GetVideoProgressRequest {
    token: string;
    videoId: string;
}
interface GetVideoProgressResponse {
    videoId: number;
    courseId: number;
    watchedDuration: number;
    isCompleted: boolean;
}

export const updateVideoProgress = createAsyncThunk<UpdateVideoProgressResponse, UpdateVideoProgressRequest>(
    "video/updateVideoProgress",
    async ({ body, token }, { rejectWithValue }) => {
        try {
            const response = await axios.post<UpdateVideoProgressResponse>(`${baseUrl}/VideoProgress/update`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);

            return response.data;
        } catch (err: any) {
            console.log(err);
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
        }
    }
)
export const getCourseProgress = createAsyncThunk<GetCourseProgressResponse, GetCourseProgressRequest>(
    "video/GetCourseProgress",
    async ({ courseId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetCourseProgressResponse>(`${baseUrl}/VideoProgress/course/${courseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            return response.data;
        } catch (err: any) {
            console.log(err);
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
        }
    }
)
export const getVideoProgress = createAsyncThunk<GetVideoProgressResponse, GetVideoProgressRequest>(
    "video/getVideoProgress",
    async ({ videoId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetVideoProgressResponse>(`${baseUrl}/VideoProgress/video/${videoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
        }
    }
)
export const checkQuizEligibility = createAsyncThunk<CheckQuizEligibilityResponse, CheckQuizEligibilityRequest>(
    "video/checkQuizEligibility",
    async ({ quizId, token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<CheckQuizEligibilityResponse>(`${baseUrl}/VideoProgress/check-eligibility/${quizId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
        }
    }
)


interface CourseProgress {
    videoProgress: number;
    overallProgress: number;
    completedVideos: number;
    totalVideos: number;
    remainingVideos: number;
    isEligibleForQuiz: boolean;
}

interface VideoProgress {
    videoId: number;
    courseId: number;
    watchedDuration: number;
    isCompleted: boolean;
}

interface InitialState {
    message: string | null;
    loading: boolean;
    isEligible: boolean;
    error: string | null;
    status: string | null;
    statusCode: number | null;
    courseProgress: CourseProgress | null;
    videoProgress: VideoProgress | null;
}

const initialState: InitialState = {
    message: null,
    loading: false,
    isEligible: false,
    error: null,
    status: null,
    statusCode: null,
    courseProgress: null,
    videoProgress: null
};

const videosProgressSlice = createSlice({
    name: 'videosProgress',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Update Video Progress
            .addCase(updateVideoProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVideoProgress.fulfilled, (state, action: PayloadAction<UpdateVideoProgressResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(updateVideoProgress.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update video progress";
            })

            // Get Course Progress
            .addCase(getCourseProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCourseProgress.fulfilled, (state, action: PayloadAction<GetCourseProgressResponse>) => {
                state.loading = false;
                state.courseProgress = action.payload;
            })
            .addCase(getCourseProgress.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to get course progress";
            })

            // Get Video Progress
            .addCase(getVideoProgress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVideoProgress.fulfilled, (state, action: PayloadAction<GetVideoProgressResponse>) => {
                state.loading = false;
                state.videoProgress = action.payload;
            })
            .addCase(getVideoProgress.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to get video progress";
            })

            // Check Quiz Eligibility
            .addCase(checkQuizEligibility.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkQuizEligibility.fulfilled, (state, action: PayloadAction<CheckQuizEligibilityResponse>) => {
                state.loading = false;
                state.isEligible = action.payload.isEligible;
                state.message = action.payload.message;
            })
            .addCase(checkQuizEligibility.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to check quiz eligibility";
            });
    }
})

export default videosProgressSlice.reducer;