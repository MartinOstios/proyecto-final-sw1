import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        firstname: null,
        lastname: null,
        email: null,
        role: null,
        active: null,
        current_password: null,
        avatar: null
    },
    access: null,
    is_authenticated: null,
};



export const authSlice = createSlice({
    name: 'authUser',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        resetUser: (state, action) => {
            return initialState;
        }
    }
});

export const {setUser, resetUser} = authSlice.actions;

export default authSlice.reducer;