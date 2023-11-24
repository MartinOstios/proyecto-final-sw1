import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
            name: "",
            lastname: "",
            email: "",
            password: "",
            active: "",
            avatar: "",
            address: "",
            role: "",
    }
];

export const userSlice = createSlice({
    name: 'users',
    initialState: {},
    reducers: {
        addUsers: (state, action) => {
            return action.payload;
        },
        editUsers: (state, action) => {
            return initialState;
        }
    }
});