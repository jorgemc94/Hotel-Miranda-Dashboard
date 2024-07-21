import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingsThunk } from "./bookingsThunk";
import { Booking } from "../../types";
import { BookingDetailsThunk } from "./bookingsDetailsThunk";
import { RootState } from "../../App/store";

interface BookingsState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    bookings: Booking[];
    booking: Booking | null;
}

const initialState: BookingsState = {
    error: null,
    status: 'idle',
    bookings: [],
    booking: null
};

export const BookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload);
            state.booking = action.payload;
        },
        deleteBooking: (state, action: PayloadAction<number>) => {
            state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
        },
        editBooking: (state, action: PayloadAction<Booking>) => {
            const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
            if (index !== -1) {
                state.bookings[index] = action.payload;
                state.booking = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(BookingsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(BookingsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(BookingsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.bookings = action.payload;
            })
            .addCase(BookingDetailsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(BookingDetailsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(BookingDetailsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.booking = action.payload as Booking;
            });
    }
});

export const getBookingList = (state: RootState) => state.bookings.bookings;
export const getBooking = (state: RootState) => state.bookings.booking;
export const getBookingsStatus = (state: RootState) => state.bookings.status;
export const getBookingsError = (state: RootState) => state.bookings.error;

export const { addBooking, editBooking, deleteBooking } = BookingsSlice.actions;
export default BookingsSlice.reducer;
