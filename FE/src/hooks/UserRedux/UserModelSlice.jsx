import userModel from "@/Models/UserModel";
import { createSlice } from "@reduxjs/toolkit";

import { redirect } from "react-router-dom";

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: "UserModel",
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const res = userModel.safeParse(action.payload);
            if (!res.success) return;
            state.user = res.data;
        },
        
        logOutUser: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});

export const { setUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;