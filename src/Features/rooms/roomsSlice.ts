import { createSlice } from "@reduxjs/toolkit";
import { RoomsThunk } from "./roomsThunk";
import { RoomDetailsThunk } from "./roomsDetailsThunk";

const initialState = {
    error: null,
    status: 'idle',
    rooms: [],
    room: null
};

export const RoomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addRoom: (state, action) => {
            state.rooms.push(action.payload)
        },

        deleteRoom: (state, action) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
        },

        editRoom: (state, action) => {
            const index = state.rooms.findIndex(room => room.id === action.payload.id);
            if (index !== -1) {
                state.rooms[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(RoomsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(RoomsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(RoomsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.rooms = action.payload;
            })
            .addCase(RoomDetailsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(RoomDetailsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
            .addCase(RoomDetailsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.room = action.payload;
            });
    }
});

export const getRoomsList = (state) => state.rooms.rooms;
export const getRoom = (state) => state.rooms.room;
export const getRoomsStatus = (state) => state.rooms.status;
export const getRoomsError = (state) => state.rooms.error;
export const { addRoom, editRoom, deleteRoom } = RoomsSlice.actions;
