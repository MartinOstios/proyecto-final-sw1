import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const providerSlice = createSlice({
    name: 'providers',
    initialState,
    reducers: {
        setProviders: (state, action) => action.payload,
        addProviders: (state, action) => state.concat(action.payload),
        editProviders: (state, action) => {
            const providerFound = state.find(provider => provider.id === action.payload.id);
            console.log(providerFound);
            console.log(state.indexOf(providerFound));
            if (providerFound) {
                state.splice(state.indexOf(providerFound), 1);
            }
        },
        removeProviders: (state, action) => state.filter(provider => provider._id !== action.payload)
    }
});

export const { setProviders, addProviders, editProviders, removeProviders} = providerSlice.actions;

export default providerSlice.reducer;