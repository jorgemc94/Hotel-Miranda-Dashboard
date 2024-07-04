import { configureStore } from '@reduxjs/toolkit';
import { UsersSlice } from '../Features/users/usersSlice';
import { RoomsSlice } from '../Features/rooms/roomsSlice';


export const Store = configureStore ({
    reducer: {
            users: UsersSlice.reducer,
            rooms: RoomsSlice.reducer
    }
})