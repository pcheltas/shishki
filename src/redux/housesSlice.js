import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchHouses = createAsyncThunk('fetchHouses', async (path) => {
    console.log("fetchHouses")
    const response = await axios.get(`${API_URL}/houses${path}`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch houses');
    }
    return response.data;
});

export const fetchHouseStatuses = createAsyncThunk('fetchHouseStatuses', async () => {
    const response = await axios.get(`${API_URL}/statuses`);
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

export const fetchHouseCode = createAsyncThunk('fetchHouseCode', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]
    }
    try {
        const response = await axios.get(`${API_URL}/houses/${args[0]}/code`, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

export const addHouse = createAsyncThunk('addHouse', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]
    }
    try {
        const response = await axios.post(`${API_URL}/houses`, args[0], {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});


export const editHouse = createAsyncThunk('editHouse', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[2]
    }
    try {
        const response = await axios.put(`${API_URL}/houses/${args[0]}`, args[1], {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

const housesSlice = createSlice({
    name: 'houses',
    initialState: {
        houses: [],
        houseStatuses: [],
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
            .addCase(fetchHouseStatuses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchHouseStatuses.fulfilled, (state, action) => {
                state.loading = false;
                state.houseStatuses = action.payload;
            })
            .addCase(fetchHouseStatuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editHouse.pending, (state) => {
                state.loading = true;
            })
            .addCase(editHouse.fulfilled, (state, action) => {
                state.loading = false;
                state.houses = state.houses.map(house =>
                    house.id === action.payload.id ? action.payload : house
                );
            })
            .addCase(editHouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});
export default housesSlice.reducer;