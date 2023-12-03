import { Sede } from '../api/sede';
import { setSedes, addSedes, editSedes, removeSedes } from '../features/slices/sedeSlice';
const sedeController = new Sede();

export const createSede = async (data, dispatch) => {
    try {
        const result = await sedeController.createSede(data);
        if (result && result.sede) {
            dispatch(addSedes(result.sede));
        }
        return result;
    } catch (error) {
        return null;
    }
}

export const setSede = async (dispatch) => {
    try {
        const result = await sedeController.showSedes();
        if (result) {
            dispatch(setSedes(result));
        }
        return result;
    }  catch (error) {
        return null;
    }
}

export const updateSede = async (id, data, dispatch) => {
    try {
        const result = await sedeController.updateSede(id, data);
        if (result) {
            dispatch(editSedes(result.sede));
        }
        return result;
    }  catch (error) {
        return error;
    }
}

export const deleteSede = async (id, dispatch) => {
    try {
        const result = await sedeController.deleteSede(id);
        if (result) {
            dispatch(removeSedes(id));
        }
        return result;
    }  catch (error) {
        return error;
    }
}