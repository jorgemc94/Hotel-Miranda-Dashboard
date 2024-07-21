import { createAsyncThunk } from "@reduxjs/toolkit";
import { Contact } from "../../types";

const delay = <T>(data: T): Promise<T> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

interface ContactDetailsPayload {
    id: number;
    contactList: Contact[];
}

export const ContactDetailsThunk = createAsyncThunk<Contact | undefined, ContactDetailsPayload>(
    'contact/getContact',
    async ({ id, contactList }: ContactDetailsPayload) => {
        const contact = contactList.find((contact) => contact.id === id);
        await delay(contact);
        return contact;
    }
);
