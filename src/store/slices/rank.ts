import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/constants";

interface RankedUser {
    id: number,
    userId: string,
    userName: string,
    userImage: string,
    totalPoints: number,
    rank: number,
    rankName: string,
    completedCoursesCount: number,
    certificatesCount: number,
    averageQuizScore: number,
    lastUpdated: string,
}


export interface RankState {
    message: string | null;
    loading: boolean;
    statusCode: number | null;
    error: string | null;
    rank: RankedUser | null;
    ranks: RankedUser[] | null;
    stats: {
        Bronze: number;
        Silver: number;
        Gold: number;
        Platinum: number;
        Diamond: number;
    } | null;
}

interface CalculateAndGetUserPointsResponse {
    message: string;
    statusCode: number;
    data: number;
}
interface GetUserRankResponse {
    message: string;
    statusCode: number;
    data: RankedUser;
}
interface GetUserRankRequest {
    token: string;
}
interface GetUserStatsResponse {
    Bronze: number;
    Silver: number;
    Gold: number;
    Platinum: number;
    Diamond: number;
}
interface GetUserStatsRequest {
    token: string;
}
type GetTopUsersRanksResponse = RankedUser[];

interface GetTopUsersRanksRequest {
    token: string;
}

export const getUserRank = createAsyncThunk<GetUserRankResponse, GetUserRankRequest, { rejectValue: { message: string; statusCode: number } }>("rank/getUserRank", async ({ token }: GetUserRankRequest, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/Rank/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as GetUserRankResponse;
    } catch (error: any) {
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
});
export const getUserStats = createAsyncThunk<GetUserStatsResponse, GetUserStatsRequest, { rejectValue: { message: string; statusCode: number } }>("rank/getUserStats", async ({ token }: GetUserStatsRequest, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/Rank/stats`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as GetUserStatsResponse;
    } catch (error: any) {
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
});
export const getTopUsersRanks = createAsyncThunk<GetTopUsersRanksResponse, GetTopUsersRanksRequest, { rejectValue: { message: string; statusCode: number } }>("rank/getTopUsersRanks", async ({ token }: GetTopUsersRanksRequest, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/Rank/top`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as GetTopUsersRanksResponse;
    } catch (error: any) {
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
});
export const calculateAndGetUserPoints = createAsyncThunk<CalculateAndGetUserPointsResponse, GetTopUsersRanksRequest, { rejectValue: { message: string; statusCode: number } }>("rank/calculateAndGetUserPoints", async ({ token }: GetTopUsersRanksRequest, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/Rank/calculate`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data as CalculateAndGetUserPointsResponse;
    } catch (error: any) {
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
});
export const updateUserRank = createAsyncThunk("rank/updateUserRank", async ({ token }: GetTopUsersRanksRequest, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${baseUrl}/Rank/update`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data ;
    } catch (error: any) {
        return rejectWithValue(error.response.data as { message: string, statusCode: number });
    }
});



const initialState: RankState = {
    message: null,
    loading: false,
    statusCode: null,
    error: null,
    rank: null,
    ranks: null,
    stats: null,
};

const rankSlice = createSlice({
    name: "rank",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle getUserRank
        builder.addCase(getUserRank.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.statusCode = null;
        });
        builder.addCase(getUserRank.fulfilled, (state, action) => {
            state.loading = false;
            state.rank = action.payload.data;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
        });
        builder.addCase(getUserRank.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to fetch user rank.";
            state.statusCode = action.payload?.statusCode || 500;
        });

        // Handle getUserStats
        builder.addCase(getUserStats.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.statusCode = null;
        });
        builder.addCase(getUserStats.fulfilled, (state, action) => {
            state.loading = false;
            state.stats = action.payload;
            state.message = "User stats fetched successfully.";
            state.statusCode = 200;
        });
        builder.addCase(getUserStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to fetch user stats.";
            state.statusCode = action.payload?.statusCode || 500;
        });

        // Handle getTopUsersRanks
        builder.addCase(getTopUsersRanks.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.statusCode = null;
        });
        builder.addCase(getTopUsersRanks.fulfilled, (state, action) => {
            state.loading = false;
            state.ranks = action.payload as RankedUser[];
            state.message = "Top users ranks fetched successfully.";
            state.statusCode = 200;
        });
        builder.addCase(getTopUsersRanks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to fetch top users ranks.";
            state.statusCode = action.payload?.statusCode || 500;
        });

        // Handle calculateAndGetUserPoints
        builder.addCase(calculateAndGetUserPoints.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.message = null;
            state.statusCode = null;
        });
        builder.addCase(calculateAndGetUserPoints.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
            // If you want to store the calculated points, you can add a field like:
            // state.totalPoints = action.payload.data;
        });
        builder.addCase(calculateAndGetUserPoints.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to calculate and get user points.";
            state.statusCode = action.payload?.statusCode || 500;
        });
    },
});


export default rankSlice.reducer;