import { createSlice } from "@reduxjs/toolkit";
import { UsersThunk } from "./usersThunk";

const initialState = {
    error: null,
    status: 'idle',
    users: [],
    user: null
};

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UsersThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(UsersThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(UsersThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.users = action.payload;
            });
    }
});

export const getUsersList = (state) => state.users.users;
export const getUser = (state) => state.users.user;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
