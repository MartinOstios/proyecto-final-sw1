import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => action.payload,
        addUsers: (state, action) => ({ ...state, ...action.payload}),
        editUsers: (state, action) => {
            console.log(action);
            const userFound = state.find(user => user.email === action.payload.email);
            if (userFound) {
                state.splice(state.indexOf(userFound), 1);
            }
        },
        removeUsers: (state, action) => {
            console.log(state, action);
            state.filter(user => user.email === action.email);
            console.log(state, action);
        }
    }
});

export const { setUsers, addUsers, editUsers } = userSlice.actions;

export default userSlice.reducer;