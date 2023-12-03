import { Auth } from "../api/auth"
import { setUser, authenticate } from '../features/auth/authSlice';
const authController = new Auth();


export const login = async (data, dispatch) => {
    try {
        const result = await authController.login(data);
        if (result && result.user) {
            dispatch(setUser(result));
        }
        return result;
    } catch (error) {
        return null;
    }
}


export const register = async (data) => {
    try {
        const result = await authController.register(data);
        return result;
    } catch (error) {
        return null;
    }
}


export const authenticateUser = async (dispatch) => {
    try {
        
        const result = await authController.authenticateUser();
        if (result) {
            dispatch(authenticate(result))
        } 
        return result;
    } catch(error) {
        return null
    }
}