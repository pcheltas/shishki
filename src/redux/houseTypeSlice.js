import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchHouseTypes = createAsyncThunk('fetchHouseTypes', async (path) => {
    const response = await axios.get(`${API_URL}/types`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch house types');
    }
    return response.data;
});

const houseTypesSlice = createSlice({
    name: 'houseTypes',
    initialState: {
        houseTypes: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHouseTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHouseTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.houseTypes = action.payload;
            })
            .addCase(fetchHouseTypes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});

export default houseTypesSlice.reducer;