import { createAsyncThunk } from "@reduxjs/toolkit";
import { backendAPI } from "../callAPI";
import { Contact } from "../../types";

export const ContactsListThunk = createAsyncThunk('contact/getContacts', async () => {
    const contacts = await (backendAPI('/contacts', 'GET')) as Contact[];
    return contacts;
});

export const ContactThunk = createAsyncThunk('contact/getContact', async (id: string) => {
    const contact = await (backendAPI(`/contacts/${id}`, 'GET')) as Contact;
    return contact;
});

export const addContactThunk = createAsyncThunk('contact/postContact', async (contactData: Contact) => {
    const addContact = await (backendAPI('/contacts/newContact', 'POST', contactData)) as Contact;
    return addContact;
});


export const updateContactThunk = createAsyncThunk('contact/putContact', async (contactData: Contact) => {
    const updateContact = await (backendAPI(`/contacts/${contactData._id}`, 'PUT', contactData)) as Contact;
    console.log(updateContact);
    return updateContact;
});

export const deleteContactThunk = createAsyncThunk('contact/deleteContact', async (id: string) => {
    const deleteContact = await (backendAPI(`/contacts/delete/${id}`, 'DELETE')) as Contact;
    return deleteContact;
});
