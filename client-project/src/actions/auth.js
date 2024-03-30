import { Auth } from "../api/auth"
import { setUser, setNoActiveUser, authenticate, resetUser, registerUser } from '../features/auth/authSlice';
const authController = new Auth();


export const login = async (data, dispatch) => {
    try {
        const result = await authController.login(data);
        if (result && result.user) {
            if (result.user.active){
                console.log('Entró al dispatch normal')
                dispatch(setUser(result));
            }else{
                console.log('Entró al otro dispatch')
                dispatch(setNoActiveUser(result));
            }
            
        }
        return result;
    } catch (error) {
        return null;
    }
}


export const register = async (data, dispatch) => {
    try {
        const result = await authController.register(data);
        if (result && result.user){
            dispatch(registerUser(result.user));
        }
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

export const logout = (dispatch) => {
    authController.logout();
    dispatch(resetUser());
}


export const generate = async (data) => {
    const result = await authController.generate(data);
    console.log(result);
    return result;
}

export const activate = async (data) => {
    const result = await authController.activate(data);
    return result;
}


export const sendRecovery = async (data) => {
    const result = await authController.sendRecovery(data);
    return result
} 

export const resetPassword = async (data) => {
    const result = await authController.resetPassword(data);
    return result
}