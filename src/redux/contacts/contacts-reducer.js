import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './contacts-actions';
import {
    fetchContacts,
    deleteContact,
    addContact,
    patchContact,
} from './contacts-operations';

const loading = createReducer(null, {
    [deleteContact.pending]: (_, action) => action.meta.arg,
    [deleteContact.fulfilled]: (_, { payload }) => false,
    [deleteContact.rejected]: (_, { payload }) => false,

    [addContact.pending]: (_, action) => true,
    [addContact.fulfilled]: (_, action) => false,
    [addContact.rejected]: (_, action) => false,
});

const itemReducer = createReducer([], {
    [fetchContacts.fulfilled]: (_, { payload }) => payload,

    [addContact.fulfilled]: (state, { payload }) => [...state, { ...payload }],

    [patchContact.fulfilled]: (state, action) => {
        console.log(action);
        return [
            ...state.filter(({ id }) => id !== action.meta.arg.id),
            action.meta.arg,
        ];
    },

    [deleteContact.fulfilled]: (state, action) => [
        ...state.filter(({ id }) => id !== action.meta.arg.id),
    ],
});

const error = createReducer(null, {
    [addContact.rejected]: (_, { payload }) => payload,
    [fetchContacts.rejected]: (_, { payload }) => payload,
    [deleteContact.rejected]: (_, { payload }) => payload,

    [addContact.pending]: (_, { payload }) => null,
    [fetchContacts.pending]: (_, { payload }) => null,
    [deleteContact.pending]: (_, { payload }) => null,
});

const filterReducer = createReducer('', {
    [setFilter]: (_, { payload }) => payload,
});

const isFetchingContacts = createReducer(false, {
    [fetchContacts.pending]: (_, { payload }) => true,
    [fetchContacts.fulfilled]: (_, { payload }) => false,
    [fetchContacts.rejected]: (_, { payload }) => false,
});

export const contactsReducer = combineReducers({
    items: itemReducer,
    error,
    loading,
    filter: filterReducer,
    isFetchingContacts,
});
