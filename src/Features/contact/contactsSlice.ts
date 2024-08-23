import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types";
import { RootState } from "../../App/store";
import { addContactThunk, ContactsListThunk, ContactThunk, deleteContactThunk, updateContactThunk } from "./contactsThunk";

interface ContactsState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    contacts: Contact[];
    contact: Contact;
}

const initialState: ContactsState = {
    error: null,
    status: 'idle',
    contacts: [],
    contact: {} as Contact
};

export const ContactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
        .addCase(ContactsListThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(ContactsListThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(ContactsListThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.contacts = action.payload;
        })
        .addCase(ContactThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(ContactThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(ContactThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.contact = action.payload as Contact;
        })
        .addCase(addContactThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(addContactThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(addContactThunk.fulfilled, (state, action: PayloadAction<Contact> ) => {
            state.status = 'fulfilled'
            state.contacts.push(action.payload);
            state.contact = action.payload;
        })
        .addCase(updateContactThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(updateContactThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(updateContactThunk.fulfilled, (state, action: PayloadAction<Contact> ) => {
            state.contacts = state.contacts.map(contact =>
                contact._id === action.payload._id ? action.payload : contact
            );
        })
        .addCase(deleteContactThunk.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(deleteContactThunk.rejected, (state, action) => {
            state.status = 'rejected';
            state.error = action.error.message || null;
        })
        .addCase(deleteContactThunk.fulfilled, (state, action: PayloadAction<Contact>) => {
            console.log(action.payload)
            state.contacts = state.contacts.filter(contact => contact._id !== action.payload._id);
        })
    }
});

export const getContactList = (state: RootState) => state.contacts.contacts;
export const getContact = (state: RootState) => state.contacts.contact;
export const getContactsStatus = (state: RootState) => state.contacts.status;
export const getContactsError = (state: RootState) => state.contacts.error;

export default ContactsSlice.reducer;
