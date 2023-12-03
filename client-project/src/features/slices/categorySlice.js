import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => action.payload,
        addCategories: (state, action) => state.concat(action.payload),
        editCategories: (state, action) => {
            const categoryFound = state.find(category => category.id === action.payload.id);
            console.log(categoryFound);
            console.log(state.indexOf(categoryFound));
            if (categoryFound) {
                state.splice(state.indexOf(categoryFound), 1);
            }
        },
        removeCategories: (state, action) => state.filter(category => category.id !== action.payload)
    }
});

export const { setCategories, addCategories, editCategories, removeCategories} = categorySlice.actions;

export default categorySlice.reducer;