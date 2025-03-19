import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { Certificate } from "../../interfaces";

interface InitialState {
    certificates: Certificate[];
    certificate: Certificate | null;
    loading: boolean;
    status: string;
    error: string | null;
    message: string | null;
    statusCode: number | null;
}

const initialState: InitialState = {
    certificates: [],
    certificate: null,
    loading: false,
    status: "",
    error: null,
    message: null,
    statusCode: null,
};

// Request and Response Interfaces
interface GenerateCertificateRequest {
    quizId: string;
    token: string;
}

interface DownloadCertificateRequest {
    certificateId: string;
    token: string;
}

interface GetUserCertificatesRequest {
    token: string;
}

interface CertificateResponse {
    data: Certificate[];
    statusCode: number;
    message: string;
}

// Async Thunks
export const generateCertificateAsync = createAsyncThunk<CertificateResponse, GenerateCertificateRequest>(
    "certificates/generateCertificate",
    async ({ quizId, token }, thunkAPI) => {
        try {
            const response = await axios.post<CertificateResponse>(
                `${baseUrl}/Certificate/generate/${quizId}`,
                null,
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

export const downloadCertificateAsync = createAsyncThunk<Blob, DownloadCertificateRequest>(
    "certificates/downloadCertificate",
    async ({ certificateId, token }, thunkAPI) => {
        try {
            const response = await axios.get(`${baseUrl}/Certificate/download/${certificateId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserCertificatesAsync = createAsyncThunk<CertificateResponse, GetUserCertificatesRequest>(
    "certificates/getUserCertificates",
    async ({ token }, thunkAPI) => {
        try {
            const response = await axios.get<CertificateResponse>(`${baseUrl}/Certificate/user`, {
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
const certificatesSlice = createSlice({
    name: "certificates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ---------------------------- GENERATE CERTIFICATE ---------------------------
            .addCase(generateCertificateAsync.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(generateCertificateAsync.fulfilled, (state, action: PayloadAction<CertificateResponse>) => {
                state.status = "succeeded";
                state.loading = false;
                // state.certificate = action.payload.data;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(generateCertificateAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.statusCode = 500;
                state.loading = false;
            })

            // ---------------------------- DOWNLOAD CERTIFICATE ---------------------------
            .addCase(downloadCertificateAsync.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(downloadCertificateAsync.fulfilled, (state) => {
                state.status = "succeeded";
                state.loading = false;
                // Handle the downloaded file (e.g., save it to the user's device)
            })
            .addCase(downloadCertificateAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.statusCode = 500;
                state.loading = false;
            })

            // ---------------------------- GET USER CERTIFICATES ---------------------------
            .addCase(getUserCertificatesAsync.pending, (state) => {
                state.status = "loading";
                state.loading = true;
            })
            .addCase(getUserCertificatesAsync.fulfilled, (state, action: PayloadAction<CertificateResponse>) => {
                state.status = "succeeded";
                state.loading = false;
                state.certificates = action.payload.data;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(getUserCertificatesAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
                state.statusCode = 500;
                state.loading = false;
            });
    },
});

export default certificatesSlice.reducer;