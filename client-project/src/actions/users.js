import { Users } from "../api/user"
import { setUsers, addUsers, editUsers, removeUsers } from '../features/slices/userSlice';
const userController = new Users();


export const createUser = async (data, dispatch) => {
    try {
        const result = await userController.createUser(data);
        if (result && result.user) {
            dispatch(addUsers(result.user));
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const setUser = async (dispatch) => {
    try {
        const result = await userController.showUsers();
        if (result) {
            dispatch(setUsers(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateUser = async (email, data) => {
    try {
        const result = await userController.updateUser(email, data);
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteUser = async (email, dispatch) => {
    try {
        const result = await userController.deleteUser(email);
        if (result) {
            dispatch(removeUsers(email));
        }
        return result;
    }  catch (error) {
        return error;
    }
}