import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchHouses = createAsyncThunk('fetchHouses', async (path) => {
    const response = await axios.get(`${API_URL}/houses${path}`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch houses');
    }
    return response.data;
});

export const fetchBookedDays = createAsyncThunk('fetchBookedDays', async (id) => {
    const response = await axios.get(`${API_URL}/houses/${id}/booked`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch booked days for this house');
    }
    return response.data;
});

const housesSlice = createSlice({
    name: 'houses',
    initialState: {
        houses: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHouses.fulfilled, (state, action) => {
                state.loading = false;
                state.houses = action.payload;
            })
            .addCase(fetchHouses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});
export default housesSlice.reducer;