import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersThunk } from "./usersThunk";
import { User } from "../../types";
import { UserDetailsThunk } from "./userDetailsThunk";
import { RootState } from "../../App/store";

interface UsersState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    users: User[];
    user: User | null;
}

const initialState: UsersState = {
    error: null,
    status: 'idle',
    users: [],
    user: null,
};

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        editUser: (state, action: PayloadAction<User>) => {
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
                state.error = action.error.message || null;
            })
            .addCase(UsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.status = 'fulfilled';
                state.users = action.payload;
            })
            .addCase(UserDetailsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(UserDetailsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(UserDetailsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.user = action.payload as User;
            });
    }
});

export const getUsersList = (state: RootState): User[] => state.users.users;
export const getUser = (state: RootState): User | null => state.users.user;
export const getUsersStatus = (state: RootState): UsersState['status'] => state.users.status;
export const getUsersError = (state: RootState): string | null => state.users.error;

export const { addUser, editUser, deleteUser } = UsersSlice.actions;

export default UsersSlice.reducer;
