import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => action.payload,
        addUsers: (state, action) => state.concat(action.payload),
        editUsers: (state, action) => {
            const userFound = state.find(user => user.email === action.payload.email);
            console.log(userFound);
            console.log(state.indexOf(userFound));
            if (userFound) {
                state.splice(state.indexOf(userFound), 1);
            }
        },
        removeUsers: (state, action) => state.filter(user => user.email !== action.payload)
    }
});

export const { setUsers, addUsers, editUsers, removeUsers } = userSlice.actions;

export default userSlice.reducer;