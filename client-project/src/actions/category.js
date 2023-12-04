import { Category } from "../api/category";
import { setCategories, addCategories, editCategories, removeCategories } from '../features/slices/categorySlice';
const categoryController = new Category();

export const createCategory = async (data, dispatch) => {
    try {
        const result = await categoryController.createCategory(data);
        if (result && result.category) {
            dispatch(addCategories(result.category));
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const setCategory = async (dispatch) => {
    try {
        const result = await categoryController.showCategories();
        if (result) {
            dispatch(setCategories(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateCategory = async (id, data) => {
    try {
        const result = await categoryController.updateCategory(id, data);
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteCategory = async (id, dispatch) => {
    try {
        const result = await categoryController.deleteCategory(id);
        if (result) {
            dispatch(removeCategories(id));
        }
        return result;
    }  catch (error) {
        return error;
    }
}