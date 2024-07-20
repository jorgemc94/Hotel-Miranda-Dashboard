import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomsThunk } from "./roomsThunk";
import { Room } from "../../types";
import { RoomDetailsThunk } from "./roomsDetailsThunk";
import { RootState } from "../../App/store";

interface RoomsState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    rooms: Room[];
    room: Room | null;
}

const initialState: RoomsState = {
    error: null,
    status: 'idle',
    rooms: [],
    room: null
};

export const RoomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        addRoom: (state, action: PayloadAction<Room>) => {
            state.rooms.push(action.payload);
        },
        deleteRoom: (state, action: PayloadAction<number>) => {
            state.rooms = state.rooms.filter(room => room.id !== action.payload);
        },
        editRoom: (state, action: PayloadAction<Room>) => {
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
                state.error = action.error.message || null;
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
                state.error = action.error.message || null;
            })
            .addCase(RoomDetailsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.room = action.payload as Room;
            });
    }
});

export const getRoomsList = (state: RootState) => state.rooms.rooms;
export const getRoom = (state: RootState) => state.rooms.room;
export const getRoomsStatus = (state: RootState) => state.rooms.status;
export const getRoomsError = (state: RootState) => state.rooms.error;

export const { addRoom, editRoom, deleteRoom } = RoomsSlice.actions;
