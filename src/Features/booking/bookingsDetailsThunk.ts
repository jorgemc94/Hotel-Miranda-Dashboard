import { createAsyncThunk } from "@reduxjs/toolkit";
import { Booking } from "../../types";

const delay = <T>(data: T): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

interface BookingDetailsPayload {
    id: number;
    bookingList: Booking[];
}

export const BookingDetailsThunk = createAsyncThunk<Booking | undefined, BookingDetailsPayload>(
    'booking/getBooking',
    async ({ id, bookingList }: BookingDetailsPayload) => {
        const booking = bookingList.find((booking) => booking.id === id);
        await delay(booking);
        return booking;
    }
);
