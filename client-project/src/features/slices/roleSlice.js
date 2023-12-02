import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setRoles: (state, action) => action.payload,
        addRoles: (state, action) => state.concat(action.payload),
        editRoles: (state, action) => {
            const roleFound = state.find(role => role.id === action.payload.id);
            console.log(roleFound);
            console.log(state.indexOf(roleFound));
            if (roleFound) {
                state.splice(state.indexOf(roleFound), 1);
            }
        },
        removeRoles: (state, action) => state.filter(role => role.id !== action.payload)
    }
});

export const { setRoles, addRoles, editRoles, removeRoles} = roleSlice.actions;

export default roleSlice.reducer;