import { createAsyncThunk } from "@reduxjs/toolkit";
import usersJson from "../../Components/data/users.json";

const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const UsersThunk = createAsyncThunk('users/getUsersList', async () => {
    const users = await delay(usersJson);
    return users;
});
