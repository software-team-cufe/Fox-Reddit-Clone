import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserModelSlice';
import searchReducer from './searchSlice';

export const userStore = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
    }
});


