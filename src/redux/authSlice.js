import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "./store";

export const register = createAsyncThunk('auth/register', async (userDto, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
    }
    try {
        console.log(userDto)
        const response = await axios.post(`${API_URL}/register`, userDto, {headers});
        return response.data;
    } catch (error) {
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

export const login = createAsyncThunk('auth/login', async (authDto, {rejectWithValue}) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8'
    }
    try {
        const response = await axios.post(`${API_URL}/login`, authDto, {headers});
        return response.data;
    } catch (error) {
        if (error.response.status === 401) {
            return rejectWithValue(`Неверный логин или пароль`);
        } else if (error.response.status !== 200) {
            return rejectWithValue(`Прозошла ошибка при входе`);
        }
        throw rejectWithValue(error.response?.data?.message || error.message || 'Произошла ошибка');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        token: null,
        role: null,
        login: null,
        guest: {
            name: null,
            surname: null,
            phone: null,
            email: null
        },
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.role = null;
            state.login = null;
            state.guest = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.login = action.payload.login
                state.guest = action.payload.guest
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.role = action.payload.role;
                state.login = action.payload.login
                state.token = action.payload.token;
                state.guest = action.payload.guest
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                action.error = action.payload
            })
    },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;