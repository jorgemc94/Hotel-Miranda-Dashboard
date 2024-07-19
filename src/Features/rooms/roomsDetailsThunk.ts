import { createAsyncThunk } from "@reduxjs/toolkit";


const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const RoomDetailsThunk = createAsyncThunk('room/getRoom', async ({id, roomsList}) => {
    const room = roomsList.find((room) => room.id == id)
    console.log (room)
    return room
    
});