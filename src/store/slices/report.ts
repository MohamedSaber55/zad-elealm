import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";


interface CreateReportResponse {
    message: string;
    statusCode: number;
}
interface CreateReportRequest {
    token: string;
    body: {
        titleOfTheIssue: string;
        description: string;
        reportTypes: number;
    }
}

export const createReport = createAsyncThunk<CreateReportResponse, CreateReportRequest>(
    'reports/createReport   ',
    async ({ token, body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<CreateReportResponse>(`${baseUrl}/Report`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data as ErrorResponse);
        }
    }
)

// Interface for the error response
interface ErrorResponse {
    message: string;
    statusCode: number;
}


// Interface for the initial state
interface ReportsState {
    reports: any[]; // Replace `any` with a more specific type if possible
    loading: boolean;
    error: ErrorResponse | null;
    statusCode: number | null;
    message: string | null;
}

// Initial state
const initialState: ReportsState = {
    reports: [],
    loading: false,
    error: null,
    statusCode: null,
    message: null,
};

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReport.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.statusCode = null;
                state.message = null;
            })
            .addCase(createReport.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(createReport.rejected, (state, action) => {
                state.loading = false;
                const errorPayload = action.payload as ErrorResponse;
                state.error = errorPayload;
                state.message = errorPayload.message;
                state.statusCode = errorPayload.statusCode;
            })
    }
})

export default reportsSlice.reducer;