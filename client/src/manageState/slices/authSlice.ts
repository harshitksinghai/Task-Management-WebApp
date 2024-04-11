import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    userInfo: string | null;
}

const initialState: AuthState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action);
            state.userInfo = action.payload.user;
            localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
        },
        logoutLocal: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }

    }
})

export const { setCredentials, logoutLocal } = authSlice.actions;

export default authSlice.reducer;