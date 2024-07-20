import { createAsyncThunk } from "@reduxjs/toolkit";
import usersJson from "../../Components/data/users.json";
import { User } from "../../types";

const delay = (data: any): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

export const UsersThunk = createAsyncThunk<User[]>('users/getUsersList', async () => {
    const users = await delay(usersJson) as User[];
    return users;
});
