import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const addPhoto = createAsyncThunk('addPhoto', async (args, {rejectWithValue}) => {
    const formData = new FormData();
    formData.append("file", args[0]);
    const headers = {
        'Authorization': 'Bearer ' + args[1]
    }
    try {
        const response = await axios.post(`${API_URL}/photo`, formData, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

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