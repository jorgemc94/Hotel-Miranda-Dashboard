import { configureStore } from '@reduxjs/toolkit';
import { UsersSlice } from '../Features/users/usersSlice';
import { RoomsSlice } from '../Features/rooms/roomsSlice';
import { BookingsSlice } from '../Features/booking/bookingsSlice';


export const Store = configureStore ({
    reducer: {
            users: UsersSlice.reducer,
            rooms: RoomsSlice.reducer,
            bookings: BookingsSlice.reducer
    }
})

export type AppStore = typeof Store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];