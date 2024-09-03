import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendAPI } from "../callAPI";
import { Room } from "../../types";

export const RoomsListThunk = createAsyncThunk('room/getRooms', async () => {
    const rooms = await (backendAPI('/rooms', 'GET')) as Room[];
    return rooms;
});

export const RoomThunk = createAsyncThunk('room/getRoom', async (id: string) => {
    const room = await (backendAPI(`/rooms/${id}`, 'GET')) as Room;
    return room;
});

export const addRoomThunk = createAsyncThunk('room/postRoom', async (roomData: Room) => {
    const addRoom = await (backendAPI('/rooms/newRoom', 'POST', roomData)) as Room;
    return addRoom;
});


export const updateRoomThunk = createAsyncThunk('room/putRoom', async (roomData: Room) => {
    console.log(roomData);
    const updateRoom = await (backendAPI(`/rooms/${roomData._id}`, 'PUT', roomData)) as Room;
    return updateRoom;
});

export const deleteRoomThunk = createAsyncThunk('room/deleteRoom', async (id: string) => {
    const deleteRoom = await (backendAPI(`/rooms/delete/${id}`, 'DELETE')) as Room;
    return deleteRoom;
});
