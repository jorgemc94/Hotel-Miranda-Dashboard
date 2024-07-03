import { createSlice } from "@reduxjs/toolkit";
import { UsersThunk } from "./usersThunk";
import { UserDetailsThunk } from "./userDetailsThunk";

const initialState = {
    error: null,
    status: 'idle',
    users: [],
    user: null
};

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },

        deleteUser:(state,action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },

        editUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },


    },
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
            })
            .addCase(UserDetailsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(UserDetailsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(UserDetailsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.user = action.payload;
            });
    }
});

export const getUsersList = (state) => state.users.users;
export const getUser = (state) => state.users.user;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
export const {addUser, editUser, deleteUser,resetState} = UsersSlice.actions;