import { createAsyncThunk } from "@reduxjs/toolkit";
import BookingsJson from "../../Components/data/bookings.json";
import { Booking } from "../../types";

const delay = (data: any) : Promise<any>=> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

export const BookingsThunk = createAsyncThunk('bookings/getBookingList', async () => {
    const bookings = await delay(BookingsJson) as Booking[];
    return bookings;
});
