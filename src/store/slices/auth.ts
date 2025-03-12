import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { RootState } from "../store";
import { baseUrl } from "../../utils/constants";
import { User } from "../../interfaces";


interface LoginResponse {
    data: {
        displayName: string;
        email: string;
        token: string;
        refreshToken: string;
    };
    statusCode: number;
    message: string;
}
interface LogoutResponse {
    message: string;
}

interface RegisterResponse {
    message: string;
    statusCode: number;
}
interface RegisterRequest {
    body: {
        DisplayName: string;
        Email: string;
        Password: string;
    }
}
interface VerifyOTPRequest {
    params: {
        email: string;
        otp: string;
    }
}
interface VerifyOTPResponse {
    message: string;
    statusCode: number;
}
interface ForgetPasswordRequest {
    params: {
        email: string;
    }
}
interface ForgetPasswordResponse {
    message: string;
    statusCode: number;
}
interface ResetPasswordRequest {
    body: {
        Email: string;
        NewPassword: string;
        ConfirmPassword: string;
    }
}
interface ResetPasswordResponse {
    message: string;
    statusCode: number;
}

interface LoginRequest {
    body: {
        email: string;
        password: string;
    }
}
interface GetCurrentUserRequest {
    token: string | null;
}
interface LogoutRequest {
    token: string | null;
}
export const loginAsync = createAsyncThunk<LoginResponse, LoginRequest>(
    'auth/login',
    async ({ body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<LoginResponse>(`${baseUrl}/Account/login`, body);
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);
export const logoutAsync = createAsyncThunk<LogoutResponse, LogoutRequest>(
    'auth/logout',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.post<LogoutResponse>(`${baseUrl}/Account/logout`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const registerAsync = createAsyncThunk<RegisterResponse, RegisterRequest>(
    'auth/register',
    async ({ body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<RegisterResponse>(`${baseUrl}/Account/register`, body);
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)

export const forgetPasswordAsync = createAsyncThunk<ForgetPasswordResponse, ForgetPasswordRequest>(
    'auth/forgetPassword',
    async ({ params }, { rejectWithValue }) => {
        try {
            const response = await axios.post<ForgetPasswordResponse>(`${baseUrl}/Account/forget-password`, null, {
                params: {
                    email: params.email
                }
            });
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const verifyOTPAsync = createAsyncThunk<VerifyOTPResponse, VerifyOTPRequest>(
    'auth/verifyOTP',
    async ({ params }, { rejectWithValue }) => {
        try {
            const response = await axios.post<VerifyOTPResponse>(`${baseUrl}/Account/verify-otp`,
                null, {
                params: {
                    email: params.email,
                    otp: params.otp
                }
            });
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const getCurrentUserAsync = createAsyncThunk<LoginResponse, GetCurrentUserRequest>(
    'auth/getCurrentUser',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<LoginResponse>(`${baseUrl}/Account/current-user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const resetPasswordAsync = createAsyncThunk<ResetPasswordResponse, ResetPasswordRequest>(
    'auth/resetPassword',
    async ({ body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<ResetPasswordResponse>(`${baseUrl}/Account/reset-password`, body);
            const result = response.data;
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

interface InitialState {
    user: User | null;
    loading: boolean;
    error: any;
    message: string | null;
    statusCode: number | null;
    token: string | null;
    refreshToken: string | null;
}
const initialState: InitialState = {
    user: null,
    loading: false,
    error: null,
    message: null,
    statusCode: null,
    token: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // --------------------------------- REGISTER ---------------------------------
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
            })
            .addCase(registerAsync.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --------------------------------- LOGIN ---------------------------------
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
            })
            .addCase(loginAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
                state.user = {
                    id: 0,
                    DisplayName: action.payload.data.displayName,
                    email: action.payload.data.email,
                };
                state.token = action.payload.data.token;
                state.refreshToken = action.payload.data.refreshToken;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --------------------------------- LOGOUT ---------------------------------
            .addCase(logoutAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
            })
            .addCase(logoutAsync.fulfilled, (state, action: PayloadAction<LogoutResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --------------------------------- FORGET PASSWORD ---------------------------------
            .addCase(forgetPasswordAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
            })
            .addCase(forgetPasswordAsync.fulfilled, (state, action: PayloadAction<ForgetPasswordResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(forgetPasswordAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --------------------------------- VERIFY OTP ---------------------------------
            .addCase(verifyOTPAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
            })
            .addCase(verifyOTPAsync.fulfilled, (state, action: PayloadAction<VerifyOTPResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(verifyOTPAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --------------------------------- RESET PASSWORD ---------------------------------
            .addCase(resetPasswordAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action: PayloadAction<ResetPasswordResponse>) => {
                state.loading = false;
                state.message = action.payload.message;
                state.statusCode = action.payload.statusCode;
            })
            .addCase(resetPasswordAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // --------------------------------- GET CURRENT USER ---------------------------------
            .addCase(getCurrentUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.user = null;
            })
            .addCase(getCurrentUserAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.loading = false;
                state.user = {
                    id: 0,
                    DisplayName: action.payload.data.displayName,
                    email: action.payload.data.email,
                };
                state.token = action.payload.data.token;
                state.refreshToken = action.payload.data.refreshToken;
            })
            .addCase(getCurrentUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default authSlice.reducer;