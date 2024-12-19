import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchGuests = createAsyncThunk('fetchGuests', async (token, {rejectWithValue}) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    try {
        const response = await axios.get(`${API_URL}/guests/account`, headers);
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Не удалось загрузить гостей');
    }
});

export const addGuest = createAsyncThunk('addGuest', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]
    }
    try {
        const response = await axios.post(`${API_URL}/guests`, args[0], {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

const guestsSlice = createSlice({
    name: 'guests',
    initialState: {
        guests: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGuests.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGuests.fulfilled, (state, action) => {
                state.loading = false;
                state.guests = action.payload;
            })
            .addCase(fetchGuests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addGuest.pending, (state) => {
                state.loading = true;
            })
            .addCase(addGuest.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addGuest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});

export default guestsSlice.reducer;