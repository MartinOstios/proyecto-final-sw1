import { Product } from '../api/product';
import { setProducts, addProducts, editProducts, removeProducts } from '../features/slices/productSlice';
const productController = new Product();

export const createProduct = async (data) => {
    try {
        const result = await productController.createProduct(data);
        return result;
    } catch (error) {
        return null;
    }
}

export const setProduct = async (dispatch) => {
    try {
        const result = await productController.showProduct();
        if (result) {
            dispatch(setProducts(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateProduct = async (id, data) => {
    try {
        const result = await productController.updateProduct(id, data);
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteProduct = async (id, dispatch) => {
    try {
        const result = await productController.deleteProduct(id);
        if (result) {
            dispatch(removeProducts(id));
        }
        return result;
    }  catch (error) {
        return error;
    }
}