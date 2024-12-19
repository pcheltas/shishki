import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchGoods = createAsyncThunk('Additional/fetchShop', async () => {
    const response = await axios.get(`${API_URL}/shop`);
    if (response.status !== 200) {
        throw new Error('Failed to fetch goods');
    }
    return response.data;
});

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        goods: [],
        cart: [],
        loading: false,
        error: null,
    },
    reducers: {
        addItemToCart(state, action) {
            state.cart.push(action.payload);
        },
        deleteItemFromCart(state, action) {
            state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.loading = false;
                state.goods = action.payload;
            })
            .addCase(fetchGoods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});
export const {addItemToCart, deleteItemFromCart} = shopSlice.actions;

export default shopSlice.reducer;