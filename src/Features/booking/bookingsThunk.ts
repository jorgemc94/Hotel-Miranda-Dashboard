import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendAPI } from "../callAPI";
import { Booking } from "../../types";

export const BookingsListThunk = createAsyncThunk('booking/getBookings', async () => {
    const bookings = await (backendAPI('/bookings', 'GET')) as Booking[];
    return bookings;
});

export const BookingThunk = createAsyncThunk('booking/getBooking', async (id:string) => {
    const booking = await (backendAPI(`/bookings/${id}`, 'GET')) as Booking;
    return booking
})

export const addBookingThunk = createAsyncThunk('booking/postBooking', async(bookingData: Partial<Booking>) => {
    const addBooking = await (backendAPI('/bookings/newBooking', 'POST', bookingData)) as Booking
    return addBooking
})

export const updateBookingThunk = createAsyncThunk('booking/putBooking', async (bookingData: Booking) => {
    console.log(bookingData)
    const updateBooking = await (backendAPI(`/bookings/update/${bookingData._id}`, 'PUT', bookingData)) as Booking
    console.log(updateBooking)
    return updateBooking
})

export const deleteBookingThunk = createAsyncThunk('booking/deleteBooking', async (id: string) => {
    const deleteBooking = await (backendAPI(`/bookings/delete/${id}`, 'DELETE')) as Booking;
    return deleteBooking;
});
