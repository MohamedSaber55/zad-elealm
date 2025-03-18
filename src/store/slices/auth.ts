import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { RootState } from "../store";
import { baseUrl, getAuthToken } from "../../utils/constants";
import { User } from "../../interfaces";
import Cookies from "js-cookie";
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

interface RegisterResponse {
    message: string;
    statusCode: number;
}
interface RegisterRequest {
    body: {
        displayName: string;
        email: string;
        password: string;
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
        email: string;
        newPassword: string;
        confirmPassword: string;
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

export const loginAsync = createAsyncThunk<LoginResponse, LoginRequest>(
    'auth/login',
    async ({ body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<LoginResponse>(`${baseUrl}/Account/login`, body);
            const result = response.data;
            return result;
        } catch (err) {
            // return rejectWithValue(err.response.data);
            return rejectWithValue(err);
        }
    }
);

export const registerAsync = createAsyncThunk<RegisterResponse, RegisterRequest, { rejectValue: { message: string; statusCode: number } }>(
    'auth/register',
    async ({ body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<RegisterResponse>(`${baseUrl}/Account/register`, body);
            const result = response.data;
            return result;
        } catch (err: any) {
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
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
        } catch (err: any) {
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
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
        } catch (err: any) {
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
        }
    }
);

export const getCurrentUserAsync = createAsyncThunk<LoginResponse, GetCurrentUserRequest>(
    'auth/getCurrentUser',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<LoginResponse>(`${baseUrl}/Account/current-user`, {
                headers: {
                    Authorization: `Bearer ${getAuthToken() || token}`
                }
            });
            const result = response.data;
            return result;
        } catch (err: any) {
            return rejectWithValue(err.response.data as { message: string, statusCode: number });
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
    user: Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null,
    loading: false,
    error: null,
    message: null,
    statusCode: null,
    token: Cookies.get("token") || null,
    refreshToken: Cookies.get("refreshToken") || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            Cookies.remove("token");
            Cookies.remove("refreshToken");
            Cookies.remove("user");

            return {
                ...state,
                token: null,
                refreshToken: null,
                user: null,
            };
        },
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
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as RegisterResponse).statusCode;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = action.payload?.message || null;
                state.statusCode = action.payload?.statusCode || null;
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
                if (action.payload.statusCode == 200) {
                    const userData = {
                        id: 0,
                        DisplayName: action.payload.data.displayName,
                        email: action.payload.data.email,
                    };
                    state.user = userData;
                    state.token = action.payload.data.token;
                    state.refreshToken = action.payload.data.refreshToken;

                    Cookies.set("token", action.payload.data.token, { expires: 7 });
                    Cookies.set("refreshToken", action.payload.data.refreshToken, { expires: 7 });
                    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
                }
            })
            .addCase(loginAsync.rejected, (state, action) => {
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
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as RegisterResponse).statusCode;
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
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as RegisterResponse).statusCode;
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
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as RegisterResponse).statusCode;
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
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as RegisterResponse).statusCode;
            })
    }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;