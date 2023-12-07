import { Client } from "../api/client"
import { setClients, addClients, editClients, removeClients } from '../features/slices/clientSlice';
const clientController = new Client();

export const createClient = async (data, dispatch) => {
    try {
        const result = await clientController.createClient(data);
        if (result && result.client) {
            dispatch(addClients(result.client));
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const setClient = async (dispatch) => {
    try {
        const result = await clientController.showClients();
        if (result) {
            dispatch(setClients(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateClient = async (id, data) => {
    try {
        const result = await clientController.updateClient(id, data);
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteClient = async (id, dispatch) => {
    try {
        const result = await clientController.deleteClient(id);
        if (result) {
            dispatch(removeClients(id));
        }
        return result;
    }  catch (error) {
        return error;
    }
}