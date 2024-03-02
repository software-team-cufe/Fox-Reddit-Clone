import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserModelSlice';
export const userStore = configureStore({
    reducer: {
        user: userReducer,
    }
});


