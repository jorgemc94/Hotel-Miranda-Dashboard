import { createAsyncThunk } from "@reduxjs/toolkit";
import ContactsJson from "../../Components/data/contact.json";
import { Contact } from "../../types";

const delay = (data: any) : Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

export const ContactThunk = createAsyncThunk('contacts/getContactList', async () => {
    const contacts = await delay(ContactsJson) as Contact[];
    return contacts;
});
