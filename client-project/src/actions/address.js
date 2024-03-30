import { Address } from '../api/address';
const addressController = new Address();

export const getDepartments = async () => {
    try {
        let result = await addressController.getDepartments();
        let departamentosUnicos = new Set();
        result.forEach(item => {
            departamentosUnicos.add(item.departamento);
        });
        let listaDepartamentosUnicos = Array.from(departamentosUnicos);
        return listaDepartamentosUnicos;
    } catch (error) {
        return null;
    }
}

export const getMunicipalities = async (department) => {
    try {
        let result = await addressController.getMunicipalities(department);
        let municipios = new Array();
        result.forEach(item => {
            municipios.push(item.municipio);
        });
        return municipios;
    } catch (error) {
        return null;
    }
}
