import { configureStore } from '@reduxjs/toolkit';
import { UsersSlice } from '../Features/users/usersSlice';


export const Store = configureStore ({
    reducer: {
            users: UsersSlice.reducer
    }
})