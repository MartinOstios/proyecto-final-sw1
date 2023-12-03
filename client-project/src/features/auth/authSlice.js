import { createSlice } from '@reduxjs/toolkit';

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
    is_authenticated: false,
};



export const authSlice = createSlice({
    name: 'authUser',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.access = action.payload.access;
            state.is_authenticated = true;
            state.user = action.payload.user;

        },
        setNoActiveUser: (state, action) => {
            state.access = null;
            state.is_authenticated = false;
            state.user = action.payload.user;
        },
        registerUser: (state, action) => {
            state.access = null
            state.is_authenticated = false;
            state.user = action.payload;
        },
        authenticate: (state, action) => {
            state.access = localStorage.getItem('access');
            state.is_authenticated = true;
            state.user = action.payload;
        },
        resetUser: (state, action) => {
            return initialState;
        }
    }
});

export const { setUser, setNoActiveUser, resetUser, authenticate, registerUser } = authSlice.actions;

export default authSlice.reducer;