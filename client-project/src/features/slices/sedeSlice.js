import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const sedeSlice = createSlice({
    name: 'sedes',
    initialState,
    reducers: {
        setSedes: (state, action) => action.payload,
        addSedes: (state, action) => state.concat(action.payload),
        editSedes: (state, action) => {
            const sedeFound = state.find(sede => sede.id === action.payload.id);
            console.log(sedeFound);
            console.log(state.indexOf(sedeFound));
            if (sedeFound) {
                state.splice(state.indexOf(sedeFound), 1);
            }
        },
        removeSedes: (state, action) => state.filter(sede => sede.id !== action.payload)
    }
});

export const { setSedes, addSedes, editSedes, removeSedes} = sedeSlice.actions;

export default sedeSlice.reducer;