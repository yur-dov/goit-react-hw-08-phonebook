import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contact, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/contacts', contact);
            toast.success(`add contact ${data.name}`, {
                duration: 1500,
                position: 'top-center',
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contact, { rejectWithValue }) => {
        try {
            const data = await axios.delete(`/contacts/${contact.id}`);
            toast.success(`delete contact ${contact.name}`, {
                duration: 1500,
                position: 'top-center',
            });
            return data.id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchContacts = createAsyncThunk(
    'contacts/fetchContacts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/contacts');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const patchContact = createAsyncThunk(
    'contacts/patchContact',
    async ({ name, number, id }, { rejectWithValue }) => {
        try {
            const data = await axios.patch(`/contacts/${id}`, {
                name,
                number,
            });
            toast.success(`edit contact`, {
                duration: 1500,
                position: 'top-center',
            });
            return data.id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
