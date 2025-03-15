import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseWithReviews } from "../../interfaces";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
type State = {
    loading: boolean;
    error: any;
    course: CourseWithReviews | null;
    courses: CourseWithReviews[] | null;
    statusCode: number | null;
    message: string | null;
    status: string | null;
}

interface GetCourseDetailsResponse {
    data: CourseWithReviews;
    statusCode: number;
    message: string;
}
interface GetCourseDetailsRequest {
    token: string; // The authentication token
    id: string;    // The ID of the course to fetch
}
const initialState: State = {
    course: null,
    courses: [],
    loading: false,
    error: null,
    message: null,
    statusCode: null,
    status: null,
}
export const getCourseDetails = createAsyncThunk<GetCourseDetailsResponse, GetCourseDetailsRequest>(
    'courses/getOne',
    async ({ token, id }: { token: string; id: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetCourseDetailsResponse>(`${baseUrl}/Course/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data as { message: string, statusCode: number });
        }
    }
);

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        // Add your reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCourseDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.status = 'pending';
            })
            .addCase(getCourseDetails.fulfilled, (state, action: PayloadAction<GetCourseDetailsResponse>) => {
                state.loading = false;
                state.course = action.payload.data;
                state.message = action.payload.message || null;
                state.statusCode = action.payload.statusCode || null;
                state.status = 'fulfilled';
            })
            .addCase(getCourseDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as GetCourseDetailsResponse).statusCode;
                state.status = 'rejected';
            });
    },
})

export default coursesSlice.reducer;