import { ENV } from "../utils/constants";
const { BASE_API, API_ROUTES } = ENV;

export class Role {
    // http://localhost:3100/api/v1
    baseApi = BASE_API;
    roleUrl = `${BASE_API}/${API_ROUTES.ROLES}`

    // http://localhost:3100/api/v1/roles
    showRoles = async () => {
        const params = {
            method: "GET",
            headers: {
                'content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(this.roleUrl, params);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            return null;
        }
    }

    getAccessToken = () => {
        return localStorage.getItem("access");
    };
}