import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../../interfaces";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
type State = {
    loading: boolean;
    error: any;
    result: {
        quizName: string;
        score: number;
        isCompleted: boolean;
        totalQuestions: number;
        correctAnswers: number;
        unansweredQuestions: number;
        date: string;
        questionResults: {
            questionId: number;
            questionText: string;
            isCorrect: boolean;
            selectedChoice: number;
            correctChoice: number;
        }[]
    } | null;
    quiz: Quiz | null;
    statusCode: number | null;
    message: string | null;
    status: string | null;
}

interface GetQuizDetailsResponse {
    data: Quiz;
    statusCode: number;
    message: string;
}
interface GetQuizDetailsRequest {
    token: string;
    id: string;
}
interface SubmitQuizDetailsRequest {
    token: string;
    body: {
        quizId: number;
        studentAnswers: {
            questionId: number;
            selectedChoice: number;
        }[];
    };
}
interface SubmitQuizDetailsResponse {
    data: {
        quizName: string;
        score: number;
        isCompleted: boolean;
        totalQuestions: number;
        correctAnswers: number;
        unansweredQuestions: number;
        date: string;
        questionResults: {
            questionId: number;
            questionText: string;
            isCorrect: boolean;
            selectedChoice: number;
            correctChoice: number;
        }[];
    };
    statusCode: number;
    message: string;
}

const initialState: State = {
    quiz: null,
    result: null,
    loading: false,
    error: null,
    message: null,
    statusCode: null,
    status: null,
}
export const getQuizDetails = createAsyncThunk<GetQuizDetailsResponse, GetQuizDetailsRequest>(
    'quizzes/getOne',
    async ({ token, id }, { rejectWithValue }) => {
        try {
            const response = await axios.get<GetQuizDetailsResponse>(`${baseUrl}/Quiz/${id}`, {
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

export const submitQuiz = createAsyncThunk<SubmitQuizDetailsResponse, SubmitQuizDetailsRequest>(
    'quizzes/submit',
    async ({ token, body }, { rejectWithValue }) => {
        try {
            const response = await axios.post<SubmitQuizDetailsResponse>(`${baseUrl}/Quiz/submit`, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);

            return response.data;
        } catch (error: any) {
            console.log(error);
            return rejectWithValue(error.response.data as { message: string, statusCode: number });
        }
    }
)

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuizDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.status = 'pending';
            })
            .addCase(getQuizDetails.fulfilled, (state, action: PayloadAction<GetQuizDetailsResponse>) => {
                state.loading = false;
                state.quiz = action.payload.data;
                state.message = action.payload.message || null;
                state.statusCode = action.payload.statusCode || null;
                state.result = null;
                state.status = 'fulfilled';
            })
            .addCase(getQuizDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as GetQuizDetailsResponse).statusCode;
                state.status = 'rejected';
            })
            // -------------------------- Submit Quiz --------------------------
            .addCase(submitQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
                state.statusCode = null;
                state.status = 'pending';
            })
            .addCase(submitQuiz.fulfilled, (state, action: PayloadAction<SubmitQuizDetailsResponse>) => {
                state.loading = false;
                state.message = action.payload.message || null;
                state.statusCode = action.payload.statusCode || null;
                state.result = action.payload.data;
                state.status = 'fulfilled';
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.message = (action.payload as any).message;
                state.statusCode = (action.payload as SubmitQuizDetailsResponse).statusCode;
                state.status = 'rejected';
            })
    },
})

export default quizzesSlice.reducer;