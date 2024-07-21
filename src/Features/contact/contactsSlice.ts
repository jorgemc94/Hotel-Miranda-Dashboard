import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactThunk } from "./contactsThunk";
import { Contact } from "../../types";
import { ContactDetailsThunk } from "./contactDetailsThunk";
import { RootState } from "../../App/store";

interface ContactsState {
    error: string | null;
    status: 'idle' | 'pending' | 'rejected' | 'fulfilled';
    contacts: Contact[];
    contact: Contact | null;
}

const initialState: ContactsState = {
    error: null,
    status: 'idle',
    contacts: [],
    contact: null
};

export const ContactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
            state.contact = action.payload;
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
        editContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
                state.contact = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ContactThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(ContactThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(ContactThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.contacts = action.payload;
            })
            .addCase(ContactDetailsThunk.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(ContactDetailsThunk.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message || null;
            })
            .addCase(ContactDetailsThunk.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.contact = action.payload as Contact;
            });
    }
});

export const getContactList = (state: RootState) => state.contacts.contacts;
export const getContact = (state: RootState) => state.contacts.contact;
export const getContactsStatus = (state: RootState) => state.contacts.status;
export const getContactsError = (state: RootState) => state.contacts.error;

export const { addContact, editContact, deleteContact } = ContactsSlice.actions;
export default ContactsSlice.reducer;
