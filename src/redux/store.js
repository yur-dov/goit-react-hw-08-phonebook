import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/contacts-reducer';
import { authReducer } from './auth/auth-reducer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    contacts: contactsReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    ],
    devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
