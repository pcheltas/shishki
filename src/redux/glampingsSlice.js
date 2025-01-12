import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchGlampings = createAsyncThunk('fetchGlampings', async () => {
    const response = await axios.get(`${API_URL}/glampings/approved`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch glampings');
    }
    return response.data;
});

export const fetchAllGlampings = createAsyncThunk('fetchAllGlampings', async () => {
    const response = await axios.get(`${API_URL}/glampings`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch glampings');
    }
    return response.data;
});

export const addGlamping = createAsyncThunk('addGlamping', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]
    }
    try {
        const response = await axios.post(`${API_URL}/glampings`, args[0], {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

const glampingsSlice = createSlice({
    name: 'reviews',
    initialState: {
        glampingsApproved: [],
        allGlampings: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlampings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGlampings.fulfilled, (state, action) => {
                state.loading = false;
                state.glampingsApproved = action.payload;
            })
            .addCase(fetchGlampings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllGlampings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllGlampings.fulfilled, (state, action) => {
                state.loading = false;
                state.allGlampings = action.payload;
            })
            .addCase(fetchAllGlampings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});

export default glampingsSlice.reducer;