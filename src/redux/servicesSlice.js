import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchServices = createAsyncThunk('Additional/fetchServices', async () => {
    const response = await axios.get(`${API_URL}/services`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch services');
    }
    return response.data;
});

const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        cart: [],
        loading: false,
        error: null,
    },
    reducers: {
        addServiceToCart(state, action) {
            state.cart.push(action.payload);
        },
        deleteServiceFromCart(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});
export const {addServiceToCart, deleteServiceFromCart} = serviceSlice.actions;

export default serviceSlice.reducer;