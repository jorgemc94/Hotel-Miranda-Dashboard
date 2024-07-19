import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";

const delay = <T>(data: T): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

interface UserDetailsPayload {
    id: number;
    usersList: User[];
}

export const UserDetailsThunk = createAsyncThunk(
    'user/getUser',
    async ({ id, usersList }: UserDetailsPayload) => {
        const user = usersList.find((user) => user.id == id);
        console.log(user);
        return user;
    }
);
