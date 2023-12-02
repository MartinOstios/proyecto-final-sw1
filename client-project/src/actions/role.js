import { Role } from "../api/role";
import { setRoles, addRoles, editRoles, removeRoles } from '../features/slices/roleSlice';
const roleController = new Role();

export const createRole = async (data, dispatch) => {
    try {
        const result = await roleController.createRole(data);
        if (result && result.role) {
            dispatch(addRoles(result.role));
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const setRole = async (dispatch) => {
    try {
        const result = await roleController.showRoles();
        if (result) {
            dispatch(setRoles(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateRole = async (id, data, dispatch) => {
    try {
        const result = await roleController.updateRole(id, data);
        if (result) {
            dispatch(editRoles(result.role));
        }
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteRole = async (id, dispatch) => {
    try {
        const result = await roleController.deleteRole(id);
        if (result) {
            dispatch(removeRoles(id));
        }
        return result;
    }  catch (error) {
        return error;
    }
}