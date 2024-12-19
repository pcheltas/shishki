import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";



const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        photos: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // builder
            // .addCase(fetchPhoto.pending, (state) => {
            //     state.loading = true;
            // })
            // .addCase(fetchPhoto.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.photos.push(action.payload);
            // })
            // .addCase(fetchPhoto.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message;
            // });


    },
});

export default photoSlice.reducer;