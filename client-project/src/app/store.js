import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/slices/userSlice';
import roleReducer from '../features/slices/roleSlice';
import categoryReducer from '../features/slices/categorySlice';
import productReducer from '../features/slices/productSlice';
import sedeReducer from '../features/slices/sedeSlice';
import clientReducer from '../features/slices/clientSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    categories: categoryReducer,
    products: productReducer,
    sedes: sedeReducer,
    clients: clientReducer,

  }
});
