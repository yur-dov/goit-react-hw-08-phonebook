import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = `https://connections-api.herokuapp.com/`;

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = createAsyncThunk(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/signup', credentials);
            token.set(data.token);
            return data;
        } catch (error) {
            if (error.request.status === 400) {
                toast.error(`this email is already exist, please try something else`, {
                    duration: 3000,
                    position: 'top-center',
                });
            }

            if (error.request.status === 500) {
                toast.error(`ups something went wrong, please try later`, {
                    duration: 3000,
                    position: 'top-center',
                });
            }

            return rejectWithValue(error.message);
        }
    }
);

export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/users/login', credentials);
            token.set(data.token);
            return data;
        } catch (error) {
            if (error.request.status === 400) {
                toast.error(`wrong email or password, please try something else`, {
                    duration: 3000,
                    position: 'top-center',
                });
            }
            return rejectWithValue(error.message);
        }
    }
);

export const logOut = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            console.log(axios.defaults.headers.common.Authorization);
            await axios.post('/users/logout');
            token.unset();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const refreshCurrentUser = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue();
        }
        token.set(persistedToken);

        try {
            const { data } = await axios.get('/users/current');

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
