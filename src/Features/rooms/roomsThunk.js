import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsJson from "../../Components/data/rooms.json";

const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const RoomsThunk = createAsyncThunk('rooms/getRoomsList', async () => {
    const rooms = await delay(roomsJson);
    return rooms;
});
