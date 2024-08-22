import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingsListThunk, BookingThunk, addBookingThunk, updateBookingThunk, deleteBookingThunk } from "./bookingsThunk";
import { Booking } from "../../types";
import { RootState } from "../../App/store";

interface BookingsState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    bookings: Booking[];
    booking: Booking;
}

const initialState: BookingsState = {
    error: null,
    status: 'idle',
    bookings: [],
    booking: {} as Booking
};

export const BookingsSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(BookingsListThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(BookingsListThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(BookingsListThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.bookings = action.payload;
            })
            .addCase(BookingThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(BookingThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(BookingThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.booking = action.payload as Booking;
            })
            .addCase(addBookingThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addBookingThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(addBookingThunk.fulfilled, (state, action: PayloadAction<Booking> ) => {
                state.status = 'fulfilled'
                state.bookings.push(action.payload);
                state.booking = action.payload;
            })
            .addCase(updateBookingThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateBookingThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(updateBookingThunk.fulfilled, (state, action: PayloadAction<Booking> ) => {
                const index = state.bookings.findIndex(booking => booking._id === action.payload._id);
                if (index !== -1) {
                    state.bookings[index] = action.payload;
                    state.booking = action.payload;
                }
            })
            .addCase(deleteBookingThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteBookingThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(deleteBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
                console.log(action.payload)
                state.bookings = state.bookings.filter(booking => booking._id !== action.payload._id);
            })
            
    }
});

export const getBookingList = (state: RootState) => state.bookings.bookings;
export const getBooking = (state: RootState) => state.bookings.booking;
export const getBookingsStatus = (state: RootState) => state.bookings.status;
export const getBookingsError = (state: RootState) => state.bookings.error;

export default BookingsSlice.reducer;
