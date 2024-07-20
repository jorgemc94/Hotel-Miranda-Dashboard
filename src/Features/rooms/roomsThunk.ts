import { createAsyncThunk } from "@reduxjs/toolkit";
import roomsJson from "../../Components/data/rooms.json";
import { Room } from "../../types";

const delay = (data: any) : Promise<any>=> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

export const RoomsThunk = createAsyncThunk('rooms/getRoomsList', async () => {
    const rooms = await delay(roomsJson) as Room[];
    return rooms;
});
