import { createAsyncThunk } from "@reduxjs/toolkit";


const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const RoomDetailsThunk = createAsyncThunk('user/getUser', async ({id, roomsList}) => {
    const room = usersList.find((rooms) => rooms.id == id)
    console.log (room)
    return room
    
});