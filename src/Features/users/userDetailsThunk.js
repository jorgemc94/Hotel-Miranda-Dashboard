import { createAsyncThunk } from "@reduxjs/toolkit";


const delay = (data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const UserDetailsThunk = createAsyncThunk('user/getUser', async ({id, usersList}) => {
    const user = usersList.find((user) => user.id == id)
    console.log (user)
    return user
    
});