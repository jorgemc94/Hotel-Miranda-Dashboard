import { createAsyncThunk } from "@reduxjs/toolkit";
import usersJson from "../../Components/data/users.json";

const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const UserDetailsThunk = createAsyncThunk('user/getUser', async (id) => {
    const users = await delay(usersJson);
    console.log (usersJson)
    const user = users.find((user) => user.id == id)
    console.log (user)
    return user
    
});