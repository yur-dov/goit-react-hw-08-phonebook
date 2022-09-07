import { createReducer } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshCurrentUser } from './auth-operations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshingCurrentUser: false,
};

export const authReducer = createReducer(initialState, {
    [register.fulfilled]: (state, { payload }) => ({
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
    }),
    [logIn.fulfilled]: (state, { payload }) => ({
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true,
    }),
    [logOut.fulfilled]: (state, action) => ({
        user: { name: null, email: null },
        token: null,
        isLoggedIn: false,
    }),

    [refreshCurrentUser.pending]: (state, { payload }) => ({
        ...state,
        isRefreshingCurrentUser: true,
    }),

    [refreshCurrentUser.fulfilled]: (state, { payload }) => ({
        ...state,
        user: { ...payload },
        isLoggedIn: true,
        isRefreshingCurrentUser: false,
    }),
    [refreshCurrentUser.rejected]: (state, { payload }) => ({
        ...state,
        isRefreshingCurrentUser: false,
    }),
});
