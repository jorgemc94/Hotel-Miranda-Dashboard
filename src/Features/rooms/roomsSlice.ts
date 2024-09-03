import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "../../types";
import { RootState } from "../../App/store";
import { addRoomThunk, deleteRoomThunk, RoomsListThunk, RoomThunk, updateRoomThunk } from "./roomsThunk";

interface RoomsState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    rooms: Room[];
    room: Room;
}

const initialState: RoomsState = {
    error: null,
    status: 'idle',
    rooms: [],
    room: {} as Room
};

export const RoomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(RoomsListThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(RoomsListThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(RoomsListThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.rooms = action.payload;
        })
        .addCase(RoomThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(RoomThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(RoomThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.room = action.payload as Room;
        })
        .addCase(addRoomThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(addRoomThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(addRoomThunk.fulfilled, (state, action: PayloadAction<Room> ) => {
            state.status = 'fulfilled'
            state.rooms.push(action.payload);
            state.room = action.payload;
        })
        .addCase(updateRoomThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(updateRoomThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(updateRoomThunk.fulfilled, (state, action: PayloadAction<Room> ) => {
            state.rooms = state.rooms.map(room =>
                room._id === action.payload._id ? action.payload : room
            );
            state.status = 'fulfilled'
        })
        .addCase(deleteRoomThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(deleteRoomThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(deleteRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
            console.log(action.payload)
            state.rooms = state.rooms.filter(room => room._id !== action.payload._id);
        })
    }
});

export const getRoomList = (state: RootState) => state.rooms.rooms;
export const getRoom = (state: RootState) => state.rooms.room;
export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoomsError = (state: RootState) => state.rooms.error;

export default RoomsSlice.reducer;
