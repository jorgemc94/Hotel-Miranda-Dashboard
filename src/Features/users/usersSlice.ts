import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { RootState } from "../../App/store";
import { addUserThunk, deleteUserThunk, updateUserThunk, UsersListThunk, UserThunk } from "./usersThunk";

interface UsersState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    users: User[];
    user: User;
}

const initialState: UsersState = {
    error: null,
    status: 'idle',
    users: [],
    user: {} as User
};

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(UsersListThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(UsersListThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(UsersListThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.users = action.payload;
            })
            .addCase(UserThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(UserThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(UserThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.user = action.payload as User;
            })
            .addCase(addUserThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addUserThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(addUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'fulfilled';
                state.users.push(action.payload);
                state.user = action.payload;
            })
            .addCase(updateUserThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User> ) => {
                state.users = state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user
                );
                state.status = 'fulfilled'
            })
            .addCase(deleteUserThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteUserThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.users = state.users.filter(user => user._id !== action.payload._id);
            })
            
    }
});

export const getUserList = (state: RootState) => state.users.users;
export const getUser = (state: RootState) => state.users.user;
export const getUsersStatus = (state: RootState) => state.users.status;
export const getUsersError = (state: RootState) => state.users.error;

export default UsersSlice.reducer;
