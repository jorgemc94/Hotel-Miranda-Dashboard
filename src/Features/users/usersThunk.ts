import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendAPI } from "../callAPI";
import { User } from "../../types";

export const UsersListThunk = createAsyncThunk('user/getUsers', async () => {
    const users = await (backendAPI('/users', 'GET')) as User[];
    return users;
});

export const UserThunk = createAsyncThunk('user/getUser', async (id: string) => {
    const user = await (backendAPI(`/users/${id}`, 'GET')) as User;
    return user;
});

export const addUserThunk = createAsyncThunk('user/postUser', async (userData: Partial<User>) => {
    const addUser = await (backendAPI('/users/newUser', 'POST', userData)) as User;
    return addUser;
});

export const updateUserThunk = createAsyncThunk('user/putUser', async (userData: User) => {
    const updateUser = await (backendAPI(`/users/${userData._id}`, 'PUT', userData)) as User;
    return updateUser;
});

export const deleteUserThunk = createAsyncThunk('user/deleteUser', async (id: string) => {
    const deleteUser = await (backendAPI(`/users/delete/${id}`, 'DELETE')) as User;
    return deleteUser;
});
