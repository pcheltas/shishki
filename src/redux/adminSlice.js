import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const fetchAccounts = createAsyncThunk('fetchAccounts', async (token, {rejectWithValue}) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    try {
        const response = await axios.get(`${API_URL}/admin/accounts`, headers);
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Не удалось загрузить аккаунты');
    }
});

export const addStuff = createAsyncThunk('makeStuff', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]

    }
    try {
        const response = await axios.put(`${API_URL}/admin/${args[0]}:staff`, {}, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

export const addAdmin = createAsyncThunk('makeAdmin', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]

    }
    try {
        const response = await axios.put(`${API_URL}/admin/${args[0]}:admin`, {}, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

export const fetchGlampingsForReview = createAsyncThunk('fetchGlampingsForReview', async (token, {rejectWithValue}) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    try {
        const response = await axios.get(`${API_URL}/admin/glampings`, headers);
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Не удалось загрузить глэмпинги для ревью');
    }
});

export const approveGlamping = createAsyncThunk('approveGlamping', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]

    }
    try {
        const response = await axios.put(`${API_URL}/admin/glampings/${args[0]}:approve`, {}, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

export const rejectGlamping = createAsyncThunk('approveGlamping', async (args, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + args[1]

    }
    try {
        const response = await axios.put(`${API_URL}/admin/glampings/${args[0]}:reject`, {}, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        accounts: [],
        glampingsForReview: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccounts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
            })
            .addCase(fetchAccounts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addStuff.pending, (state) => {
                state.loading = true;
            })
            .addCase(addStuff.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addStuff.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(addAdmin.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchGlampingsForReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGlampingsForReview.fulfilled, (state, action) => {
                state.loading = false;
                state.glampingsForReview = action.payload;
            })
            .addCase(fetchGlampingsForReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });


    },
});

export default adminSlice.reducer;