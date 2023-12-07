import { Provider } from "../api/provider"
import { setProviders, addProviders, editProviders, removeProviders } from '../features/slices/providerSlice';
const providerController = new Provider();

export const createProvider = async (data, dispatch) => {
    try {
        const result = await providerController.createProvider(data);
        if (result && result.provider) {
            dispatch(addProviders(result.provider));
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const setProvider = async (dispatch) => {
    try {
        const result = await providerController.showProviders();
        if (result) {
            dispatch(setProviders(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateProvider = async (id, data) => {
    try {
        const result = await providerController.updateProvider(id, data);
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteProvider = async (id, dispatch) => {
    try {
        const result = await providerController.deleteProvider(id);
        if (result) {
            dispatch(removeProviders(id));
        }
        return result;
    }  catch (error) {
        return error;
    }
}