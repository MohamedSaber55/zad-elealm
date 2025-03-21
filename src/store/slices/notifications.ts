import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification } from "./../../interfaces/index";
import axios from "axios";
import { baseUrl } from "../../utils/constants";


interface GetNotificationsResponse {
    data: {
        notifications: Notification[];
        unreadCount: number;
        totalCount: number;
    },
    statusCode: number;
    message: string;
}
interface GetNotificationsRequest {
    token: string;
}
interface GetNotificationResponse {
    data: Notification;
    statusCode: number;
    message: string;
}
interface GetNotificationRequest {
    token: string;
    id: number;
}
interface DeleteNotificationResponse {
    statusCode: number;
    message: string;
}
interface DeleteNotificationRequest {
    token: string;
    id: number;
}
interface ReadNotificationResponse {
    statusCode: number;
    message: string;
}
interface ReadNotificationRequest {
    token: string;
    id: number;
}
interface ReadNotificationsResponse {
    statusCode: number;
    message: string;
}
interface ReadNotificationsRequest {
    token: string;
}

export const getNotifications = createAsyncThunk<GetNotificationsResponse, GetNotificationsRequest>(
    "notifications/getNotifications",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetNotificationsResponse>(`${baseUrl}/Notification`, {
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
export const getOneNotification = createAsyncThunk<GetNotificationResponse, GetNotificationRequest>(
    "notifications/getOneNotification",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetNotificationResponse>(`${baseUrl}/Notification/${id}`, {
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
export const markOneAsRead = createAsyncThunk<ReadNotificationResponse, ReadNotificationRequest>(
    "notifications/markOneAsRead",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await axios.post<ReadNotificationResponse>(`${baseUrl}/Notification/mark-as-read/${id}`, null, {
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
export const deleteNotification = createAsyncThunk<DeleteNotificationResponse, DeleteNotificationRequest>(
    "notifications/deleteNotification",
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await axios.delete<ReadNotificationResponse>(`${baseUrl}/Notification/${id}`, {
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
export const markAllAsRead = createAsyncThunk<ReadNotificationsResponse, ReadNotificationsRequest>(
    "notifications/mark-all-as-read",
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await axios.post<GetNotificationResponse>(`${baseUrl}/Notification/mark-all-as-read`, null, {
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

interface initialState {
    message: string | null,
    loading: boolean;
    getAllLoading: boolean;
    error: any;
    statusCode: number | null;
    status: string | null;
    unreadCount: number | null;
    totalCount: number | null;
    notifications: Notification[];
    notification: Notification | null;
}

const initialState: initialState = {
    message: null,
    loading: false,
    getAllLoading: false,
    error: null,
    totalCount: null,
    unreadCount: null,
    statusCode: null,
    status: null,
    notifications: [],
    notification: null
}
const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.pending, (state) => {
                state.getAllLoading = true;
                state.error = null;
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.getAllLoading = false;
                if (action.payload.message === "لا توجد إشعارات") {
                    state.notifications = [];
                    state.totalCount = 0;
                    state.unreadCount = 0;
                } else {
                    state.notifications = action.payload.data.notifications;
                    state.totalCount = action.payload.data.totalCount;
                    state.unreadCount = action.payload.data.unreadCount;
                }
                state.statusCode = action.payload.statusCode;
                state.message = action.payload.message;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.getAllLoading = false;
                state.error = action.payload;
            })

            .addCase(getOneNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.notification = action.payload.data;
                state.statusCode = action.payload.statusCode;
                state.message = action.payload.message;
            })
            .addCase(getOneNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(markOneAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markOneAsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.statusCode = action.payload.statusCode;
                state.message = action.payload.message;
                state.notifications = state.notifications.map(notification =>
                    notification.id === action.meta.arg.id ? { ...notification, isRead: true } : notification
                );
            })
            .addCase(markOneAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(deleteNotification.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.loading = false;
                state.statusCode = action.payload.statusCode;
                state.message = action.payload.message;
                state.notifications = state.notifications.filter(notification => notification.id !== action.meta.arg.id);
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(markAllAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAllAsRead.fulfilled, (state, action) => {
                state.loading = false;
                state.statusCode = action.payload.statusCode;
                state.message = action.payload.message;
                state.notifications = state.notifications.map(notification => ({ ...notification, isRead: true }));
            })
            .addCase(markAllAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default notificationsSlice.reducer;
