import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchReviews = createAsyncThunk('fetchReviews', async () => {
    const response = await axios.get(`${API_URL}/reviews`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch reviews');
    }
    return response.data;
});

export const addReview = createAsyncThunk('addReview', async (args, {rejectWithValue}) => {
    const getHeaders = {
        headers: {
            'Authorization': 'Bearer ' + args[1],
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
    try{
        const response = await axios.post(`${API_URL}/reviews`, args[0], getHeaders);
        return await response.data;
    } catch (error) {
        if (error.response.data) {
            return rejectWithValue(error.response.data);
        }
        throw rejectWithValue(error.response?.data?.message || error.message || 'Не удалось добавить отзыв');
    }
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});

export default reviewsSlice.reducer;