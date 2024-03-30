export class Address {

    getDepartments = async () => {
        const url = "https://www.datos.gov.co/resource/xdk5-pm3f.json";
        const params = {
            method: "GET"
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    }

    getMunicipalities = async (department) => {
        const url = `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`;
        const params = {
            method: "GET"
        };
        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return error;
        }
    }
}