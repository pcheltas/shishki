import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchBookings = createAsyncThunk('fetchBookings', async (token, {rejectWithValue}) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    try {
        const response = await axios.get(`${API_URL}/bookings/my`, headers);
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Не удалось загрузить бронирования');
    }
});

export const deleteBooking = createAsyncThunk('deleteBooking', async (args, {rejectWithValue}) => {
    const getHeaders = {
        headers: {
            'Authorization': 'Bearer ' + args[1],
            'Content-Type': 'application/json; charset=utf-8'
        }
    }
    try{
        const response = await axios.delete(`${API_URL}/bookings/${args[0]}`, getHeaders);
        return await response.data;
    } catch (error) {
        if (error.response.status === 403) {
            return rejectWithValue(`Недостаточно прав. Невозможно удалить`);
        }
    }
});

export const addBooking = createAsyncThunk('addBooking', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]

    }
    try {
        const response = await axios.post(`${API_URL}/bookings`, args[0], {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});



const bookingsSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: [],
        currentBooking: {
            filling: false,
            formData: {}
        },
        loading: false,
        error: null,
    },
    reducers: {
        fillBookingForm: (state, value) => {
            state.currentBooking.filling = value.payload
        },
        changeFormData: (state, formData) => {
            state.currentBooking.formData = formData.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })



    },
});

export const {fillBookingForm, changeFormData, changeHouseId} = bookingsSlice.actions;
export default bookingsSlice.reducer;