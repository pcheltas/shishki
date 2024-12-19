import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchGlampings = createAsyncThunk('fetchGlampings', async () => {
    const response = await axios.get(`${API_URL}/glampings`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch glampings');
    }
    return response.data;
});

const glampingsSlice = createSlice({
    name: 'reviews',
    initialState: {
        glampings: [],
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
                state.glampings = action.payload;
            })
            .addCase(fetchGlampings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});

export default glampingsSlice.reducer;