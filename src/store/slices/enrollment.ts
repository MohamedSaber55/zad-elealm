import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
type State = {
    loading: boolean;
    error: any;
    courses: {
        id: number;
        name: string;
        description: string;
        author: string;
        courseLanguage: string;
        courseVideosCount: number;
        rating: number;
        imageUrl: string;
        createdAt: string;
    }[] | null;
    allEnrolledCourses: number | null;
    statusCode: number | null;
    message: string | null;
    status: string | null;
}

interface GetEnrolledCoursesResponse {
    data: {
        courses: {
            id: number;
            name: string;
            description: string;
            author: string;
            courseLanguage: string;
            courseVideosCount: number;
            rating: number;
            imageUrl: string;
            createdAt: string;
        }[],
        allEnrolledCourses: number;
    }
    statusCode: number;
    message: string;
}
interface GetEnrolledCoursesRequest {
    token: string;
}
interface EnrollCourseRequest {
    token: string;
    id: number;
}
interface EnrollCourseResponse {
    statusCode: number;
    message: string;
}

const initialState: State = {
    courses: null,
    allEnrolledCourses: null,
    loading: false,
    error: null,
    message: null,
    statusCode: null,
    status: null,
}
export const getEnrolledCourses = createAsyncThunk<GetEnrolledCoursesResponse, GetEnrolledCoursesRequest>(
    'enrollment/getAll',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetEnrolledCoursesResponse>(`${baseUrl}/Enrollment`, {
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

export const enrollCourse = createAsyncThunk<EnrollCourseResponse, EnrollCourseRequest>(
    'Enrollment/EnrollCourse',
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await axios.post<EnrollCourseResponse>(`${baseUrl}/Enrollment/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data as { message: string, statusCode: number });
        }
    }
)
export const unEnrollCourse = createAsyncThunk<EnrollCourseResponse, EnrollCourseRequest>(
    'Enrollment/UnEnrollCourse',
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await axios.delete<EnrollCourseResponse>(`${baseUrl}/Enrollment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data as { message: string, statusCode: number });
        }
    }
)

const enrollmentSlice = createSlice({
    name: 'enrollment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEnrolledCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.status = 'pending';
            })
            .addCase(getEnrolledCourses.fulfilled, (state, action: PayloadAction<GetEnrolledCoursesResponse>) => {
                state.loading = false;
                if (action.payload.message == "لا توجد دورات مسجلة") {
                    state.courses = [];
                    state.allEnrolledCourses = 0
                } else {
                    state.courses = action.payload.data.courses;
                    state.allEnrolledCourses = action.payload.data.allEnrolledCourses;
                }
                state.message = action.payload.message || null;
                state.statusCode = action.payload.statusCode || null;
                state.status = 'fulfilled';
            })
            .addCase(getEnrolledCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = (action.payload as GetEnrolledCoursesResponse)?.message || null;
                state.statusCode = (action.payload as GetEnrolledCoursesResponse)?.statusCode || null;
                state.status = 'rejected';
            })
            // -------------------------- Enroll Course --------------------------
            .addCase(enrollCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.status = 'pending';
            })
            .addCase(enrollCourse.fulfilled, (state, action: PayloadAction<EnrollCourseResponse>) => {
                state.loading = false;
                state.message = action.payload.message || null;
                state.statusCode = action.payload.statusCode || null;
                state.status = 'fulfilled';
            })
            .addCase(enrollCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as EnrollCourseResponse).statusCode;
                state.status = 'rejected';
            })
            // -------------------------- unEnroll Course --------------------------
            .addCase(unEnrollCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.status = 'pending';
            })
            .addCase(unEnrollCourse.fulfilled, (state, action: PayloadAction<EnrollCourseResponse>) => {
                state.loading = false;
                state.message = action.payload.message || null;
                state.statusCode = action.payload.statusCode || null;
                state.status = 'fulfilled';
            })
            .addCase(unEnrollCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as EnrollCourseResponse).statusCode;
                state.status = 'rejected';
            })
    },
})

export default enrollmentSlice.reducer;