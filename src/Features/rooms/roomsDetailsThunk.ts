import { createAsyncThunk } from "@reduxjs/toolkit";
import { Room } from "../../types";

const delay = <T>(data: T): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

interface RoomDetailsPayload {
    id: number;
    roomList: Room[];
}

export const RoomDetailsThunk = createAsyncThunk<Room | undefined, RoomDetailsPayload>(
    'room/getRoom',
    async ({ id, roomList }: RoomDetailsPayload) => {
        const room = roomList.find((room) => room.id === id);
        await delay(room);
        return room;
    }
);
