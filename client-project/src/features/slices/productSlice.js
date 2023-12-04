import {createSlice} from '@reduxjs/toolkit';

const initialState = [];

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => action.payload,
        addProducts: (state, action) => state.concat(action.payload),
        editProducts: (state, action) => {
            const productFound = state.find(product => product.id === action.payload.id);
            console.log(productFound);
            console.log(state.indexOf(productFound));
            if (productFound) {
                state.splice(state.indexOf(productFound), 1);
            }
        },
        removeProducts: (state, action) => state.filter(product => product._id !== action.payload)
    }
});

export const { setProducts, addProducts, editProducts, removeProducts} = productSlice.actions;

export default productSlice.reducer;