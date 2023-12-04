import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients: (state, action) => action.payload,
        addClients: (state, action) => state.concat(action.payload),
        editClients: (state, action) => {
            const clientFound = state.find(client => client.id === action.payload.id);
            console.log(clientFound);
            console.log(state.indexOf(clientFound));
            if (clientFound) {
                state.splice(state.indexOf(clientFound), 1);
            }
        },
        removeClients: (state, action) => state.filter(client => client._id !== action.payload)
    }
});

export const { setClients, addClients, editClients, removeClients} = clientSlice.actions;

export default clientSlice.reducer;